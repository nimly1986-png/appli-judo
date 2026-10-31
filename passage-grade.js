// =====================================================================
//  PASSAGE DE GRADE (ceinture noire et dans supérieurs)
//  Source : textes officiels FFJDA 2026-2027 (règlement des grades, pages 87 à 101).
//  Les listes de techniques du 1er au 3e dan sont celles de l'annexe 1 (Programme technique judo pour l'UV2),
//  vérifiées sur une copie du document FFJudo ; elles correspondent aussi à l'onglet Technique.
// =====================================================================
const SOURCE_GRADES = "Source : textes officiels FFJDA 2026-2027 (édition de septembre 2026), règlement des grades : conditions de présentation et d'homologation, contenu des examens judo du 1er au 7e dan. Les listes de techniques du 1er au 3e dan sont celles de l'annexe 1 « Programme technique judo pour l'UV2 du 1er au 3e dan » (copie du document FFJudo fournie par le président du club). Résumé fait par Claude, non relu par la commission des grades.";

const GRADES = [
  { cle: "1", nom: "1er dan",
    cond: ["Présentation aux épreuves : être né en 2012 ou avant, dès l'homologation de la ceinture marron.", "Homologation du grade : à partir de 15 ans révolus, après 1 an de ceinture marron.", "Justifier d'au moins 2 licences FFJDA (ou d'une fédération affiliée à la FIJ ou à la fédération internationale de jujitsu) à la date de la première épreuve."],
    uv: [["UV1 — Kata", ["Présenter les 3 premières séries du nage-no-kata dans le rôle de tori, avec une série choisie par le jury dans le rôle de uke.", "Les candidats de 40 ans et plus sont exemptés du rôle de uke.", "Équivalence : podiums des championnats de France de kata (à demander à l'examen)."]], ["UV2 — Technique", ["6 techniques en nage-waza et 4 techniques en ne-waza, choisies par le jury dans l'annexe 1. Le jury impose des techniques qui couvrent l'ensemble des familles.", "Nage-waza en déplacement, dans un contexte dynamique (déplacements, enchaînements). Ne-waza en situation d'étude (par exemple renversement, position quadrupédique).", "Une méconnaissance est acceptée dans chacun des deux domaines. Durée de l'épreuve : 5 minutes maximum."]], ["UV3 — Efficacité", ["1re option, efficacité sportive : 100 points en relation grade-championnat ou en shiai / test d'efficacité judo, sur plusieurs épreuves ; ou 5 victoires consécutives par ippon (10 points) ou waza-ari (7 points) totalisant au moins 44 points dans une seule compétition.", "2e option, efficacité combinée : A) 20 points en shiai / test d'efficacité et/ou relation grade-championnat (les candidats de 40 ans et plus en sont dispensés) ; B) uchi-komi en déplacement de 1 min 30 sur 2 techniques différentes (1 sur avancée, 1 sur recul), nage-komi en déplacement, et 2 exercices d'application de type kakari-geiko et/ou yaku-soku-geiko de 2 min.", "Cette UV n'est pas fractionnable."]], ["UV4 — Engagement", ["Une demi-journée de stage ou de mise en situation comme commissaire sportif ou arbitre.", "Équivalences : commissaire sportif ou arbitre départemental en activité ; participation à la coupe du jeune officiel. Validation par l'OTD, résultat saisi sur l'extranet.", "Une UV4 acquise pour le 1er dan est équivalente en judo, jujitsu traditionnel, jiu-jitsu brésilien et jujitsu contact."]]],
    nage: ["Haraï-goshi", "Ippon-seoi-nage", "De-ashi-barai", "Sumi-gaeshi", "Kubi-nage", "Kata-guruma", "Hiza-guruma", "Tomoe-nage", "Koshi-guruma", "Uki-otoshi", "Sasae-tsurikomi-ashi", "O-goshi", "Tai-otoshi", "Ko-soto-gari", "Tsurikomi-goshi", "Morote-seoi-nage", "Ko-uchi-gari", "Uchi-mata", "Okuri-ashi-barai", "Uki-goshi", "O-soto-gari", "O-uchi-gari"],
    ne: ["Hon-gesa-gatame", "Kami-shiho-gatame", "Yoko-shiho-gatame", "Tate-shiho-gatame", "Ushiro-gesa-gatame", "Gyaku-juji-jime", "Hadaka-jime", "Kata-juji-jime", "Nami-juji-jime", "Okuri-eri-jime", "Ude-hishigi-juji-gatame", "Ude-hishigi-ude-gatame", "Ude-garami"],
    remarque: "Liste conforme à l'annexe 1 « Programme technique judo pour l'UV2 du 1er au 3e dan » (document FFJudo vérifié ligne à ligne : 22 techniques de nage-waza et 13 de ne-waza)." },
  { cle: "2", nom: "2e dan",
    cond: ["Présentation aux épreuves : 15 ans révolus, dès l'homologation du 1er dan.", "Homologation du grade : à partir de 17 ans révolus, après 1 an de ceinture noire 1er dan."],
    uv: [["UV1 — Kata", ["Présenter les 5 séries du nage-no-kata dans le rôle de tori.", "Équivalence : podiums des championnats de France de kata (à demander à l'examen)."]], ["UV2 — Technique", ["Une technique de nage-waza et une de ne-waza au choix du candidat (de 3 à 4 minutes).", "Puis 6 techniques de nage-waza et 3 techniques de ne-waza choisies par le jury dans l'annexe 1, différentes de celles choisies par le candidat (5 minutes maximum).", "Nage-waza en contexte dynamique, ne-waza en situation d'étude."]], ["UV3 — Efficacité", ["1re option : 100 points en relation grade-championnat ou shiai / test d'efficacité, ou 5 victoires consécutives par ippon ou waza-ari totalisant au moins 44 points en une seule compétition.", "2e option : 20 points (dispense à partir de 40 ans) et uchi-komi de 1 min 30 sur 2 techniques différentes, nage-komi en déplacement et 2 exercices d'application de 2 min."]], ["UV4 — Engagement", ["Une demi-journée de stage ou de mise en situation comme commissaire sportif ou arbitre (mêmes équivalences que pour le 1er dan)."]]],
    nage: ["Hane-goshi", "Sode-tsurikomi-goshi", "Tsuri-goshi", "Kuchiki-taoshi", "Tsubame-gaeshi", "Eri-seoi-nage", "Te-guruma", "Morote-gari", "O-guruma", "Ashi-guruma", "Ko-soto-gake", "O-soto-otoshi", "Ko-uchi-makikomi", "Ura-nage", "Tani-otoshi", "Yoko-guruma", "Yoko-gake", "Yoko-tomoe-nage", "Uki-waza"],
    ne: ["Kuzure-kami-shiho-gatame", "Kuzure-gesa-gatame", "Kuzure-tate-shiho-gatame", "Kuzure-yoko-shiho-gatame", "Sankaku-jime", "Kata-ha-jime", "Kata-te-jime", "Sode-guruma-jime", "Ude-hishigi-hiza-gatame", "Ude-hishigi-waki-gatame"],
    remarque: "Liste conforme à l'annexe 1 « Programme technique judo pour l'UV2 du 1er au 3e dan » (document FFJudo vérifié ligne à ligne)." },
  { cle: "3", nom: "3e dan",
    cond: ["Présentation aux épreuves : 17 ans révolus, dès l'homologation du 2e dan.", "Homologation du grade : à partir de 20 ans révolus, après 1 an de ceinture noire 2e dan."],
    uv: [["UV1 — Kata", ["Présenter le katame-no-kata dans le rôle de tori.", "Équivalence : podiums des championnats de France de kata (à demander à l'examen)."]], ["UV2 — Technique", ["3 techniques de nage-waza au choix du candidat (3 minutes minimum, dans des directions différentes et en contexte dynamique) et 2 techniques de ne-waza au choix (3 minutes minimum, à partir de situations de combat). Durée totale : 8 minutes maximum.", "Puis 5 techniques de l'annexe 1 choisies par le jury : 3 en nage-waza et 2 en ne-waza (5 minutes maximum)."]], ["UV3 — Efficacité", ["1re option : 100 points en relation grade-championnat ou shiai / test d'efficacité, ou 5 victoires consécutives par ippon ou waza-ari totalisant au moins 44 points en une seule compétition.", "2e option : 20 points (dispense à partir de 40 ans), uchi-komi de 1 min maximum sur 3 techniques différentes, nage-komi de 1 min maximum sur 2 techniques différentes et 2 exercices d'application de 2 min maximum."]], ["UV4 — Engagement", ["Une journée de stage ou de mise en situation comme commissaire sportif ou arbitre (mêmes équivalences que pour le 1er dan). Une UV4 acquise pour le 3e dan est équivalente dans les autres disciplines."]]],
    nage: ["Utsuri-goshi", "Ushiro-goshi", "Uchi-mata-sukashi", "Sukui-nage", "Yama-arashi", "Seoi-otoshi", "Sumi-otoshi", "Kibisu-gaeshi", "O-soto-gaeshi", "Yoko-otoshi", "Tawara-gaeshi", "Harai-tsurikomi-ashi", "O-soto-guruma", "Yoko-wakare", "Soto-makikomi", "Harai-makikomi", "Daki-wakare"],
    ne: ["Makura-gesa-gatame", "Kata-gatame", "Ashi-gatame-jime", "Morote-jime", "Tsukkomi-jime", "Ryo-te-jime", "Ude-hishigi-ashi-gatame", "Ude-hishigi-sankaku-gatame", "Ude-hishigi-hara-gatame"],
    remarque: "Liste conforme à l'annexe 1 « Programme technique judo pour l'UV2 du 1er au 3e dan » (document FFJudo vérifié ligne à ligne)." },
  { cle: "4", nom: "4e dan",
    cond: ["Présentation aux épreuves : 20 ans révolus, dès l'homologation du 3e dan.", "Homologation du grade : à partir de 24 ans révolus, après 2 ans de ceinture noire 3e dan."],
    uv: [["UV1 — Kata", ["Présenter le ju-no-kata dans le rôle de tori."]], ["UV2 — Technique", ["Épreuve 1 : démontrer le go-no-sen (exercice de contre-prise) dans le rôle de tori.", "Épreuve 2 : démontrer son tokui-waza en nage-waza (opportunités, séquences tactiques, liaisons debout-sol), 3 minutes.", "Épreuve 3 : démontrer son tokui-waza en ne-waza, 2 minutes.", "Les temps de pause nécessaires à la récupération sont aménagés. Cette UV n'est pas fractionnable."]], ["UV3 — Efficacité", ["1re option : 100 points en relation grade-championnat ou shiai / test d'efficacité, ou 5 victoires consécutives par ippon ou waza-ari totalisant au moins 44 points en une seule compétition.", "2e option : 20 points (dispense à partir de 40 ans) et acquis techniques démontrés dans des exercices d'uchi-komi, nage-komi, kakari-geiko et yaku-soku-geiko, selon les consignes du coordonnateur. Durée : 10 minutes maximum."]], ["UV4 — Engagement", ["Une journée de stage ou de mise en situation comme commissaire sportif ou arbitre (mêmes équivalences que pour le 1er dan)."]]],
    nage: [], ne: [],
    remarque: "Aucune liste imposée : le candidat choisit son tokui-waza (technique favorite)." },
  { cle: "5", nom: "5e dan",
    cond: ["Présentation aux épreuves : 29 ans révolus, dès l'homologation du 4e dan.", "Délai : 3 ans de ceinture noire 4e dan pour l'homologation.", "Justifier d'un titre ou d'une fonction d'au moins 4 ans dans l'activité judo (commission technique départementale, équipe technique régionale, juge ou évaluateur régional, élu d'un organe dirigeant départemental ou régional, conseiller technique, arbitre ou commissaire sportif régional minimum, ou compétiteur ayant participé à un championnat de France seniors ou équivalent).", "Ou, depuis le dernier grade : être enseignant en exercice et justifier de formations continues fédérales (28 h minimum au niveau national, ou 56 h toutes formations fédérales).", "Dérogation possible auprès de la CSDGE si les critères ne sont pas remplis. Le dossier de candidature, signé par la CODG et la CORG, est envoyé à grade@ffjudo.com."],
    uv: [["UV1 — Kata", ["Présenter le kime-no-kata dans le rôle de tori.", "Par dérogation, le ju-no-kata est demandé aux candidats qui ont obtenu le 4e dan avec le règlement précédent."]], ["UV2 — Judo debout et sol", ["Présenter, en travail debout et au sol, tout ou partie de son système d'attaque et tout ou partie de son système de défense, pendant 15 minutes minimum et 20 minutes maximum (5 minutes minimum pour chaque partie).", "La démonstration suit un plan clair : points-clés des techniques retenues, kumi-kata et postures, opportunités, séquences tactiques.", "Un document écrit détaillant la prestation est envoyé en PDF à grade@ffjudo.com 1 mois avant l'examen, avec 2 exemplaires papier remis au jury le jour J.", "Le jury est composé de 3 évaluateurs minimum, titulaires du 6e dan minimum et certifiés niveau N5. Une UV est validée si le jury est unanime."]]],
    nage: [], ne: [], remarque: "Pas d'UV3 ni d'UV4 pour ce grade dans les textes 2026-2027." },
  { cle: "6", nom: "6e dan",
    cond: ["Présentation aux épreuves : 40 ans révolus, dès l'homologation du 5e dan.", "Délai : 4 ans de ceinture noire 5e dan pour l'homologation.", "Justifier de 25 ans d'ancienneté de ceinture noire et d'au moins 2 titres ou fonctions d'une durée minimum de 4 ans chacun (même liste que pour le 5e dan).", "Dérogation possible auprès de la CSDGE si les critères ne sont pas remplis."],
    uv: [["UV1 — Kata", ["Présenter le koshiki-no-kata (« formes anciennes ») dans le rôle de tori, en entier, avec respect du cérémonial."]], ["UV2 — Prestation technique", ["Choisir 1 ou 2 secteurs parmi nage-waza et ne-waza (liés entre eux de façon cohérente). Durée : 15 minutes minimum, 20 minutes maximum, temps de repos compris.", "La prestation est suivie d'un entretien de 10 minutes maximum pendant lequel le candidat argumente ses choix.", "Un document écrit est envoyé en PDF à grade@ffjudo.com 1 mois avant l'examen, avec 2 exemplaires papier.", "Jury de 3 évaluateurs minimum, titulaires du 7e dan minimum et certifiés niveau N6. Chaque évaluateur retient « excellent », « bien » ou « insuffisant » ; le candidat est reçu avec « excellent » ou « bien » à l'unanimité.", "Deux mentions possibles (si UV1 et UV2 sont passées lors du même examen) : « excellent » (3 appréciations « excellent ») et « très bien » (2 « excellent » et 1 « bien »)."]]],
    nage: [], ne: [], remarque: "" },
  { cle: "7", nom: "7e dan",
    cond: ["Présentation aux épreuves : 53 ans révolus, dès l'homologation du 6e dan.", "Délai : 13 ans de ceinture noire 6e dan pour l'homologation.", "Le candidat doit être une figure emblématique de sa région et répondre aux critères de présentation (niveau sportif national, implication durable dans le judo, expérience d'au moins une olympiade au niveau national en tant qu'arbitre, dirigeant, formateur ou entraîneur national, etc.).", "Dérogation possible auprès de la CSDGE."],
    uv: [["UV1 — Kata", ["Présenter l'itsutsu-no-kata dans le rôle de tori."]], ["UV2 — Prestation technique et entretien", ["Prestation technique libre à caractère pédagogique (à l'attention des ceintures noires), de 15 à 20 minutes, temps de repos compris.", "Entretien avec le jury de 10 à 15 minutes pour expliquer les démonstrations.", "Dossier écrit envoyé en PDF 1 mois avant l'examen. Jury de 3 évaluateurs titulaires du 7e dan minimum, certifiés niveau N7."]]],
    nage: [], ne: [], remarque: "" }
];

// Les dates de la saison 2026-2027 n'ont pas pu être vérifiées : à compléter ici.
// Exemple : { grade: "1er dan et +", date: "2026-12-06", lieu: "Lyon", inscription: "2026-11-06" }
const CALENDRIER_GRADES = [];

function normaliser(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-"); }
function chercher(nom) {
  const n = normaliser(nom);
  return TECHNIQUES.find(function (t) { return normaliser(t.nom) === n && t.prise; }) ||
         TECHNIQUES.find(function (t) { return normaliser(t.nom) === n; });
}
function el(tag, classe, texte) { const e = document.createElement(tag); if (classe) { e.className = classe; } if (texte) { e.textContent = texte; } return e; }

// Tableau : une ligne par famille, chaque technique est colorée selon la ceinture où on la découvre.
function couleurNiveau(t) {
  if (!t) { return null; }
  if (t.niveau.indexOf("dan") === 0) { return "#6b7490"; }
  return NIVEAUX.find(function (n) { return n.cle === t.niveau; }).couleur;
}
function tableauTechniques(titre, noms) {
  const bloc = el("div", "liste-tech");
  bloc.appendChild(el("h3", "", titre));
  const lignes = {};
  noms.forEach(function (nom) {
    const t = chercher(nom);
    const fam = t ? t.famille : "Famille à confirmer";
    (lignes[fam] = lignes[fam] || []).push({ nom: nom, t: t });
  });
  const table = el("table", "tableau-tech");
  Object.keys(lignes).forEach(function (fam) {
    const tr = el("tr");
    const th = el("th", "", fam);
    if (FAMILLES[fam]) { th.appendChild(el("small", "", FAMILLES[fam].sens)); }
    tr.appendChild(th);
    const td = el("td");
    lignes[fam].forEach(function (x) {
      const c = couleurNiveau(x.t);
      const puce = el(x.t && x.t.prise ? "a" : "span", "tech-puce" + (c ? "" : " inconnue"), x.nom);
      if (c) { puce.style.setProperty("--c", c); }
      if (x.t && x.t.prise) { puce.href = "technique.html?id=" + encodeURIComponent(x.t.id); }
      td.appendChild(puce);
    });
    tr.appendChild(td);
    table.appendChild(tr);
  });
  bloc.appendChild(table);
  return bloc;
}
function legendeCeintures() {
  const l = el("div", "legende-ceintures");
  l.appendChild(el("span", "", "Couleur = ceinture où la technique est travaillée :"));
  NIVEAUX.filter(function (n) { return n.cle.indexOf("dan") !== 0; }).concat([{ nom: "1er dan et +", couleur: "#6b7490" }]).forEach(function (n) {
    const p = el("span", "tech-puce", n.nom); p.style.setProperty("--c", n.couleur); l.appendChild(p);
  });
  const p = el("span", "tech-puce inconnue", "Pas encore classée"); l.appendChild(p);
  return l;
}

let courant = "1";
function afficher() {
  const zoneDans = document.getElementById("dans");
  zoneDans.innerHTML = "";
  GRADES.forEach(function (g) {
    const b = el("button", "chip" + (g.cle === courant ? " actif" : ""), g.nom);
    b.type = "button";
    b.style.setProperty("--c", "#222");
    b.addEventListener("click", function () { courant = g.cle; afficher(); });
    zoneDans.appendChild(b);
  });
  const g = GRADES.find(function (x) { return x.cle === courant; });
  const c = document.getElementById("contenu");
  c.innerHTML = "";
  if (g.cond && g.cond.length) {
    const d = el("details", "accordeon"); d.open = true;
    d.appendChild(el("summary", "", "Conditions pour se présenter"));
    const corps = el("div"); const ul = el("ul");
    g.cond.forEach(function (l) { ul.appendChild(el("li", "", l)); });
    corps.appendChild(ul); d.appendChild(corps); c.appendChild(d);
  }
  g.uv.forEach(function (u) {
    const d = el("details", "accordeon"); d.open = true;
    d.appendChild(el("summary", "", u[0]));
    const corps = el("div"); const ul = el("ul");
    u[1].forEach(function (l) { ul.appendChild(el("li", "", l)); });
    corps.appendChild(ul); d.appendChild(corps); c.appendChild(d);
  });
  if (g.nage.length || g.ne.length) {
    const d = el("details", "accordeon"); d.open = true;
    d.appendChild(el("summary", "", "Techniques du programme"));
    const corps = el("div");
    if (g.nage.length) { corps.appendChild(legendeCeintures());
    corps.appendChild(tableauTechniques("Nage-waza (projections)", g.nage)); }
    if (g.ne.length) { corps.appendChild(tableauTechniques("Ne-waza (travail au sol)", g.ne)); }
    corps.appendChild(el("p", "note-source", "Les techniques soulignées ont une fiche détaillée. Les niveaux de couleur viennent d'un livret de club (non officiel) : voir la page Techniques."));
    d.appendChild(corps); c.appendChild(d);
  }
  if (g.remarque) { c.appendChild(el("p", "avertissement", "À noter : " + g.remarque)); }
}

const cal = document.getElementById("calendrier");
if (CALENDRIER_GRADES.length === 0) {
  cal.appendChild(el("p", "avertissement", "Les dates 2026-2027 (UV1, UV2, UV3 en région AURA, UV4 à confirmer) sont dans la page Compétitions, bouton « Passages de grade ». Elles viennent du calendrier AURA du 15/09/2026 et du récapitulatif du comité du Rhône du 22/09/2026 : vérifiez-les avant de vous inscrire."));
  const ul = el("ul");
  [["Calendrier de la ligue AURA", "https://aurajudo.com/calendrier"], ["Organisation des grades (CORG AURA)", "https://www.aurajudo.com/grades/organisation-corg/"], ["Calendrier du comité du Rhône", "https://rhone-judo.ffjudo.com/evenement"]].forEach(function (l) {
    const li = el("li"); const a = el("a", "", l[0]); a.href = l[1]; li.appendChild(a); ul.appendChild(li);
  });
  cal.appendChild(ul);
} else {
  const ul = el("ul");
  CALENDRIER_GRADES.forEach(function (e) { ul.appendChild(el("li", "", e.grade + " — " + e.date + " — " + e.lieu + (e.inscription ? " (inscription avant le " + e.inscription + ")" : ""))); });
  cal.appendChild(ul);
}

const reg = document.getElementById("reglement");
const ulr = el("ul");
["Les épreuves sont regroupées en unités de valeur (UV) : UV1 kata, UV2 technique, UV3 efficacité, UV4 engagement personnel dans le développement de l'activité. Du 1er au 4e dan, les UV sont évaluées séparément et chacune reste acquise d'une session à l'autre ; l'ordre de présentation est libre.", "Candidats et partenaires portent un judogi blanc sans dossard.", "Les âges sont des années révolues ; pour 2026-2027, 40 ans correspond aux nés en 1987.", "Inscription par l'extranet : le président du club et le professeur valident la liste des ayants droit ; la ligue peut imposer des délais. Du 1er au 4e dan, le relais du candidat est la ligue via la CORG ; du 5e au 7e dan, le dossier passe par la CODG puis la CORG.", "Chaque ligue organise au moins 3 sessions par an pour les UV1 et UV2 du 1er au 4e dan (2 évaluateurs minimum certifiés) ; du 5e au 7e dan, l'examen est national (3 évaluateurs certifiés), avec au moins un passage dans la saison.", "UV3 efficacité : les points viennent des shiai / tests d'efficacité, des compétitions officielles et des compétitions appliquant la relation grade-championnat. Ippon = 10 points, waza-ari = 7 points ; les pénalités ne donnent pas de points. Les ceintures marron combattent en poules séparées des ceintures noires.", "Shiai (test d'efficacité) : combats de 2 minutes en poules, 2 minutes de récupération, pas de golden score ni d'avantage décisif (hikiwake possible), 5 combats maximum par test.", "Au 1er dan, le candidat justifie d'au moins 2 licences à la date de la première épreuve. Le grade est authentifié par le diplôme officiel de la CSDGE ; la date officielle est celle inscrite sur le carnet de grades.", "8e dan : dossier étudié par le Comité des Hauts Grades (au moins 13 ans d'ancienneté au 7e dan, contribution écrite d'une cinquantaine de pages) ; 9e et 10e dan : promotion par le Comité des Très Hauts Grades."].forEach(function (l) { ulr.appendChild(el("li", "", l)); });
reg.appendChild(ulr);
document.getElementById("source").textContent = SOURCE_GRADES;
afficher();
