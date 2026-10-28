// =====================================================================
//  PAGE "COMPÉTITIONS" : seules les compétitions de la catégorie du judoka.
// =====================================================================
const fiches = lireFiches();
const liste = document.getElementById("liste");
const resume = document.getElementById("resume");
const caseToutes = document.getElementById("toutes");

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

// ----- Les boutons de série (Interclubs, Label A, Shiai...) : le choix est mémorisé sur cet appareil -----
const caseAura = document.getElementById("aura");
let serie = "tous";
try { serie = localStorage.getItem("serieCompetitions") || "tous"; } catch (e) {}
if (serie !== "tous" && !SERIES.some(function (s) { return s.cle === serie; })) { serie = "tous"; }

let niveau = "tous", vue = "liste", moisAffiche = aujourdhuiISO().slice(0, 7), jourChoisi = null;
try { niveau = localStorage.getItem("niveauCompetitions") || "tous"; vue = localStorage.getItem("vueCompetitions") || "liste"; } catch (e) {}
if (niveau !== "tous" && !NIVEAUX.some(function (n) { return n.cle === niveau; })) { niveau = "tous"; }

function visible(c, fiche, voirTout, ignorerNiveau) {
  if (serie !== "tous" && c.serie !== serie) { return false; }
  if (!ignorerNiveau && niveau !== "tous" && niveauCompetition(c) !== niveau) { return false; }
  if (caseAura.checked && c.region && c.region !== "AURA") { return false; }
  if (voirTout) { return true; }
  if (serie === "interclub") { return true; }              // onglet Interclubs : tous les interclubs, quelle que soit la catégorie
  if (c.categories.length === 0) { return true; }          // public non précisé dans la source : on l'affiche toujours
  return concerne(c, fiche);
}

function creerMenu(zone, titre, options, valeur, siChange) {
  zone.innerHTML = "";
  const label = creer("label", "");
  label.appendChild(document.createTextNode(titre));
  const sel = document.createElement("select");
  options.forEach(function (o) {
    const opt = document.createElement("option");
    opt.value = o.cle; opt.textContent = o.texte; opt.selected = o.cle === valeur;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", function () { siChange(sel.value); });
  label.appendChild(sel);
  zone.appendChild(label);
}
function dessinerSeries(fiche, voirTout) {
  const options = [{ cle: "tous", nom: "Tous les types" }].concat(SERIES).map(function (s) {
    const n = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && (s.cle === "tous" || c.serie === s.cle) &&
        (niveau === "tous" || niveauCompetition(c) === niveau) &&
        (!caseAura.checked || !c.region || c.region === "AURA") &&
        (voirTout || s.cle === "interclub" || c.categories.length === 0 || concerne(c, fiche));
    }).length;
    return { cle: s.cle, texte: (s.icone ? s.icone + " " : "") + s.nom + " (" + n + ")" };
  });
  creerMenu(document.getElementById("series"), "Type de compétition", options, serie, function (v) {
    serie = v;
    try { localStorage.setItem("serieCompetitions", serie); } catch (e) {}
    afficher();
  });
}

function dessinerNiveaux(fiche, voirTout) {
  const options = [{ cle: "tous", nom: "Tous niveaux" }].concat(NIVEAUX).map(function (n) {
    const nb = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && visible(c, fiche, voirTout, true) && (n.cle === "tous" || niveauCompetition(c) === n.cle);
    }).length;
    return { cle: n.cle, texte: n.nom + " (" + nb + ")" };
  });
  creerMenu(document.getElementById("niveaux"), "Niveau", options, niveau, function (v) {
    niveau = v;
    try { localStorage.setItem("niveauCompetitions", niveau); } catch (e) {}
    afficher();
  });
}
function dessinerVues() {
  const zone = document.getElementById("vues");
  zone.innerHTML = "";
  [["liste", "📋 Liste"], ["mois", "🗓️ Calendrier"]].forEach(function (v) {
    const b = creer("button", "chip" + (v[0] === vue ? " actif" : ""), v[1]);
    b.type = "button"; b.style.setProperty("--c", "var(--texte)");
    b.addEventListener("click", function () { vue = v[0]; try { localStorage.setItem("vueCompetitions", vue); } catch (e) {} afficher(); });
    zone.appendChild(b);
  });
}
function jouerDansEvenement(c, iso) { return c.debut <= iso && iso <= (c.fin || c.debut); }
function dessinerMois(liste, fiche) {
  const zone = document.getElementById("mois");
  zone.innerHTML = "";
  const an = Number(moisAffiche.slice(0, 4)), m = Number(moisAffiche.slice(5, 7)) - 1;
  const nav = creer("div", "mois-nav");
  const decaler = function (d) { const x = new Date(an, m + d, 1); moisAffiche = x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0"); jourChoisi = null; afficher(); };
  const prec = creer("button", "bouton secondaire", "‹"); prec.type = "button"; prec.setAttribute("aria-label", "Mois précédent"); prec.addEventListener("click", function () { decaler(-1); });
  const suiv = creer("button", "bouton secondaire", "›"); suiv.type = "button"; suiv.setAttribute("aria-label", "Mois suivant"); suiv.addEventListener("click", function () { decaler(1); });
  nav.appendChild(prec); nav.appendChild(creer("strong", "", MOIS_LONGS[m] + " " + an)); nav.appendChild(suiv);
  zone.appendChild(nav);
  const grille = creer("div", "mois-grille");
  ["L", "M", "M", "J", "V", "S", "D"].forEach(function (l) { grille.appendChild(creer("span", "mois-jour-nom", l)); });
  const premier = new Date(an, m, 1), decalage = (premier.getDay() + 6) % 7, nbJours = new Date(an, m + 1, 0).getDate();
  for (let i = 0; i < decalage; i++) { grille.appendChild(creer("span", "mois-vide")); }
  for (let d = 1; d <= nbJours; d++) {
    const iso = moisAffiche + "-" + String(d).padStart(2, "0");
    const evts = liste.filter(function (c) { return jouerDansEvenement(c, iso); });
    const cell = creer("button", "mois-case" + (iso === aujourdhuiISO() ? " aujourdhui" : "") + (iso === jourChoisi ? " choisi" : ""));
    cell.type = "button"; cell.disabled = evts.length === 0;
    cell.appendChild(creer("b", "", String(d)));
    const pts = creer("span", "mois-points");
    evts.slice(0, 4).forEach(function (c) {
      const s = SERIES.find(function (x) { return x.cle === c.serie; });
      const p = creer("i"); p.style.background = s ? s.couleur : "var(--texte)"; pts.appendChild(p);
    });
    cell.appendChild(pts);
    if (evts.length) { cell.setAttribute("aria-label", d + " " + MOIS_LONGS[m] + " : " + evts.length + " compétition(s)"); }
    cell.addEventListener("click", function () { jourChoisi = iso; afficher(); });
    grille.appendChild(cell);
  }
  zone.appendChild(grille);
  const du = jourChoisi ? liste.filter(function (c) { return jouerDansEvenement(c, jourChoisi); })
    : liste.filter(function (c) { return c.debut.slice(0, 7) === moisAffiche || (c.fin && c.fin.slice(0, 7) === moisAffiche); });
  zone.appendChild(creer("h2", "titre-passees", jourChoisi ? texteDate({ debut: jourChoisi }) : "Ce mois-ci"));
  if (du.length === 0) { zone.appendChild(creer("p", "message-vide", "Rien ce mois-ci avec ces filtres.")); }
  else { const ul = creer("ul"); du.forEach(function (c) { ul.appendChild(creerCarteCompetition(c, fiche, false)); }); zone.appendChild(ul); }
}

function afficher() {
  liste.innerHTML = "";
  const fiche = fiches[Number(document.getElementById("choix").value)];
  const voirTout = caseToutes.checked || !fiche;
  dessinerSeries(fiche, voirTout);
  dessinerNiveaux(fiche, voirTout);
  dessinerVues();
  const info = SERIES.find(function (s) { return s.cle === serie; });
  const zoneNote = document.getElementById("note-serie");
  zoneNote.innerHTML = "";
  if (info && info.note) { zoneNote.appendChild(creer("p", "avertissement", info.note)); }
  const concernees = toutesLesCompetitions().filter(function (c) { return visible(c, fiche, voirTout); });
  const aVenir = concernees.filter(function (c) { return !estPassee(c); })
    .sort(function (a, b) { return (rangNiveau(a) - rangNiveau(b)) || (a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0); });   // les plus proches d'abord, puis par date
  const btnExport = document.getElementById("export");
  btnExport.hidden = aVenir.length === 0;
  btnExport.onclick = function () { telechargerICS(aVenir, "competitions-jco-chandieu.ics"); };
  btnExport.textContent = (aVenir.length > 1 ? "📆 Ajouter ces " + aVenir.length + " compétitions à mon agenda (.ics)" : "📆 Ajouter cette compétition à mon agenda (.ics)");
  document.getElementById("mois").hidden = vue !== "mois";
  if (vue === "mois") { dessinerMois(concernees.slice().sort(function (a, b) { return a.debut < b.debut ? -1 : 1; }), fiche); liste.hidden = true; return; }
  liste.hidden = false;
  document.getElementById("mois").innerHTML = "";
  const passees = concernees.filter(estPassee).reverse();     // la plus récente en premier
  resume.textContent = voirTout
    ? "Toutes catégories · saison " + SAISON
    : fiche.prenom + " · catégorie " + categoriesDuJudoka(fiche).join(" + ") + " · saison " + SAISON;
  if (aVenir.length === 0) {
    liste.appendChild(creer("p", "message-vide", "Aucune compétition à venir pour le moment."));
  } else {
    let dernier = -1, ul = null;
    aVenir.forEach(function (c) {
      const r = rangNiveau(c);
      if (r !== dernier) {
        dernier = r;
        const n = NIVEAUX[r];
        liste.appendChild(creer("h2", "titre-passees", n.nom + " · " + n.note));
        ul = creer("ul"); liste.appendChild(ul);
      }
      ul.appendChild(creerCarteCompetition(c, fiche, false));
    });
  }
  if (passees.length > 0) {
    liste.appendChild(creer("h2", "titre-passees", "Terminées"));
    const ul2 = creer("ul");
    passees.forEach(function (c) { ul2.appendChild(creerCarteCompetition(c, fiche, false)); });
    liste.appendChild(ul2);
  }
}

if (fiches.length === 0) {
  document.getElementById("sans-fiche").hidden = false;
} else {
  choisirJudoka(fiches, document.getElementById("zone-choix"), document.getElementById("choix"), afficher);
}
caseToutes.addEventListener("change", afficher);
caseAura.addEventListener("change", afficher);
afficher();

// ----- Abonnement à l'agenda : le fichier competitions.ics est publié avec le site -----
(function () {
  const adresse = new URL("competitions.ics", location.href).href;
  const webcal = adresse.replace(/^https?:/, "webcal:");
  const enLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
  document.getElementById("abo-local").hidden = !enLocal;
  document.getElementById("abo-liens").hidden = enLocal;
  document.getElementById("abo-google").href = "https://calendar.google.com/calendar/r?cid=" + webcal;
  document.getElementById("abo-apple").href = webcal;
  document.getElementById("abo-copie").addEventListener("click", function () {
    const etat = document.getElementById("abo-etat");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(adresse).then(function () { etat.textContent = "Lien copié."; },
        function () { etat.textContent = "Copie impossible : " + adresse; });
    } else { etat.textContent = "Copiez ce lien : " + adresse; }
  });
})();
