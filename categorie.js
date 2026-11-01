// Chaque page de catégorie reprend le médaillon (couleur et icône) du bouton rond de l'accueil.
// Données : page -> couleur du bouton + icône. Les pages secondaires (quiz, photos...) suivent leur catégorie.
(function () {
  var CATEGORIES = {
 "cours": {
  "c": "var(--jaune)",
  "svg": "<rect x=\"8\" y=\"10\" width=\"32\" height=\"30\" rx=\"4\"/><path d=\"M8 19h32M16 6v8M32 6v8M16 27h2M24 27h2M32 27h2M16 34h2M24 34h2\"/>",
  "or": false
 },
 "competitions": {
  "c": "var(--orange)",
  "svg": "<path d=\"M15 8h18v10a9 9 0 0 1-18 0zM15 12H8v3a7 7 0 0 0 7 7M33 12h7v3a7 7 0 0 1-7 7M24 27v8M19 35h10v6H19z\"/>",
  "or": false
 },
 "evenements": {
  "c": "var(--vert)",
  "svg": "<path d=\"M24 6l4 12 12 4-12 4-4 12-4-12-12-4 12-4z\"/><path d=\"M38 6v6M35 9h6M10 36v6M7 39h6\"/>",
  "or": false
 },
 "pedibus": {
  "c": "var(--bleu)",
  "svg": "<path d=\"M36 6c-5 0-9 4-9 9 0 7 9 15 9 15s9-8 9-15c0-5-4-9-9-9z\"/><circle cx=\"36\" cy=\"15\" r=\"3.5\"/><circle cx=\"11\" cy=\"38\" r=\"3.5\"/><path d=\"M15 37c8 0 5-8 13-7\" stroke-dasharray=\"3 4\"/>",
  "or": false
 },
 "inscriptioninterclub": {
  "c": "var(--rouge)",
  "svg": "<rect x=\"10\" y=\"8\" width=\"28\" height=\"34\" rx=\"4\"/><path d=\"M18 8V5h12v3M16 20l3 3 5-6M28 21h6M16 32l3 3 5-6M28 33h6\"/>",
  "or": false
 },
 "fiche-judoka": {
  "c": "var(--marron)",
  "svg": "<rect x=\"5\" y=\"11\" width=\"38\" height=\"26\" rx=\"4\"/><circle cx=\"17\" cy=\"22\" r=\"4\"/><path d=\"M10 32c1-4 4-5 7-5s6 1 7 5M28 20h10M28 26h10M28 32h6\"/>",
  "or": false
 },
 "techniques": {
  "c": "var(--violet)",
  "svg": "<circle cx=\"24\" cy=\"9\" r=\"4\"/><path d=\"M24 14v12M24 18l-10 6M24 18l10-4M24 26l-8 14M24 26l10 6l4 8\"/>",
  "or": false
 },
 "passage-grade": {
  "c": "#2a2a33",
  "svg": "<path d=\"M6 20h36M10 20v6M38 20v6M24 6l-16 8h32z\"/><path d=\"M12 42V28M36 42V28M24 42V28\"/>",
  "or": true
 },
 "lexique": {
  "c": "var(--bleu)",
  "svg": "<path d=\"M8 8h22a4 4 0 0 1 4 4v28H12a4 4 0 0 1-4-4z\"/><path d=\"M14 16h14M14 22h14M38 14v26M42 18v22\"/>",
  "or": false
 },
 "code-moral": {
  "c": "var(--blanc)",
  "svg": "<path d=\"M5 12c8 3 30 3 38 0M9 19h30M14 19v22M34 19v22M24 15v4M11 41h6M31 41h6\"/>",
  "or": false
 },
 "equipement": {
  "c": "var(--vert)",
  "svg": "<path d=\"M17 6l7 6 7-6 11 9-5 7-5-3v24H16V19l-5 3-5-7z\"/><path d=\"M18 30h12\"/>",
  "or": false
 },
 "admin-fiches": {
  "c": "var(--violet)",
  "svg": "<circle cx=\"24\" cy=\"14\" r=\"7\"/><path d=\"M10 42c0-9 6-15 14-15s14 6 14 15\"/>",
  "or": false
 },
 "admin-agenda": {
  "c": "var(--orange)",
  "svg": "<path d=\"M15 8h18v10a9 9 0 0 1-18 0zM15 12H8v3a7 7 0 0 0 7 7M33 12h7v3a7 7 0 0 1-7 7M24 27v8M19 35h10v6H19z\"/>",
  "or": false
 },
 "admin-financier": {
  "c": "var(--vert)",
  "svg": "<circle cx=\"24\" cy=\"24\" r=\"17\"/><path d=\"M31 17a9 9 0 1 0 0 14M14 21h14M14 27h14\"/>",
  "or": false
 },
 "admin-sportif": {
  "c": "var(--bleu)",
  "svg": "<path d=\"M8 40V24M20 40V12M32 40V20M44 40H4\"/>",
  "or": false
 }
};
  var ALIAS = {"quiz": "techniques", "technique": "techniques", "participations": "evenements", "photos": "evenements", "resultats": "evenements", "bons-points": "code-moral", "agenda": "competitions", "reglements": "competitions", "admin-synthese": "admin-financier", "admin-resultats": "admin-sportif"};
  var page = (location.pathname.split("/").pop() || "").replace(".html", "");
  var cle = ALIAS[page] || page;
  var cat = CATEGORIES[cle];
  if (!cat) { return; }
  document.addEventListener("DOMContentLoaded", function () {
    var couleur = cat.or ? "var(--noire)" : cat.c;
    document.body.style.setProperty("--accent", couleur);        // mêmes teintes que le bouton
    var h1 = document.querySelector("h1");
    if (!h1 || h1.querySelector(".medaillon")) { return; }
    // on remplace l'émoji du titre par le médaillon du bouton
    var texte = h1.textContent.replace(/^[\s\p{Extended_Pictographic}\uFE0F\u200D]+/u, "");
    var m = document.createElement("span");
    m.className = "medaillon" + (cat.or ? " or" : "");
    m.style.setProperty("--c", cat.c);
    m.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' + cat.svg + "</svg>";
    var t = document.createElement("span");
    t.textContent = texte;
    h1.textContent = "";
    h1.classList.add("titre-categorie");
    h1.appendChild(m); h1.appendChild(t);
  });
})();
