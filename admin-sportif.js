// =====================================================================
//  SPORTIF : récapitulatif des résultats des compétitions (par judoka et par compétition).
//  Source : résultats saisis dans admin-resultats.html (enregistrés sur cet appareil).
// =====================================================================
const fiches = lireFiches();
function tableau(entetes) {
  const t = creer("table", "tableau-cours tableau-synthese tableau-sport");
  const tete = creer("tr"); entetes.forEach(function (e) { tete.appendChild(creer("th", "", e)); });
  t.appendChild(creer("thead")).appendChild(tete);
  t.appendChild(creer("tbody"));
  return t;
}
function ligne(t, cellules, classe) {
  const tr = creer("tr", classe || "");
  cellules.forEach(function (c) { tr.appendChild(creer("td", "", String(c))); });
  t.lastChild.appendChild(tr);
}
function afficherTableau(zoneId, t, vide, nb) {
  const zone = document.getElementById(zoneId);
  if (!nb) { zone.appendChild(creer("p", "message-vide", vide)); return; }
  const c = creer("div", "tableau-conteneur"); c.appendChild(t); zone.appendChild(c);
}
const MEDAILLES = { or: "🥇", argent: "🥈", bronze: "🥉" };

// ----- Par judoka -----
(function () {
  const t = tableau(["Judoka", "Comp.", "V", "D", "N", "% V", "Podiums"]);
  let nb = 0;
  const tot = { comp: 0, v: 0, d: 0, n: 0, or: 0, argent: 0, bronze: 0 };
  fiches.forEach(function (f) {
    const b = bilanJudoka(f);
    if (!b.lignes.length) { return; }
    nb++;
    tot.comp += b.lignes.length; tot.v += b.total.v; tot.d += b.total.d; tot.n += b.total.n;
    tot.or += b.total.or; tot.argent += b.total.argent; tot.bronze += b.total.bronze;
    const podiums = [["or", b.total.or], ["argent", b.total.argent], ["bronze", b.total.bronze]].filter(function (x) { return x[1] > 0; })
      .map(function (x) { return MEDAILLES[x[0]] + "×" + x[1]; }).join(" ") || "—";
    ligne(t, [f.prenom + " " + f.nom + " (" + calculerCategorie(f.naissance) + ")", b.lignes.length, b.total.v, b.total.d, b.total.n, b.pourcentage === null ? "—" : b.pourcentage + " %", podiums]);
  });
  if (nb) {
    const combats = tot.v + tot.d + tot.n;
    ligne(t, ["Total", tot.comp, tot.v, tot.d, tot.n, combats ? Math.round(100 * tot.v / combats) + " %" : "—", "🥇×" + tot.or + " 🥈×" + tot.argent + " 🥉×" + tot.bronze], "total");
  }
  afficherTableau("par-judoka", t, "Aucun résultat saisi pour l'instant.", nb);
})();

// ----- Par compétition -----
(function () {
  const resultats = lireResultats();
  const t = tableau(["Compétition", "Judokas", "V", "D", "N", "Podiums"]);
  let nb = 0;
  toutesLesCompetitions().forEach(function (c) {
    const cle = cleCompetition(c);
    const lignes = [];
    fiches.forEach(function (f) { const r = resultats[f.id] && resultats[f.id][cle]; if (r) { lignes.push({ f: f, r: r }); } });
    if (!lignes.length) { return; }
    nb++;
    const s = { v: 0, d: 0, n: 0 }, pod = [];
    lignes.forEach(function (l) {
      s.v += Number(l.r.v) || 0; s.d += Number(l.r.d) || 0; s.n += Number(l.r.n) || 0;
      if (MEDAILLES[l.r.classement]) { pod.push(MEDAILLES[l.r.classement] + " " + l.f.prenom); }
    });
    ligne(t, [dateCourte(c.debut) + " · " + c.nom, lignes.length, s.v, s.d, s.n, pod.join(", ") || "—"]);
  });
  afficherTableau("par-competition", t, "Aucune compétition avec résultats pour l'instant.", nb);
})();
