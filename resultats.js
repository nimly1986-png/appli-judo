// =====================================================================
//  PAGE "RÉSULTATS" (lecture seule) :
//   1) les résultats d'une compétition si on arrive depuis une compétition terminée ;
//   2) le tableau récapitulatif de la saison d'un judoka et son bilan sportif.
//  Les résultats sont saisis par l'administrateur (admin-resultats.html).
// =====================================================================
const fiches = lireFiches();

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

function cellule(ligne, texte) { const c = ligne.insertCell(); c.textContent = texte; return c; }
function enTete(tableau, titres) {
  const e = tableau.insertRow();
  titres.forEach(function (t) { const th = document.createElement("th"); th.textContent = t; e.appendChild(th); });
}
function envelopper(tableau) { const d = creer("div", "tableau-conteneur"); d.appendChild(tableau); return d; }

// ----- 1) une compétition -----
const cle = new URLSearchParams(location.search).get("c");
const competition = cle && toutesLesCompetitions().find(function (c) { return cleCompetition(c) === cle; });
if (competition) {
  document.getElementById("bloc-competition").hidden = false;
  document.getElementById("titre-competition").textContent = competition.nom;
  document.getElementById("infos-competition").textContent = texteDate(competition) + " · " + competition.lieu;
  const zone = document.getElementById("table-competition");
  const lignes = fiches.map(function (f) { return { f: f, r: resultatDe(f, competition) }; })
    .filter(function (x) { return x.r; });
  if (lignes.length === 0) {
    zone.appendChild(creer("p", "message-vide", "Les résultats de cette compétition ne sont pas encore publiés."));
  } else {
    const t = document.createElement("table");
    enTete(t, ["Judoka", "V", "D", "N", "Classement"]);
    lignes.forEach(function (x) {
      const l = t.insertRow();
      cellule(l, x.f.prenom + " " + (x.f.nom || "").charAt(0) + ".");   // prénom + initiale du nom
      cellule(l, x.r.v); cellule(l, x.r.d); cellule(l, x.r.n);
      cellule(l, texteClassement(x.r.classement));
    });
    zone.appendChild(envelopper(t));
  }
}

// ----- 2) tableau récapitulatif et bilan -----
const menu = document.getElementById("choix");

function afficherJudoka() {
  const f = fiches[Number(menu.value)];
  const recap = document.getElementById("recap");
  const bilanZone = document.getElementById("bilan");
  recap.innerHTML = ""; bilanZone.innerHTML = "";
  const b = bilanJudoka(f);

  if (b.lignes.length === 0) {
    recap.appendChild(creer("p", "message-vide", "Aucun résultat saisi pour " + f.prenom + " pour le moment."));
    return;
  }
  const t = document.createElement("table");
  enTete(t, ["Date", "Compétition", "V", "D", "N", "Classement"]);
  b.lignes.forEach(function (l) {
    const tr = t.insertRow();
    cellule(tr, dateCourte(l.c.debut));
    cellule(tr, l.c.nom + " (" + l.c.lieu.split("(")[0].trim() + ")");
    cellule(tr, l.r.v); cellule(tr, l.r.d); cellule(tr, l.r.n);
    cellule(tr, texteClassement(l.r.classement));
  });
  const tot = t.insertRow(); tot.className = "total";
  cellule(tot, ""); cellule(tot, "Total");
  cellule(tot, b.total.v); cellule(tot, b.total.d); cellule(tot, b.total.n); cellule(tot, "");
  recap.appendChild(envelopper(t));

  // ----- bilan sportif -----
  const fin = finDeSaison();
  const termine = fin && enJours(fin) < 0;
  const aVenir = toutesLesCompetitions().filter(function (c) { return concerne(c, f) && !estPassee(c); }).length;
  const carte = creer("section", "bilan-carte");
  carte.appendChild(creer("h2", "", termine ? "🏅 Bilan sportif de la saison " + SAISON : "🏅 Bilan provisoire de la saison " + SAISON));
  if (!termine) { carte.appendChild(creer("p", "petit", "Saison en cours : le bilan définitif sera établi après la dernière compétition du calendrier (" + (fin ? texteDate({ debut: fin }) : "—") + ").")); }
  const grille = creer("div", "bilan-grille");
  [["Compétitions", b.lignes.length], ["Combats", b.combats], ["Victoires", b.total.v], ["Défaites", b.total.d], ["Nuls", b.total.n],
   ["% victoires", b.pourcentage === null ? "—" : b.pourcentage + " %"]].forEach(function (x) {
    const c = creer("div", "bilan-case");
    c.appendChild(creer("strong", "", String(x[1])));
    c.appendChild(creer("span", "", x[0]));
    grille.appendChild(c);
  });
  carte.appendChild(grille);
  carte.appendChild(creer("p", "", "🥇 " + b.total.or + "   🥈 " + b.total.argent + "   🥉 " + b.total.bronze));
  if (b.meilleur) {
    carte.appendChild(creer("p", "", "Meilleur résultat : " + texteClassement(b.meilleur.r.classement) + " — " + b.meilleur.c.nom + " (" + dateCourte(b.meilleur.c.debut) + ")."));
  }
  carte.appendChild(creer("p", "petit", aVenir > 0 ? aVenir + " compétition(s) restante(s) pour sa catégorie sur le calendrier." : "Plus de compétition à venir pour sa catégorie sur le calendrier."));
  const imprimer = creer("button", "bouton secondaire bouton-imprimer", "🖨️ Imprimer / enregistrer en PDF");
  imprimer.type = "button";
  imprimer.addEventListener("click", function () { window.print(); });
  carte.appendChild(imprimer);
  bilanZone.appendChild(carte);
}

if (fiches.length === 0) {
  document.getElementById("sans-fiche").hidden = false;
} else {
  choisirJudoka(fiches, document.getElementById("zone-choix"), menu, afficherJudoka);
  afficherJudoka();
}
