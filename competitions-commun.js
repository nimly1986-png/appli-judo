// =====================================================================
//  CODE COMMUN aux pages "Compétitions" et "Agenda".
//  Il a besoin de judo-commun.js et competitions-data.js (chargés avant).
// =====================================================================
const JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
// ----- Les séries de compétitions (un bouton chacune sur la page Compétitions) -----
const SERIES = [
  { cle: "interclub", nom: "Interclubs", icone: "🤼", couleur: "var(--vert)",
    note: "Rencontres amicales entre clubs du Rhône. Les horaires du flyer (9h, 10h, 11h) concernent les judokas nés en 2021, 2020 et 2019." },
  { cle: "championnat", nom: "Championnats", icone: "🏆", couleur: "var(--orange)",
    note: "Championnats et coupes du district, du Rhône, inter-départemental, de la ligue AURA et de France, plus les circuits. Lieux à confirmer par le comité." },
  { cle: "labelA", nom: "Label A", icone: "🥋", couleur: "var(--bleu)",
    note: "Tournois Label A de toute la France (liste au 25/08/2026). Utilisez « Seulement la région » pour ne garder que ceux de notre ligue." },
  { cle: "excellence", nom: "Label Excellence", icone: "⭐", couleur: "var(--violet)",
    note: "Tournois Label Excellence et Super Excellence (liste au 03/09/2026), pris en compte pour la qualification au championnat de France 1re division. Arrêt RLN (classement national) : cadets 24/01/2027, juniors 21/02/2027, seniors 04/04/2027." },
  { cle: "veterans", nom: "Vétérans", icone: "🎖️", couleur: "var(--marron)",
    note: "Calendrier France Judo Vétérans 2026-2027, donné à titre prévisionnel. Le tournoi Label Excellence de Tremblay-en-France n'a pas encore de date. Le championnat d'Europe vétérans 2027 n'a ni lieu ni date connus." },
  { cle: "grade", nom: "Passages de grade", icone: "🥋", couleur: "#b8872a",
    note: "Ligue AURA, saison 2026-2027 (mise à jour du 15/09/2026). Shiai (UV3) le samedi, kata et technique (UV1 et UV2) le dimanche. Inscription sur l'extranet 1 mois avant (10 jours pour les candidats hors ligue), certaines UV à 5 €, judogi blanc sans dossard." },
  { cle: "officiels", nom: "Arbitrage", icone: "🟨", couleur: "var(--jaune)",
    note: "Coupes des jeunes arbitres et commissaires sportifs, formations d'arbitrage et de commissaire sportif. Public non précisé pour les formations : voir le comité." },
  { cle: "stage", nom: "Stages", icone: "🎓", couleur: "var(--vert)",
    note: "Stages sportifs départementaux du Rhône (Benjamins, Minimes, Cadets). Seuls ces stages figurent dans les documents reçus : les stages de ligue ou de club ne sont pas listés." },
  { cle: "autres", nom: "Kata, jujitsu", icone: "📅", couleur: "var(--blanc)",
    note: "Kata et jujitsu (district, Rhône, inter-départemental, ligue). Public non précisé : voir le comité du Rhône." }
];
// ----- Niveau géographique (calculé, rien à saisir) : du plus proche de Saint-Pierre-de-Chandieu au plus lointain -----
const NIVEAUX = [
  { cle: "local", nom: "Local", note: "Club, district et Rhône (Saint-Pierre-de-Chandieu, 69780)", couleur: "var(--vert)" },
  { cle: "regional", nom: "Régional", note: "Inter-départemental et ligue Auvergne-Rhône-Alpes", couleur: "var(--bleu)" },
  { cle: "national", nom: "National", note: "Championnats de France et tournois labellisés hors de notre région", couleur: "var(--orange)" },
  { cle: "international", nom: "International", note: "Compétitions à l'étranger", couleur: "var(--violet)" }
];
function niveauCompetition(c) {
  if (c.region === "Étranger") { return "international"; }
  if (c.serie === "interclub" || c.serie === "stage") { return "local"; }
  if (/Ligue AURA|Inter-départemental/i.test(c.nom)) { return "regional"; }
  if (/District|Rhône/.test(c.nom) || (c.serie === "grade" && /Rhône|69/.test(c.lieu))) { return "local"; }
  if (/France/.test(c.nom)) { return "national"; }
  if (c.region === "AURA") { return "regional"; }
  if (!c.region) { return "local"; }
  return "national";
}
function rangNiveau(c) { return NIVEAUX.findIndex(function (n) { return n.cle === niveauCompetition(c); }); }

// ----- Export vers l'agenda perso (fichier .ics : Google Agenda, Apple, Outlook) -----
function icsTexte(t) { return String(t || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
function icsDate(iso, plusJours) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + (plusJours || 0));
  return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
}
function icsEvenement(c) {
  const id = (c.debut + c.nom + c.lieu).replace(/[^A-Za-z0-9]/g, "").slice(0, 60);
  const lignes = ["BEGIN:VEVENT", "UID:" + id + "@jco-chandieu", "DTSTAMP:" + icsDate(aujourdhuiISO()) + "T080000Z",
    "DTSTART;VALUE=DATE:" + icsDate(c.debut), "DTEND;VALUE=DATE:" + icsDate(c.fin || c.debut, 1),
    "SUMMARY:" + icsTexte(iconeSerie(c) + " " + c.nom), "LOCATION:" + icsTexte(c.lieu),
    "DESCRIPTION:" + icsTexte((c.aConfirmer ? "Lieu et horaires à confirmer. " : "") + (c.infos || "")),
    "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Demain : " + icsTexte(c.nom), "TRIGGER:-P1D", "END:VALARM", "END:VEVENT"];
  return lignes.join("\r\n");
}
function telechargerICS(liste, nomFichier) {
  const texte = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JCO Chandieu//Appli parents//FR", "CALSCALE:GREGORIAN"]
    .concat(liste.map(icsEvenement)).concat(["END:VCALENDAR"]).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([texte], { type: "text/calendar;charset=utf-8" }));
  a.download = nomFichier || "competitions.ics";
  document.body.appendChild(a); a.click(); a.remove();
}

function iconeSerie(c) {
  const s = SERIES.find(function (x) { return x.cle === c.serie; });
  return s ? s.icone : (c.type === "interclub" ? "🤼" : c.type === "grade" ? "🥋" : "🏆");
}

const MOIS_LONGS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// ----- La date du jour (on peut la simuler en ajoutant ?date=2025-10-05 dans l'adresse) -----
const dateSimulee = new URLSearchParams(location.search).get("date");
function aujourdhuiISO() {
  if (dateSimulee && /^\d{4}-\d{2}-\d{2}$/.test(dateSimulee)) { return dateSimulee; }
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function enJours(iso) {                       // nombre de jours entre aujourd'hui et iso
  return Math.round((new Date(iso + "T12:00:00") - new Date(aujourdhuiISO() + "T12:00:00")) / 86400000);
}
function dateCourte(iso) {
  const d = new Date(iso + "T12:00:00");
  return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()];
}
function texteDate(c) {
  if (!c.fin) { return dateCourte(c.debut) + " " + c.debut.slice(0, 4); }
  return dateCourte(c.debut) + " → " + dateCourte(c.fin) + " " + c.fin.slice(0, 4);
}
function estPassee(c) { return enJours(c.fin || c.debut) < 0; }

// ----- Quel judoka ? (le choix est mémorisé sur cet appareil) -----
function categoriesDuJudoka(fiche) {
  const liste = [calculerCategorie(fiche.naissance)];
  if (calculerAge(fiche.naissance) >= 30) { liste.push("Vétéran"); }
  return liste;
}
function concerne(c, fiche) {
  const mesCategories = categoriesDuJudoka(fiche);
  return c.categories.some(function (cat) { return mesCategories.includes(cat); });
}
function choisirJudoka(fiches, zoneChoix, menu, siChange) {
  let id = Number(localStorage.getItem("judokaChoisi"));
  let index = fiches.findIndex(function (f) { return f.id === id; });
  if (index < 0) { index = 0; }
  fiches.forEach(function (f, i) {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = f.prenom + " " + f.nom;
    menu.appendChild(o);
  });
  menu.value = index;
  zoneChoix.hidden = fiches.length < 2;
  menu.addEventListener("change", function () {
    localStorage.setItem("judokaChoisi", fiches[Number(menu.value)].id);
    siChange();
  });
}

// ----- Les compétitions : celles du fichier de données + celles ajoutées par l'administrateur -----
function lireAjoutees() {
  try { return JSON.parse(localStorage.getItem("competitionsAjoutees")) || []; } catch (e) { return []; }
}
function enregistrerAjoutees(liste) { localStorage.setItem("competitionsAjoutees", JSON.stringify(liste)); }
function toutesLesCompetitions() {
  return competitions.concat(lireAjoutees()).sort(function (a, b) {
    return a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0;
  });
}

// ----- Inscriptions : validées UNIQUEMENT depuis l'espace administrateur -----
function lireInscriptions() {
  try { return JSON.parse(localStorage.getItem("inscriptions")) || {}; } catch (e) { return {}; }
}
function enregistrerInscriptions(objet) { localStorage.setItem("inscriptions", JSON.stringify(objet)); }
function estInscrit(fiche, c) {
  const toutes = lireInscriptions();
  return !!(fiche && fiche.id && toutes[fiche.id] && toutes[fiche.id][cleCompetition(c)]);
}
function prochaineEcheance(fiche) {
  if (!fiche || !fiche.naissance) { return null; }
  return toutesLesCompetitions().find(function (c) { return concerne(c, fiche) && !estPassee(c); }) || null;
}

// ----- La checklist de chaque judoka (cases cochées, par compétition) -----
const ETAPES = [];            // plus de cases passeport / trajet : l'agenda sert maintenant aux favoris

// ----- Favoris : compétitions marquées par la famille (enregistrées sur cet appareil) -----
function lireFavoris() { try { return JSON.parse(localStorage.getItem("favoris")) || []; } catch (e) { return []; } }
function ecrireFavoris(l) { try { localStorage.setItem("favoris", JSON.stringify(l)); } catch (e) {} }
function estFavori(c) { return lireFavoris().indexOf(cleCompetition(c)) !== -1; }
function basculerFavori(c) {
  const l = lireFavoris(), cle = cleCompetition(c), i = l.indexOf(cle);
  if (i === -1) { l.push(cle); } else { l.splice(i, 1); }
  ecrireFavoris(l);
  document.dispatchEvent(new Event("favoris"));
  return i === -1;
}
function boutonFavori(c) {
  const b = creer("button", "favori" + (estFavori(c) ? " actif" : ""));
  b.type = "button";
  b.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="kimono" d="M17 6l7 6 7-6 11 9-5 7-5-3v24H16V19l-5 3-5-7z"/><path class="ceinture" d="M16 30h16"/></svg>';
  const maj = function () {
    const on = estFavori(c);
    b.classList.toggle("actif", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.setAttribute("aria-label", on ? "Retirer des favoris : " + c.nom : "Ajouter aux favoris : " + c.nom);
    b.title = on ? "Retirer des favoris" : "Mettre en favori";
  };
  maj();
  b.addEventListener("click", function () {
    const on = basculerFavori(c);
    maj();
    if (on) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
  });
  return b;
}
const cleCompetition = (c) => c.debut + "|" + c.nom + "|" + c.lieu;
function lireCases(fiche) {
  try { return JSON.parse(localStorage.getItem("agenda-" + fiche.id)) || {}; } catch (e) { return {}; }
}
function enregistrerCases(fiche, cases) {
  localStorage.setItem("agenda-" + fiche.id, JSON.stringify(cases));
}

// ----- Une carte de compétition -----
function creerCarteCompetition(c, fiche, avecChecklist, avecAgenda) {
  const li = creer("li", "competition" + (estPassee(c) ? " passee" : ""));
  const jours = enJours(c.debut);
  const badge = creer("div", "date-badge");
  badge.appendChild(creer("strong", "", c.debut.slice(8, 10).replace(/^0/, "")));
  badge.appendChild(creer("span", "", MOIS[Number(c.debut.slice(5, 7)) - 1]));
  li.appendChild(badge);

  const corps = creer("div", "competition-corps");
  corps.appendChild(creer("h3", "", iconeSerie(c) + " " + c.nom));
  corps.appendChild(creer("p", "", texteDate(c)));
  corps.appendChild(creer("p", "", "📍 " + c.lieu));
  if (c.aConfirmer && !estPassee(c)) { corps.appendChild(creer("p", "petit", "⚠️ Lieu et horaires à confirmer")); }
  if (c.infos) { corps.appendChild(creer("p", "petit", c.infos)); }
  const niv = NIVEAUX[rangNiveau(c)];
  corps.appendChild(creer("p", "petit", "Niveau : " + niv.nom));
  if (estPassee(c)) {
    corps.appendChild(creer("p", "compte", "Terminée"));
    const lien = creer("a", "bouton-resultats", "🥇 Voir les résultats");
    lien.href = "resultats.html?c=" + encodeURIComponent(cleCompetition(c));
    corps.appendChild(lien);
  } else if (jours <= 0) {
    corps.appendChild(creer("p", "compte urgent", "En cours"));
  } else {
    corps.appendChild(creer("p", "compte" + (jours <= 14 ? " urgent" : ""), "Dans " + jours + (jours > 1 ? " jours" : " jour")));
  }
  if (!estPassee(c)) {      // compétition à venir : lien pour l'ajouter à son agenda (fichier .ics)
    const bAgenda = creer("button", "bouton-resultats", "📆 Ajouter à mon agenda");
    bAgenda.type = "button";
    bAgenda.addEventListener("click", function () { telechargerICS([c], "competition-" + c.debut + ".ics"); });
    corps.appendChild(bAgenda);
  }
  if (fiche && !estPassee(c)) {
    corps.appendChild(creer("p", "statut " + (estInscrit(fiche, c) ? "ok" : "attente"),
      estInscrit(fiche, c) ? "✅ Inscription validée par le club" : "⏳ Inscription non validée"));
  }
  if (avecChecklist && fiche && !estPassee(c)) {
    const cases = lireCases(fiche);
    const cle = cleCompetition(c);
    const boite = creer("div", "checklist");
    ETAPES.forEach(function (e) {
      const label = creer("label", "case");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = !!(cases[cle] && cases[cle][e.cle]);
      input.addEventListener("change", function () {
        const toutes = lireCases(fiche);
        toutes[cle] = toutes[cle] || {};
        toutes[cle][e.cle] = input.checked;
        enregistrerCases(fiche, toutes);
        li.classList.toggle("fait", ETAPES.every(function (x) { return toutes[cle][x.cle]; }));
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + e.texte));
      boite.appendChild(label);
    });
    corps.appendChild(boite);
    li.classList.toggle("fait", ETAPES.every(function (x) { return cases[cle] && cases[cle][x.cle]; }));
  }
  li.appendChild(corps);
  li.appendChild(boutonFavori(c));
  return li;
}

// =====================================================================
//  RÉSULTATS : saisis UNIQUEMENT par l'administrateur (admin-resultats.html),
//  lus par les familles (resultats.html). Enregistrés sur cet appareil.
//  Forme : { idJudoka: { cleCompetition: { v: 2, d: 1, n: 0, classement: "bronze" } } }
// =====================================================================
const CLASSEMENTS = [
  { cle: "", texte: "— (non renseigné)", rang: 99 },
  { cle: "or", texte: "🥇 1er", rang: 1 },
  { cle: "argent", texte: "🥈 2e", rang: 2 },
  { cle: "bronze", texte: "🥉 3e", rang: 3 },
  { cle: "5", texte: "5e", rang: 5 },
  { cle: "7", texte: "7e", rang: 7 },
  { cle: "part", texte: "Participation", rang: 50 }
];
function texteClassement(cle) {
  const c = CLASSEMENTS.find(function (x) { return x.cle === cle; });
  return c && cle ? c.texte : "—";
}
function lireResultats() {
  try { return JSON.parse(localStorage.getItem("resultats")) || {}; } catch (e) { return {}; }
}
function enregistrerResultats(objet) { localStorage.setItem("resultats", JSON.stringify(objet)); }
function resultatDe(fiche, c) {
  const r = lireResultats();
  return (fiche && fiche.id && r[fiche.id] && r[fiche.id][cleCompetition(c)]) || null;
}

// Bilan d'un judoka : totaux + liste des compétitions où un résultat est saisi
function bilanJudoka(fiche) {
  const lignes = [];
  const total = { v: 0, d: 0, n: 0, or: 0, argent: 0, bronze: 0 };
  toutesLesCompetitions().forEach(function (c) {
    const r = resultatDe(fiche, c);
    if (!r) { return; }
    lignes.push({ c: c, r: r });
    total.v += Number(r.v) || 0;
    total.d += Number(r.d) || 0;
    total.n += Number(r.n) || 0;
    if (total[r.classement] !== undefined) { total[r.classement] += 1; }
  });
  const combats = total.v + total.d + total.n;
  const meilleur = lignes.filter(function (l) { return l.r.classement && l.r.classement !== "part"; })
    .sort(function (a, b) {
      const ra = CLASSEMENTS.find(function (x) { return x.cle === a.r.classement; }).rang;
      const rb = CLASSEMENTS.find(function (x) { return x.cle === b.r.classement; }).rang;
      return ra - rb;
    })[0] || null;
  return { lignes: lignes, total: total, combats: combats, meilleur: meilleur,
           pourcentage: combats ? Math.round(100 * total.v / combats) : null };
}
// Dernier jour de la saison = date de la dernière compétition du calendrier
function finDeSaison() {
  const toutes = toutesLesCompetitions();
  const derniere = toutes[toutes.length - 1];
  return derniere ? (derniere.fin || derniere.debut) : null;
}
