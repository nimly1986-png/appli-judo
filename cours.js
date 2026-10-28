// =====================================================================
//  PAGE "COURS" : onglet Horaires (jours en colonnes) et onglet Tarifs.
//  Choisir un judoka (ou une catégorie) met en avant ses cours et son tarif.
// =====================================================================
const fiches = lireFiches();
const zone = document.getElementById("tableau");
const choix = document.getElementById("choix");
const resume = document.getElementById("resume");
let onglet = "horaires";

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
function concerneCours(c, mes) { return c.categories.some(function (x) { return mes.includes(x); }); }

// ---------- Onglet Horaires : une ligne par créneau, une colonne par jour ----------
function dessinerHoraires(mes) {
  const filtre = mes.length > 0;
  const jours = JOURS_COURS.filter(function (j) { return COURS.some(function (c) { return c.jour === j; }); });
  const creneaux = [];
  COURS.forEach(function (c) {
    const cle = c.debut + "–" + c.fin;
    if (!creneaux.some(function (x) { return x.cle === cle; })) { creneaux.push({ cle: cle, debut: parseInt(c.debut, 10) }); }
  });
  creneaux.sort(function (a, b) { return a.debut - b.debut; });

  const table = creer("table", "tableau-cours tableau-grille");
  const tete = creer("tr");
  tete.appendChild(creer("th", "", "Horaire"));
  jours.forEach(function (j) { tete.appendChild(creer("th", "", j)); });
  table.appendChild(creer("thead")).appendChild(tete);
  const corps = creer("tbody");
  const miens = [];
  creneaux.forEach(function (cr) {
    const tr = creer("tr");
    tr.appendChild(creer("td", "heure", cr.cle));
    jours.forEach(function (j) {
      const td = creer("td", "cellule");
      COURS.filter(function (c) { return c.jour === j && c.debut + "–" + c.fin === cr.cle; }).forEach(function (c) {
        const pour = concerneCours(c, mes);
        if (pour) { miens.push(j + " " + cr.cle); }
        const bloc = creer("div", "cours-bloc" + (filtre ? (pour ? " pour-moi" : " pas-pour-moi") : ""));
        bloc.appendChild(creer("strong", "", (pour ? "✅ " : "") + c.nom));
        c.categories.forEach(function (n) {
          const p = creer("span", "pastille-cat" + (mes.includes(n) ? " moi" : ""), n);
          p.title = anneesDe(n);
          bloc.appendChild(p);
        });
        td.appendChild(bloc);
      });
      tr.appendChild(td);
    });
    corps.appendChild(tr);
  });
  table.appendChild(corps);
  zone.appendChild(creer("div", "tableau-conteneur")).appendChild(table);

  // légende : années de naissance de chaque cours
  const leg = creer("div", "legende-cours");
  const vus = [];
  COURS.forEach(function (c) {
    if (vus.includes(c.nom)) { return; }
    vus.push(c.nom);
    leg.appendChild(creer("p", "petit", c.nom + " : " + c.categories.map(function (n) { return n + " (" + anneesDe(n) + ")"; }).join(", ")));
  });
  zone.appendChild(leg);

  if (!filtre) { resume.textContent = "Choisissez un judoka ou une catégorie pour voir ses cours."; }
  else if (miens.length === 0) { resume.textContent = "Aucun cours prévu pour cette catégorie : voir le professeur."; }
  else { resume.textContent = "Cours concernés : " + miens.join(" · "); }
}

// ---------- Onglet Tarifs ----------
function dessinerTarifs(mes) {
  const filtre = mes.length > 0;
  const table = creer("table", "tableau-cours tableau-tarifs");
  const tete = creer("tr");
  ["Cours", "Catégories", "Tarif " + SAISON_TARIFS].forEach(function (t) { tete.appendChild(creer("th", "", t)); });
  table.appendChild(creer("thead")).appendChild(tete);
  const corps = creer("tbody");
  let monTarif = null;
  TARIFS.forEach(function (t) {
    const pour = concerneCours(t, mes);
    if (pour) { monTarif = t; }
    const tr = creer("tr", filtre ? (pour ? "pour-moi" : "pas-pour-moi") : "");
    tr.appendChild(creer("td", "", (pour ? "✅ " : "") + t.nom));
    const tdc = creer("td", "pour-qui");
    t.categories.forEach(function (n) { tdc.appendChild(creer("span", "pastille-cat" + (mes.includes(n) ? " moi" : ""), n)); });
    tr.appendChild(tdc);
    const tdm = creer("td", "", t.montant === null || t.montant === undefined ? "À confirmer" : t.montant + " €");
    if (t.details) { tdm.appendChild(creer("small", "", t.details)); }
    tr.appendChild(tdm);
    corps.appendChild(tr);
  });
  table.appendChild(corps);
  zone.appendChild(creer("div", "tableau-conteneur")).appendChild(table);
  TARIFS_INFOS.forEach(function (i) { zone.appendChild(creer("p", "petit", i)); });
  // kimonos Mizuno en vente au club
  zone.appendChild(creer("h2", "", "Kimonos en vente au club"));
  zone.appendChild(creer("p", "", "Ces kimonos Mizuno sont à la vente avec les tarifs ci-dessous :"));
  const tk = creer("table", "tableau-cours tableau-tarifs tableau-kimonos");
  const hk = creer("tr");
  ["Modèle", "Junior / Adulte", "Taille", "Prix de vente"].forEach(function (t) { hk.appendChild(creer("th", "", t)); });
  tk.appendChild(creer("thead")).appendChild(hk);
  const bk = creer("tbody");
  KIMONOS.forEach(function (k) {
    const tr = creer("tr");
    tr.appendChild(creer("td", "", k.modele));
    tr.appendChild(creer("td", "", k.public));
    tr.appendChild(creer("td", "", k.taille));
    tr.appendChild(creer("td", "", k.prix + " €"));
    bk.appendChild(tr);
  });
  tk.appendChild(bk);
  zone.appendChild(creer("div", "tableau-conteneur")).appendChild(tk);

  if (TARIFS.every(function (t) { return t.montant === null || t.montant === undefined; })) {
    zone.appendChild(creer("p", "avertissement", "Les tarifs de la saison seront publiés prochainement par le club."));
  }
  if (!filtre) { resume.textContent = "Choisissez un judoka ou une catégorie pour voir son tarif."; }
  else if (!monTarif) { resume.textContent = "Aucun tarif défini pour cette catégorie : voir le club."; }
  else { resume.textContent = "Tarif concerné : " + monTarif.nom + " — " + (monTarif.montant === null || monTarif.montant === undefined ? "à confirmer" : monTarif.montant + " €"); }
}

function dessinerOnglets() {
  const z = document.getElementById("onglets");
  z.innerHTML = "";
  [["horaires", "🕒 Horaires"], ["tarifs", "💶 Tarifs"]].forEach(function (o) {
    const b = creer("button", "chip" + (o[0] === onglet ? " actif" : ""), o[1]);
    b.type = "button"; b.style.setProperty("--c", "var(--texte)");
    b.addEventListener("click", function () { onglet = o[0]; afficher(); });
    z.appendChild(b);
  });
}
function afficher() {
  zone.innerHTML = "";
  dessinerOnglets();
  const mes = categoriesChoisies();
  if (onglet === "horaires") { dessinerHoraires(mes); } else { dessinerTarifs(mes); }
}
choix.addEventListener("change", function () {
  if (choix.value.charAt(0) === "f") { try { localStorage.setItem("judokaChoisi", choix.value.slice(1)); } catch (e) {} }
  afficher();
});
afficher();
