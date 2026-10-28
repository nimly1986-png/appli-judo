// =====================================================================
//  PAGE "COMPÉTITIONS" : calendrier mensuel, filtres en menus déroulants.
//  Le choix du type, du niveau et de la catégorie (ou d'une fiche judoka) est mémorisé sur cet appareil.
//  Le bouton "Ajouter à mon agenda" d'une compétition n'apparaît que si une catégorie ou une fiche est choisie.
// =====================================================================
const fiches = lireFiches();
const liste = document.getElementById("liste");
const resume = document.getElementById("resume");

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

function lireMemo(cle, defaut) { try { return localStorage.getItem(cle) || defaut; } catch (e) { return defaut; } }
function ecrireMemo(cle, valeur) { try { localStorage.setItem(cle, valeur); } catch (e) {} }

let serie = lireMemo("serieCompetitions", "tous");
if (serie !== "tous" && !SERIES.some(function (s) { return s.cle === serie; })) { serie = "tous"; }
let niveau = lireMemo("niveauCompetitions", "tous");
if (niveau !== "tous" && !NIVEAUX.some(function (n) { return n.cle === niveau; })) { niveau = "tous"; }
const TOUTES_CATEGORIES = categories.map(function (c) { return c.nom; }).concat(["Vétéran"]);
let qui = lireMemo("quiCompetitions", "tous");          // "tous", "f<id d'une fiche>" ou "c<catégorie>"
if (qui.charAt(0) === "f" && !fiches.some(function (f) { return "f" + f.id === qui; })) { qui = "tous"; }
if (qui.charAt(0) === "c" && !TOUTES_CATEGORIES.includes(qui.slice(1))) { qui = "tous"; }
let moisAffiche = aujourdhuiISO().slice(0, 7), jourChoisi = null;

function ficheChoisie() { return qui.charAt(0) === "f" ? fiches.find(function (f) { return "f" + f.id === qui; }) || null : null; }
function categoriesChoisies() {
  const f = ficheChoisie();
  if (f) { return categoriesDuJudoka(f); }
  return qui.charAt(0) === "c" ? [qui.slice(1)] : [];
}

function visible(c, mes, ignorerNiveau) {
  if (serie !== "tous" && c.serie !== serie) { return false; }
  if (!ignorerNiveau && niveau !== "tous" && niveauCompetition(c) !== niveau) { return false; }
  if (mes.length === 0) { return true; }
  if (serie === "interclub") { return true; }              // type Interclubs : tous les interclubs, quelle que soit la catégorie
  if (c.categories.length === 0) { return true; }         // public non précisé dans la source : on l'affiche toujours
  return c.categories.some(function (x) { return mes.includes(x); });
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
function visibleSansFiltres(c, mes) {
  if (mes.length === 0 || c.serie === "interclub" || c.categories.length === 0) { return true; }
  return c.categories.some(function (x) { return mes.includes(x); });
}
function dessinerMenus(mes) {
  const types = [{ cle: "tous", nom: "Tous les types" }].concat(SERIES).map(function (s) {
    const n = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && (s.cle === "tous" || c.serie === s.cle) && (niveau === "tous" || niveauCompetition(c) === niveau) && visibleSansFiltres(c, mes);
    }).length;
    return { cle: s.cle, texte: (s.icone ? s.icone + " " : "") + s.nom + " (" + n + ")" };
  });
  creerMenu(document.getElementById("series"), "Type de compétition", types, serie, function (v) { serie = v; ecrireMemo("serieCompetitions", v); afficher(); });
  const niveaux = [{ cle: "tous", nom: "Tous niveaux" }].concat(NIVEAUX).map(function (n) {
    const nb = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && (serie === "tous" || c.serie === serie) && (n.cle === "tous" || niveauCompetition(c) === n.cle) && visibleSansFiltres(c, mes);
    }).length;
    return { cle: n.cle, texte: n.nom + " (" + nb + ")" };
  });
  creerMenu(document.getElementById("niveaux"), "Niveau", niveaux, niveau, function (v) { niveau = v; ecrireMemo("niveauCompetitions", v); afficher(); });
  const quis = [{ cle: "tous", texte: "Toutes les catégories" }];
  fiches.forEach(function (f) { quis.push({ cle: "f" + f.id, texte: "Judoka : " + f.prenom + " (" + categoriesDuJudoka(f).join(" + ") + ")" }); });
  TOUTES_CATEGORIES.forEach(function (n) { quis.push({ cle: "c" + n, texte: "Catégorie : " + n }); });
  creerMenu(document.getElementById("qui"), "Catégorie ou judoka", quis, qui, function (v) { qui = v; ecrireMemo("quiCompetitions", v); jourChoisi = null; afficher(); });
}

function jouerDansEvenement(c, iso) { return c.debut <= iso && iso <= (c.fin || c.debut); }
function dessinerMois(liste, fiche, avecAgenda) {
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
    : liste.filter(function (c) { return c.debut.slice(0, 7) === moisAffiche || (c.fin && c.fin.slice(0, 7) === moisAffiche); })
        .filter(function (c) { return moisAffiche !== aujourdhuiISO().slice(0, 7) || !estPassee(c); });   // mois en cours : seulement ce qui reste à venir
  zone.appendChild(creer("h2", "titre-passees", jourChoisi ? texteDate({ debut: jourChoisi }) : "Ce mois-ci"));
  if (du.length === 0) { zone.appendChild(creer("p", "message-vide", "Rien ce mois-ci avec ces filtres.")); }
  else { const ul = creer("ul"); du.forEach(function (c) { ul.appendChild(creerCarteCompetition(c, fiche, false, avecAgenda)); }); zone.appendChild(ul); }
}

function afficher() {
  const fiche = ficheChoisie();
  const mes = categoriesChoisies();
  dessinerMenus(mes);
  const info = SERIES.find(function (s) { return s.cle === serie; });
  const zoneNote = document.getElementById("note-serie");
  zoneNote.innerHTML = "";
  if (info && info.note) { zoneNote.appendChild(creer("p", "avertissement", info.note)); }
  resume.textContent = fiche ? fiche.prenom + " · catégorie " + mes.join(" + ") + " · saison " + SAISON
    : mes.length ? "Catégorie " + mes[0] + " · saison " + SAISON : "Toutes catégories · saison " + SAISON;
  const concernees = toutesLesCompetitions().filter(function (c) { return visible(c, mes); })
    .sort(function (a, b) { return a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0; });
  liste.hidden = true;
  dessinerMois(concernees, fiche, mes.length > 0);
}

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
