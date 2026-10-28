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
  const cumul = document.getElementById("cumul").checked;
  const fam = selFamille.value;
  const idx = ORDRE.indexOf(niveau);
  const liste = TECHNIQUES.filter(function (t) {
    const i = ORDRE.indexOf(t.niveau);
    return (cumul ? i <= idx : i === idx) && (!fam || t.famille === fam);
  });
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
    fa.textContent = t.famille + (t.prise ? "" : " · fiche à compléter");
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
