// =====================================================================
//  PAGE "COMPÉTITIONS" : calendrier mensuel, filtres en menus déroulants.
//  Le choix du type, du niveau et de la catégorie (ou d'une fiche judoka) est mémorisé sur cet appareil.
//  Le bouton "Ajouter à mon agenda" d'une compétition n'apparaît que si une catégorie ou une fiche est choisie.
// =====================================================================
const session = lireSession();                      // connecté : seulement les judokas de la famille
const connecte = !!session;
const fiches = fichesDeLaFamille(lireFiches(), session);
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
if (connecte) { serie = "tous"; niveau = "tous"; if (qui.charAt(0) !== "f" && fiches.length) { qui = "f" + fiches[0].id; } }
let vue = lireMemo("vueCompetitions", "prochaines"), nbVisibles = 10;
let moisAffiche = aujourdhuiISO().slice(0, 7), jourChoisi = null;

function ficheChoisie() { return qui.charAt(0) === "f" ? fiches.find(function (f) { return "f" + f.id === qui; }) || null : null; }
function categoriesChoisies() {
  const f = ficheChoisie();
  if (f) { return categoriesDuJudoka(f); }
  return qui.charAt(0) === "c" ? [qui.slice(1)] : [];
}

function interditBaby(c, mes) { return mes.includes("Baby judo") && (c.serie !== "interclub" || !c.categories.includes("Baby judo")); }
function visible(c, mes, ignorerNiveau) {
  if (interditBaby(c, mes)) { return false; }
  if (serie !== "tous" && c.serie !== serie) { return false; }
  if (!ignorerNiveau && niveau !== "tous" && niveauCompetition(c) !== niveau) { return false; }
  if (!autorise(c, ficheChoisie())) { return false; }
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
  let groupe = null, groupeNom = null;
  options.forEach(function (o) {
    const opt = document.createElement("option");
    opt.value = o.cle; opt.textContent = o.texte; opt.selected = o.cle === valeur;
    if (o.groupe && o.groupe !== groupeNom) { groupe = document.createElement("optgroup"); groupe.label = o.groupe; groupeNom = o.groupe; sel.appendChild(groupe); }
    if (!o.groupe) { groupe = null; groupeNom = null; }
    (groupe || sel).appendChild(opt);
  });
  sel.addEventListener("change", function () { siChange(sel.value); });
  label.appendChild(sel);
  zone.appendChild(label);
}
function visibleSansFiltres(c, mes) {
  if (interditBaby(c, mes)) { return false; }
  if (!autorise(c, ficheChoisie())) { return false; }
  if (mes.length === 0 || c.serie === "interclub" || c.categories.length === 0) { return true; }
  return c.categories.some(function (x) { return mes.includes(x); });
}
function dessinerMenus(mes) {
  if (connecte) {                                   // un seul menu : les judokas de la famille
    document.getElementById("series").innerHTML = "";
    document.getElementById("niveaux").innerHTML = "";
    const quisF = fiches.map(function (f) { return { cle: "f" + f.id, texte: "🥋 " + f.prenom + " · " + categoriesDuJudoka(f).join(" + ") }; });
    if (quisF.length === 0) { document.getElementById("qui").innerHTML = ""; return; }
    creerMenu(document.getElementById("qui"), "Pour qui ?", quisF, qui, function (v) { qui = v; ecrireMemo("quiCompetitions", v); jourChoisi = null; afficher(); });
    return;
  }
  // 1) Pour qui ?  (un seul menu, rangé par groupes)
  const quis = [{ cle: "tous", texte: "👥 Tout le monde" }];
  fiches.forEach(function (f) { quis.push({ cle: "f" + f.id, texte: "🥋 " + f.prenom + " · " + categoriesDuJudoka(f).join(" + "), groupe: "Mes judokas" }); });
  TOUTES_CATEGORIES.forEach(function (n) { quis.push({ cle: "c" + n, texte: libelleCategorie(n), groupe: "Par catégorie d'âge" }); });
  creerMenu(document.getElementById("qui"), "Pour qui ?", quis, qui, function (v) { qui = v; ecrireMemo("quiCompetitions", v); jourChoisi = null; afficher(); });
  // 2) Type de compétition en puces colorées
  const zoneT = document.getElementById("series");
  zoneT.innerHTML = "";
  const rang = creer("div", "puces-filtre");
  [{ cle: "tous", nom: "Tout", icone: "✨", couleur: "var(--accent)" }].concat(SERIES).forEach(function (s) {
    const n = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && (s.cle === "tous" || c.serie === s.cle) && (niveau === "tous" || niveauCompetition(c) === niveau) && visibleSansFiltres(c, mes);
    }).length;
    if (s.cle !== "tous" && n === 0 && serie !== s.cle) { return; }
    const b = creer("button", "puce-filtre" + (serie === s.cle ? " actif" : ""));
    b.type = "button"; b.style.setProperty("--c", s.couleur);
    b.appendChild(creer("span", "", s.icone)); b.appendChild(document.createTextNode(" " + s.nom + " "));
    b.appendChild(creer("small", "", String(n)));
    b.setAttribute("aria-pressed", serie === s.cle ? "true" : "false");
    b.addEventListener("click", function () { serie = s.cle; ecrireMemo("serieCompetitions", s.cle); nbVisibles = 10; afficher(); });
    rang.appendChild(b);
  });
  zoneT.appendChild(rang);
  // 3) Niveau : rangé sous « Plus de filtres »
  const zoneN = document.getElementById("niveaux");
  zoneN.innerHTML = "";
  const det = creer("details", "repli-filtre");
  if (niveau !== "tous") { det.open = true; }
  det.appendChild(creer("summary", "", "⚙️ Plus de filtres" + (niveau !== "tous" ? " (1)" : "")));
  const inner = creer("div");
  const niveaux = [{ cle: "tous", nom: "Tous niveaux" }].concat(NIVEAUX).map(function (n) {
    const nb = toutesLesCompetitions().filter(function (c) {
      return !estPassee(c) && (serie === "tous" || c.serie === serie) && (n.cle === "tous" || niveauCompetition(c) === n.cle) && visibleSansFiltres(c, mes);
    }).length;
    return { cle: n.cle, texte: n.nom + " (" + nb + ")" };
  });
  creerMenu(inner, "Niveau", niveaux, niveau, function (v) { niveau = v; ecrireMemo("niveauCompetitions", v); nbVisibles = 10; afficher(); });
  det.appendChild(inner); zoneN.appendChild(det);
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

function dessinerProchaines(liste, fiche, avecAgenda) {
  const zone = document.getElementById("mois");
  zone.innerHTML = "";
  const aVenir = liste.filter(function (c) { return !estPassee(c); });
  if (aVenir.length === 0) { zone.appendChild(creer("p", "message-vide", "Rien à venir avec ces filtres. Essayez « Tout » ou un autre type.")); return; }
  const ul = creer("ul"); let moisCourant = "";
  aVenir.slice(0, nbVisibles).forEach(function (c) {
    const m = c.debut.slice(0, 7);
    if (m !== moisCourant) { moisCourant = m; ul.appendChild(creer("li", "titre-mois", MOIS_LONGS[Number(m.slice(5, 7)) - 1] + " " + m.slice(0, 4))); }
    ul.appendChild(creerCarteCompetition(c, fiche, false, avecAgenda));
  });
  zone.appendChild(ul);
  if (aVenir.length > nbVisibles) {
    const b = creer("button", "bouton secondaire", "Voir 10 de plus (" + (aVenir.length - nbVisibles) + " restantes)");
    b.type = "button"; b.addEventListener("click", function () { nbVisibles += 10; afficher(); });
    zone.appendChild(b);
  }
}
function dessinerVue() {
  const z = document.getElementById("vue"); z.innerHTML = "";
  [["prochaines", "📋 Prochaines"], ["calendrier", "📅 Calendrier"]].forEach(function (v) {
    const b = creer("button", "vue-bouton" + (vue === v[0] ? " actif" : ""), v[1]);
    b.type = "button"; b.setAttribute("aria-pressed", vue === v[0] ? "true" : "false");
    b.addEventListener("click", function () { vue = v[0]; ecrireMemo("vueCompetitions", vue); afficher(); });
    z.appendChild(b);
  });
}

function afficher() {
  const fiche = ficheChoisie();
  const mes = categoriesChoisies();
  dessinerMenus(mes);
  const info = SERIES.find(function (s) { return s.cle === serie; });
  const zoneNote = document.getElementById("note-serie");
  zoneNote.innerHTML = "";
  if (info && info.note && !connecte) { zoneNote.appendChild(creer("p", "avertissement", info.note)); }
  if (connecte && !fiche) { resume.textContent = "Famille " + session.famille + " : aucune fiche judoka enregistrée. Créez-la depuis « Inscription »."; liste.hidden = true; document.getElementById("mois").innerHTML = ""; return; }
  resume.textContent = fiche ? fiche.prenom + " · " + mes.map(function (n) { return libelleCategorie(n, false); }).join(" + ") + " · saison " + SAISON
    : mes.length ? libelleCategorie(mes[0]) + " · saison " + SAISON : "Toutes catégories · saison " + SAISON;
  const concernees = toutesLesCompetitions().filter(function (c) { return visible(c, mes); })
    .sort(function (a, b) { return a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0; });
  liste.hidden = true;
  dessinerVue();
  if (vue === "calendrier") { dessinerMois(concernees, fiche, mes.length > 0); }
  else { dessinerProchaines(concernees, fiche, mes.length > 0); }
}

afficher();
