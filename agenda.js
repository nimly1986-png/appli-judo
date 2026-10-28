// =====================================================================
//  PAGE "AGENDA" : les prochaines échéances du judoka, mois par mois,
//  avec une checklist (cases à cocher mémorisées sur cet appareil).
// =====================================================================
const fiches = lireFiches();
const zone = document.getElementById("liste");

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

function afficher() {
  zone.innerHTML = "";
  const fiche = fiches[Number(document.getElementById("choix").value)];
  const aVenir = toutesLesCompetitions().filter(function (c) { return concerne(c, fiche) && !estPassee(c); });
  document.getElementById("resume").textContent =
    fiche.prenom + " · catégorie " + categoriesDuJudoka(fiche).join(" + ");
  if (aVenir.length === 0) {
    zone.appendChild(creer("p", "message-vide", "Aucune échéance à venir dans le calendrier " + SAISON + ". Le calendrier de la prochaine saison doit être ajouté par l'administrateur."));
    return;
  }
  // la prochaine échéance, en grand
  const prochaine = aVenir[0];
  const j = enJours(prochaine.debut);
  zone.appendChild(creer("h2", "", "⏭ Prochaine échéance"));
  const u1 = creer("ul");
  u1.appendChild(creerCarteCompetition(prochaine, fiche, true));
  zone.appendChild(u1);

  // le reste, regroupé par mois
  let moisCourant = "";
  let ul = null;
  aVenir.slice(1).forEach(function (c) {
    const mois = c.debut.slice(0, 7);
    if (mois !== moisCourant) {
      moisCourant = mois;
      zone.appendChild(creer("h2", "", MOIS_LONGS[Number(mois.slice(5)) - 1] + " " + mois.slice(0, 4)));
      ul = creer("ul");
      zone.appendChild(ul);
    }
    ul.appendChild(creerCarteCompetition(c, fiche, true));
  });
}

if (fiches.length === 0) {
  document.getElementById("vide").hidden = false;
} else {
  choisirJudoka(fiches, document.getElementById("zone-choix"), document.getElementById("choix"), afficher);
  afficher();
}
