// Catalogue des techniques : choix de la ceinture, filtre par famille.
const ORDRE = NIVEAUX.map(function (n) { return n.cle; });
// ceinture actuelle -> programme à préparer (la ceinture suivante)
const SUIVANTE = { "Blanche": "jaune", "Blanche-jaune": "jaune", "Jaune": "orange", "Jaune-orange": "orange",
  "Orange": "verte", "Orange-verte": "verte", "Verte": "bleue", "Bleue": "marron", "Marron": "dan1", "Noire": "dan1" };

// couleur de chaque ceinture : les mêmes variables que le reste de l'appli (passage de grade, lexique)
const COULEUR = { jaune: "var(--jaune)", orange: "var(--orange)", verte: "var(--vert)", bleue: "var(--bleu)", marron: "var(--marron)", dan1: "var(--noire)", dan2: "var(--noire)", dan3: "var(--noire)" };
let niveau = "jaune";
const fiches = lireFiches();
const menu = document.getElementById("choix");
const zoneNiveaux = document.getElementById("niveaux");
const selFamille = document.getElementById("famille");

Object.keys(FAMILLES).forEach(function (f) {
  const o = document.createElement("option");
  o.value = f; o.textContent = f + " — " + FAMILLES[f].sens;
  selFamille.appendChild(o);
});
document.getElementById("source").textContent = SOURCE_NIVEAUX;

function choisirJudoka() {
  const f = fiches[Number(menu.value)];
  if (f) {
    niveau = SUIVANTE[f.ceinture] || "jaune";
    document.getElementById("conseil").textContent =
      f.prenom + " a la ceinture " + f.ceinture.toLowerCase() + " : le programme à préparer est « " + nomNiveau(niveau) + " ».";
  }
}
// Fiches officielles « Progression française » de la FFJudo (page https://www.ffjudo.com/progression-francaise)
const FICHES_FFJUDO = {
  jaune:  { titre: "Blanche → Jaune",  page: "https://www.ffjudo.com/progression-francaise-blanc-jaune",   pdf: "https://www.ffjudo.com/resource-file/document/1768579262_179e7d7720f0afcc22ca.pdf" },
  orange: { titre: "Jaune → Orange",   page: "https://www.ffjudo.com/progression-francaise-jaune-orange",  pdf: "https://www.ffjudo.com/resource-file/document/1768579276_edc4084a6f434a24738c.pdf" },
  verte:  { titre: "Orange → Verte",   page: "https://www.ffjudo.com/progression-francaise-orange-vert",   pdf: "https://www.ffjudo.com/resource-file/document/1768579286_514712d27e2dc8c1e008.pdf" },
  bleue:  { titre: "Verte → Bleue",    page: "https://www.ffjudo.com/progression-francaise-vert-bleu",     pdf: "https://www.ffjudo.com/resource-file/document/1768579296_7f7eeb7afebc8589d64b.pdf" },
  marron: { titre: "Bleue → Marron",   page: "https://www.ffjudo.com/progression-francaise-bleu-marron",   pdf: "https://www.ffjudo.com/resource-file/document/1768579307_fcc6b485765287b2e45e.pdf" },
  dan1:   { titre: "Marron → Noire",   page: "https://www.ffjudo.com/progression-francaise-marron-noir",   pdf: "https://www.ffjudo.com/resource-file/document/1768579322_b0de139ff940953d0d12.pdf" }
};
function dessinerFicheFFJudo() {
  const z = document.getElementById("fiche-ffjudo");
  z.innerHTML = "";
  const f = FICHES_FFJUDO[niveau];
  if (!f) { return; }
  [["📄 Fiche officielle FFJudo (PDF) : " + f.titre, f.pdf], ["🌐 Page de présentation : " + f.titre, f.page]].forEach(function (l) {
    const a = document.createElement("a");
    a.className = "bouton secondaire"; a.href = l[1]; a.target = "_blank"; a.rel = "noopener"; a.textContent = l[0];
    z.appendChild(a);
  });
}
function dessinerProgramme() {
  const z = document.getElementById("programme");
  z.innerHTML = "";
  const p = PROGRAMMES[niveau];
  if (!p) { return; }
  const d = document.createElement("details");
  const sm = document.createElement("summary");
  sm.textContent = "Programme officiel FFJudo : " + p.fiche;
  d.appendChild(sm);
  [["Objectif", p.but], ["Séances", p.seances], ["Valeurs", p.valeurs], ["Rythme", p.rythme], ["Entraînement", p.entrainement],
   ["Règles du jeu", p.regles], ["À savoir faire", p.plus], ["Culture", p.culture]].forEach(function (l) {
    if (!l[1]) { return; }
    const li = document.createElement("p");
    const b = document.createElement("strong"); b.textContent = l[0] + " : ";
    li.appendChild(b); li.appendChild(document.createTextNode(l[1]));
    d.appendChild(li);
  });
  z.appendChild(d);
}
function nomNiveau(cle) { return NIVEAUX.find(function (n) { return n.cle === cle; }).nom; }

function dessinerNiveaux() {
  zoneNiveaux.innerHTML = "";
  NIVEAUX.forEach(function (n) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (n.cle === niveau ? " actif" : "");
    b.style.setProperty("--c", COULEUR[n.cle]);
    b.textContent = n.nom;
    b.addEventListener("click", function () { niveau = n.cle; afficher(); });
    zoneNiveaux.appendChild(b);
  });
}

function afficher() {
  dessinerNiveaux();
  dessinerFicheFFJudo();
  dessinerProgramme();
  const cumul = document.getElementById("cumul").checked;
  const fam = selFamille.value;
  const idx = ORDRE.indexOf(niveau);
  const liste = techniquesDuNiveau(niveau, cumul).filter(function (t) { return !fam || t.famille === fam; });
  document.body.style.setProperty("--accent", COULEUR[niveau]);
  document.getElementById("compte-tech").textContent = liste.length + " technique" + (liste.length > 1 ? "s" : "") + " — " + nomNiveau(niveau);
  const zone = document.getElementById("catalogue");
  zone.innerHTML = "";
  if (liste.length === 0) {
    const p = document.createElement("p");
    p.className = "message-vide";
    p.textContent = "Aucune technique pour ce choix.";
    zone.appendChild(p);
  }
  liste.forEach(function (t) {
    const a = document.createElement("a");
    a.className = "carte-technique" + (t.prise ? "" : " a-completer");
    a.href = "technique.html?id=" + encodeURIComponent(t.id);
    a.style.setProperty("--c", COULEUR[t.niveau]);
    const nom = document.createElement("strong");
    nom.textContent = t.nom;
    const trad = document.createElement("span");
    trad.textContent = t.trad;
    const fa = document.createElement("em");
    fa.textContent = t.famille + (t.dan && !/^dan/.test(t.niveau) ? " · UV2 " + (t.dan === 1 ? "1er" : t.dan + "e") + " dan" : "") + (t.prise ? "" : " · fiche à compléter");
    a.appendChild(nom); a.appendChild(trad); a.appendChild(fa);
    zone.appendChild(a);
  });
}

if (fiches.length > 0) {
  fiches.forEach(function (f, i) {
    const o = document.createElement("option");
    o.value = i; o.textContent = f.prenom + " " + f.nom + " (" + f.ceinture + ")";
    menu.appendChild(o);
  });
  const sauve = Number(localStorage.getItem("judokaChoisi"));
  const pos = fiches.findIndex(function (f) { return f.id === sauve; });
  menu.value = pos >= 0 ? pos : 0;
  document.getElementById("zone-choix").hidden = fiches.length < 2;
  menu.addEventListener("change", function () { localStorage.setItem("judokaChoisi", fiches[Number(menu.value)].id); choisirJudoka(); afficher(); });
  choisirJudoka();
}
selFamille.addEventListener("change", afficher);
document.getElementById("cumul").addEventListener("change", afficher);
afficher();
