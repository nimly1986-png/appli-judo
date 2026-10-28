// =====================================================================
//  PAGE "COURS" : calendrier de la semaine (jours en colonnes, heures en lignes) et tarifs.
//  Information ouverte à tous : elle ne dépend d'aucune fiche judoka.
// =====================================================================
const zone = document.getElementById("tableau");
let onglet = "horaires";

function anneesDe(nom) {
  if (nom === "Vétéran") { return "30 ans et plus"; }
  const c = categories.find(function (x) { return x.nom === nom; });
  if (!c) { return ""; }
  return c.de <= 1900 ? "nés en " + c.a + " et avant" : (c.de === c.a ? "nés en " + c.a : "nés en " + c.de + "-" + c.a);
}
// "17h", "20h30" -> minutes depuis minuit
function enMinutes(h) {
  const p = String(h).toLowerCase().split("h");
  return Number(p[0]) * 60 + (Number(p[1]) || 0);
}
const COULEURS_COURS = ["var(--orange)", "var(--bleu)", "var(--vert)", "var(--violet)", "var(--marron)", "var(--rouge)"];
function couleurDe(nom, noms) { return COULEURS_COURS[noms.indexOf(nom) % COULEURS_COURS.length]; }
function nomCourt(nom) { return nom.replace(/^Cours /i, "").replace(/^./, function (c) { return c.toUpperCase(); }); }

// ---------- Onglet Horaires : calendrier de la semaine ----------
function dessinerHoraires() {
  const HAUTEUR = 56;                                   // pixels par heure
  const debut = Math.floor(Math.min.apply(null, COURS.map(function (c) { return enMinutes(c.debut); })) / 60) * 60;
  const fin = Math.ceil(Math.max.apply(null, COURS.map(function (c) { return enMinutes(c.fin); })) / 60) * 60;
  const noms = [];
  COURS.forEach(function (c) { if (!noms.includes(c.nom)) { noms.push(c.nom); } });

  const cal = creer("div", "semaine");
  cal.style.setProperty("--haut", HAUTEUR + "px");
  const tete = creer("div", "semaine-tete");
  tete.appendChild(creer("span", ""));
  JOURS_COURS.forEach(function (j) { tete.appendChild(creer("span", "", j.slice(0, 3))); });
  cal.appendChild(tete);

  const corps = creer("div", "semaine-corps");
  corps.style.height = ((fin - debut) / 60 * HAUTEUR) + "px";
  const heures = creer("div", "semaine-heures");
  for (let m = debut; m < fin; m += 60) {
    const h = creer("span", "", (m / 60) + "h");
    h.style.top = ((m - debut) / 60 * HAUTEUR) + "px";
    heures.appendChild(h);
  }
  corps.appendChild(heures);
  JOURS_COURS.forEach(function (jour) {
    const col = creer("div", "semaine-jour");
    for (let m = debut; m < fin; m += 60) {              // lignes d'heures
      const l = creer("i"); l.style.top = ((m - debut) / 60 * HAUTEUR) + "px"; col.appendChild(l);
    }
    COURS.filter(function (c) { return c.jour === jour; }).forEach(function (c) {
      const b = creer("div", "semaine-cours");
      b.style.top = ((enMinutes(c.debut) - debut) / 60 * HAUTEUR + 1) + "px";
      b.style.height = ((enMinutes(c.fin) - enMinutes(c.debut)) / 60 * HAUTEUR - 2) + "px";
      b.style.background = couleurDe(c.nom, noms);
      b.appendChild(creer("strong", "", c.court || nomCourt(c.nom)));
      b.appendChild(creer("small", "", c.debut + "–" + c.fin));
      b.title = c.nom + " " + c.jour + " " + c.debut + "–" + c.fin;
      col.appendChild(b);
    });
    corps.appendChild(col);
  });
  cal.appendChild(corps);
  zone.appendChild(cal);

  // légende : qui vient à quel cours, et quand
  const leg = creer("div", "legende-cours");
  noms.forEach(function (nom) {
    const lignes = COURS.filter(function (c) { return c.nom === nom; });
    const p = creer("div", "legende-ligne");
    const pastille = creer("span", "legende-point"); pastille.style.background = couleurDe(nom, noms);
    p.appendChild(pastille);
    const t = creer("div");
    t.appendChild(creer("strong", "", nom));
    const quand = [];
    lignes.forEach(function (c) { quand.push(c.jour + " " + c.debut + "–" + c.fin); });
    t.appendChild(creer("p", "petit", quand.join(" · ")));
    t.appendChild(creer("p", "petit", lignes[0].public));
    p.appendChild(t);
    leg.appendChild(p);
  });
  zone.appendChild(leg);
}

// ---------- Onglet Tarifs ----------
function dessinerTarifs() {
  const table = creer("table", "tableau-cours tableau-tarifs");
  const tete = creer("tr");
  ["Cours", "Tarif " + SAISON_TARIFS].forEach(function (t) { tete.appendChild(creer("th", "", t)); });
  table.appendChild(creer("thead")).appendChild(tete);
  const corps = creer("tbody");
  TARIFS.forEach(function (t) {
    const tr = creer("tr");
    const tdn = creer("td", "", t.nom); tdn.appendChild(creer("small", "", t.public)); tr.appendChild(tdn);
    const tdm = creer("td", "", t.montant === null || t.montant === undefined ? "À confirmer" : t.montant + " €");
    if (t.details) { tdm.appendChild(creer("small", "", t.details)); }
    tr.appendChild(tdm);
    corps.appendChild(tr);
  });
  table.appendChild(corps);
  zone.appendChild(creer("div", "tableau-conteneur")).appendChild(table);
  TARIFS_INFOS.forEach(function (i) { zone.appendChild(creer("p", "petit", i)); });
  if (TARIFS.every(function (t) { return t.montant === null || t.montant === undefined; })) {
    zone.appendChild(creer("p", "avertissement", "Les tarifs de la saison seront publiés prochainement par le club."));
  }

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
  if (onglet === "horaires") { dessinerHoraires(); } else { dessinerTarifs(); }
}
afficher();
