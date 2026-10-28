// =====================================================================
//  PAGE "COURS" : onglet Horaires (jours en colonnes) et onglet Tarifs.
//  Choisir un judoka (ou une catégorie) met en avant ses cours et son tarif.
// =====================================================================
const fiches = lireFiches();
const zone = document.getElementById("tableau");
const resume = document.getElementById("resume");
let onglet = "horaires";

function anneesDe(nom) {
  if (nom === "Vétéran") { return "30 ans et plus"; }
  const c = categories.find(function (x) { return x.nom === nom; });
  if (!c) { return ""; }
  return c.de <= 1900 ? "nés en " + c.a + " et avant" : (c.de === c.a ? "nés en " + c.a : "nés en " + c.de + "-" + c.a);
}

// Plus de menu : tous les cours sont affichés. Si une fiche judoka existe, ses cours sont mis en avant.
function judokaCourant() {
  let id = 0;
  try { id = Number(localStorage.getItem("judokaChoisi")); } catch (e) {}
  return fiches.find(function (f) { return f.id === id; }) || fiches[0] || null;
}
function categoriesChoisies() {
  const f = judokaCourant();
  return f ? categoriesDuJudoka(f) : [];
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

  if (!filtre) { resume.textContent = ""; }
  else if (miens.length === 0) { resume.textContent = "Aucun cours prévu pour cette catégorie : voir le professeur."; }
  else { resume.textContent = judokaCourant().prenom + " : " + miens.join(" · "); }
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
  if (!filtre) { resume.textContent = ""; }
  else if (!monTarif) { resume.textContent = "Aucun tarif défini pour cette catégorie : voir le club."; }
  else { resume.textContent = judokaCourant().prenom + " : tarif " + monTarif.nom + " — " + (monTarif.montant === null || monTarif.montant === undefined ? "à confirmer" : monTarif.montant + " €"); }
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
afficher();
