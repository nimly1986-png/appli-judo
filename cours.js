// =====================================================================
//  PAGE "PLANNING DES COURS" : tableau jours / horaires / catégories d'âge.
//  Choisir un judoka (ou une catégorie) met en avant ses cours.
// =====================================================================
const fiches = lireFiches();
const tableau = document.getElementById("tableau");
const choix = document.getElementById("choix");
const resume = document.getElementById("resume");

function anneesDe(nom) {
  if (nom === "Vétéran") { return "30 ans et plus"; }
  const c = categories.find(function (x) { return x.nom === nom; });
  if (!c) { return ""; }
  return c.de <= 1900 ? "nés en " + c.a + " et avant" : (c.de === c.a ? "nés en " + c.a : "nés en " + c.de + "-" + c.a);
}

// options du menu : tous les cours, un judoka (s'il y a des fiches), ou une catégorie
choix.appendChild(new Option("Tous les cours", "tous"));
fiches.forEach(function (f) {
  choix.appendChild(new Option(f.prenom + " " + f.nom + " (" + categoriesDuJudoka(f).join(" + ") + ")", "f" + f.id));
});
categories.map(function (c) { return c.nom; }).concat(["Vétéran"]).forEach(function (n) {
  choix.appendChild(new Option("Catégorie : " + n + " (" + anneesDe(n) + ")", "c" + n));
});
let enCours = "tous";
try {
  const memo = Number(localStorage.getItem("judokaChoisi"));
  if (fiches.some(function (f) { return f.id === memo; })) { enCours = "f" + memo; }
} catch (e) {}
if (enCours === "tous" && fiches.length > 0) { enCours = "f" + fiches[0].id; }   // sans choix mémorisé : le premier judoka
choix.value = enCours;

function categoriesChoisies() {
  const v = choix.value;
  if (v.charAt(0) === "f") {
    const f = fiches.find(function (x) { return "f" + x.id === v; });
    return f ? categoriesDuJudoka(f) : [];
  }
  if (v.charAt(0) === "c") { return [v.slice(1)]; }
  return [];
}

function afficher() {
  const mes = categoriesChoisies();
  const filtre = mes.length > 0;
  tableau.innerHTML = "";
  const table = creer("table", "tableau-cours");
  const tete = creer("tr");
  ["Jour", "Horaire", "Cours", "Pour qui"].forEach(function (t) { tete.appendChild(creer("th", "", t)); });
  table.appendChild(creer("thead")).appendChild(tete);
  const corps = creer("tbody");
  const tries = COURS.slice().sort(function (a, b) {
    return (JOURS_COURS.indexOf(a.jour) - JOURS_COURS.indexOf(b.jour)) || (parseInt(a.debut, 10) - parseInt(b.debut, 10));
  });
  const miens = [];
  tries.forEach(function (c) {
    const pour = c.categories.some(function (x) { return mes.includes(x); });
    if (pour) { miens.push(c.jour + " " + c.debut + "–" + c.fin); }
    const tr = creer("tr", filtre ? (pour ? "pour-moi" : "pas-pour-moi") : "");
    tr.appendChild(creer("td", "", c.jour));
    tr.appendChild(creer("td", "", c.debut + "–" + c.fin));
    tr.appendChild(creer("td", "", (pour ? "✅ " : "") + c.nom));
    const td = creer("td", "pour-qui");
    c.categories.forEach(function (n) {
      const ligne = creer("span", "pastille-cat" + (mes.includes(n) ? " moi" : ""), n);
      ligne.title = anneesDe(n);
      td.appendChild(ligne);
    });
    td.appendChild(creer("small", "", c.categories.map(anneesDe).filter(Boolean).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(" · ")));
    tr.appendChild(td);
    corps.appendChild(tr);
  });
  table.appendChild(corps);
  tableau.appendChild(creer("div", "tableau-conteneur")).appendChild(table);
  if (!filtre) { resume.textContent = "Choisissez un judoka ou une catégorie pour voir ses cours."; }
  else if (miens.length === 0) { resume.textContent = "Aucun cours prévu pour cette catégorie : voir le professeur."; }
  else { resume.textContent = "Cours concernés : " + miens.join(" · "); }
}
choix.addEventListener("change", function () {
  if (choix.value.charAt(0) === "f") { try { localStorage.setItem("judokaChoisi", choix.value.slice(1)); } catch (e) {} }
  afficher();
});
afficher();
