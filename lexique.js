// Lexique : recherche (sans tenir compte des accents) et filtre par catégorie.
let categorie = "";
// Une couleur de ceinture par catégorie : on avance des bases (blanc) vers l'arbitrage (noir, puis rouge).
const PARCOURS = [
  ["Le dojo et les personnes", "var(--blanc)", "ceinture blanche : les bases"],
  ["Nombres", "var(--jaune)", "ceinture jaune"],
  ["Corps, directions et tailles", "var(--orange)", "ceinture orange"],
  ["Entraînement et notions", "var(--vert)", "ceinture verte"],
  ["Familles de techniques", "var(--bleu)", "ceinture bleue"],
  ["Mots qu'on retrouve dans les noms de techniques", "var(--marron)", "ceinture marron"],
  ["Arbitrage : commandements", "var(--noire)", "ceinture noire"],
  ["Arbitrage : scores et sanctions", "var(--rouge)", "grades les plus hauts (rouge)"]
];
function couleurDe(cat) { const p = PARCOURS.find(function (x) { return x[0] === cat; }); return p ? p[1] : "var(--accent)"; }
function ceintureDe(cat) { const p = PARCOURS.find(function (x) { return x[0] === cat; }); return p ? p[2] : ""; }
LEXIQUE.sort(function (a, b) {
  const i = PARCOURS.findIndex(function (x) { return x[0] === a.cat; }), j = PARCOURS.findIndex(function (x) { return x[0] === b.cat; });
  return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
});
function normaliser(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function el(tag, classe, texte) { const e = document.createElement(tag); if (classe) { e.className = classe; } if (texte) { e.textContent = texte; } return e; }
const champ = document.getElementById("recherche");

function afficher() {
  const zoneCat = document.getElementById("categories");
  zoneCat.innerHTML = "";
  [""].concat(LEXIQUE.map(function (c) { return c.cat; })).forEach(function (nom) {
    const b = el("button", "chip lex" + (nom === categorie ? " actif" : ""), nom || "Tout");
    b.type = "button"; b.style.setProperty("--c", nom ? couleurDe(nom) : "var(--muet)");
    b.addEventListener("click", function () { categorie = nom; afficher(); });
    zoneCat.appendChild(b);
  });
  const q = normaliser(champ.value.trim());
  const zone = document.getElementById("liste-mots");
  zone.innerHTML = "";
  let total = 0;
  LEXIQUE.forEach(function (c) {
    if (categorie && c.cat !== categorie) { return; }
    const mots = c.mots.filter(function (m) { return !q || normaliser(m.join(" ")).indexOf(q) >= 0; });
    if (mots.length === 0) { return; }
    total += mots.length;
    const titre = el("h2", "cat-titre");
    titre.style.setProperty("--c", couleurDe(c.cat));
    titre.appendChild(el("span", "", c.cat));
    titre.appendChild(el("small", "", ceintureDe(c.cat)));
    zone.appendChild(titre);
    const grille = el("div", "mots");
    grille.style.setProperty("--c", couleurDe(c.cat));
    mots.forEach(function (m) {
      const carte = el("div", "mot");
      carte.appendChild(el("strong", "", m[0]));
      carte.appendChild(el("span", "", m[1]));
      if (m[2]) { carte.appendChild(el("small", "", m[2])); }
      grille.appendChild(carte);
    });
    zone.appendChild(grille);
  });
  document.getElementById("compte-mots").textContent = total + " mot" + (total > 1 ? "s" : "");
  if (total === 0) { zone.appendChild(el("p", "message-vide", "Aucun mot ne correspond.")); }
}
champ.addEventListener("input", afficher);
afficher();
