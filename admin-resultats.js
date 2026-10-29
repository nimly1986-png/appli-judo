// =====================================================================
//  ESPACE ADMINISTRATEUR : saisir victoires / défaites / nuls et classement
//  de chaque judoka pour une compétition. Chaque modification est enregistrée.
// =====================================================================
const fiches = lireFiches();
const menu = document.getElementById("competition");
const caseTous = document.getElementById("tous");
const zone = document.getElementById("judokas");

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

// toutes les compétitions du calendrier, rangées par mois (celles pas encore commencées sont marquées « à venir »)
const toutes = toutesLesCompetitions();
const commencees = toutes;
const MOIS_NOMS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
let groupe = null, derniereCommencee = 0, moisCourant = "";
toutes.forEach(function (c, i) {
  const mois = c.debut.slice(0, 7);
  if (mois !== moisCourant) {
    moisCourant = mois;
    groupe = document.createElement("optgroup");
    groupe.label = MOIS_NOMS[Number(mois.slice(5, 7)) - 1].replace(/^./, function (x) { return x.toUpperCase(); }) + " " + mois.slice(0, 4);
    menu.appendChild(groupe);
  }
  const o = document.createElement("option");
  o.value = i;
  const avenir = enJours(c.debut) > 0;
  o.textContent = dateCourte(c.debut) + " · " + c.nom + " · " + c.lieu + (avenir ? " (à venir)" : "");
  groupe.appendChild(o);
  if (!avenir) { derniereCommencee = i; }
});
menu.value = String(derniereCommencee);

function compteur(libelle, valeur, quandChange) {
  const boite = creer("div", "compteur");
  boite.appendChild(creer("span", "compteur-nom", libelle));
  const moins = creer("button", "compteur-btn", "−"); moins.type = "button";
  const nombre = creer("strong", "compteur-val", String(valeur));
  const plus = creer("button", "compteur-btn", "+"); plus.type = "button";
  moins.addEventListener("click", function () { if (valeur > 0) { valeur--; nombre.textContent = valeur; quandChange(valeur); } });
  plus.addEventListener("click", function () { valeur++; nombre.textContent = valeur; quandChange(valeur); });
  boite.appendChild(moins); boite.appendChild(nombre); boite.appendChild(plus);
  return boite;
}

function afficher() {
  zone.innerHTML = "";
  const vide = document.getElementById("vide");
  vide.hidden = true;
  const c = commencees[Number(menu.value)];
  if (!c) { vide.hidden = false; vide.textContent = "Aucune compétition sélectionnée."; return; }
  if (enJours(c.debut) > 0) { vide.hidden = false; vide.textContent = "Cette compétition n'a pas encore eu lieu : les résultats se saisissent après la date."; return; }
  const liste = fiches.filter(function (f) { return caseTous.checked || concerne(c, f); });
  if (liste.length === 0) { vide.hidden = false; vide.textContent = "Aucun judoka concerné par cette compétition."; return; }

  liste.forEach(function (f) {
    const carte = creer("div", "carte-resultat");
    carte.appendChild(creer("h3", "", f.prenom + " " + f.nom + " · " + calculerCategorie(f.naissance)));
    const r = resultatDe(f, c) || { v: 0, d: 0, n: 0, classement: "" };
    const etat = { v: Number(r.v) || 0, d: Number(r.d) || 0, n: Number(r.n) || 0, classement: r.classement || "" };
    const enregistrer = function () {
      const toutes = lireResultats();
      toutes[f.id] = toutes[f.id] || {};
      const vide_ = etat.v === 0 && etat.d === 0 && etat.n === 0 && etat.classement === "";
      if (vide_) { delete toutes[f.id][cleCompetition(c)]; } else { toutes[f.id][cleCompetition(c)] = { v: etat.v, d: etat.d, n: etat.n, classement: etat.classement }; }
      enregistrerResultats(toutes);
      statut.textContent = "✔ Enregistré";
    };
    const rang = creer("div", "compteurs");
    rang.appendChild(compteur("Victoires", etat.v, function (x) { etat.v = x; enregistrer(); }));
    rang.appendChild(compteur("Défaites", etat.d, function (x) { etat.d = x; enregistrer(); }));
    rang.appendChild(compteur("Nuls", etat.n, function (x) { etat.n = x; enregistrer(); }));
    carte.appendChild(rang);
    const label = creer("label", "ligne-classement", "Classement ");
    const select = document.createElement("select");
    CLASSEMENTS.forEach(function (cl) {
      const o = document.createElement("option"); o.value = cl.cle; o.textContent = cl.texte; select.appendChild(o);
    });
    select.value = etat.classement;
    select.addEventListener("change", function () { etat.classement = select.value; enregistrer(); });
    label.appendChild(select);
    carte.appendChild(label);
    const statut = creer("p", "statut ok", "");
    carte.appendChild(statut);
    zone.appendChild(carte);
  });
}
menu.addEventListener("change", afficher);
caseTous.addEventListener("change", afficher);
afficher();
