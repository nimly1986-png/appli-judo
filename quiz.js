// Quiz : mélange des techniques (jusqu'à la ceinture choisie) et du lexique.
const NB_QUESTIONS = 10;
const ORDRE = NIVEAUX.map(function (n) { return n.cle; });
const SUIVANTE = { "Blanche": "jaune", "Blanche-jaune": "jaune", "Jaune": "orange", "Jaune-orange": "orange",
  "Orange": "verte", "Orange-verte": "verte", "Verte": "bleue", "Bleue": "marron", "Marron": "dan1", "Noire": "dan1" };
const COULEUR = { jaune: "var(--jaune)", orange: "var(--orange)", verte: "var(--vert)", bleue: "var(--bleu)", marron: "var(--marron)", dan1: "var(--noire)", dan2: "var(--noire)", dan3: "var(--noire)" };
let niveau = "jaune";
let questions = [], rang = 0, score = 0;
const zoneNiveaux = document.getElementById("niveaux");
const zone = document.getElementById("zone-quiz");
const selMode = document.getElementById("mode");

function melanger(t) { const a = t.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function nomNiveau(cle) { return NIVEAUX.find(function (n) { return n.cle === cle; }).nom; }

function poolTech() { const idx = ORDRE.indexOf(niveau); return TECHNIQUES.filter(function (t) { return ORDRE.indexOf(t.niveau) <= idx; }); }
function poolLex() { const l = []; LEXIQUE.forEach(function (k) { k.mots.forEach(function (m) { l.push({ jp: m[0], fr: m[1] }); }); }); return l; }

// 3 mauvaises réponses différentes de la bonne (comparaison en minuscules)
function distracteurs(bonne, source, extra) {
  const vus = [bonne.toLowerCase()];
  const res = [];
  melanger(source).forEach(function (v) {
    if (res.length < 3 && vus.indexOf(v.toLowerCase()) < 0) { vus.push(v.toLowerCase()); res.push(v); }
  });
  return res;
}
function question(texte, bonne, mauvaises, expl, lien) {
  return { texte: texte, choix: melanger([bonne].concat(mauvaises)), bonne: bonne, expl: expl, lien: lien || null };
}

function fabriquer() {
  const mode = selMode.value;
  const T = poolTech(), L = poolLex(), Q = [];
  const genT = [
    function (t) { return question("Que signifie « " + t.nom + " » ?", t.trad, distracteurs(t.trad, T.map(function (x) { return x.trad; })), t.nom + " : " + t.trad + " (" + t.famille + ").", "technique.html?id=" + encodeURIComponent(t.id)); },
    function (t) { return question("Quelle technique correspond à « " + t.trad + " » ?", t.nom, distracteurs(t.nom, T.map(function (x) { return x.nom; })), t.nom + " : " + t.trad + ".", "technique.html?id=" + encodeURIComponent(t.id)); },
    function (t) { return question("À quelle famille appartient " + t.nom + " ?", t.famille, distracteurs(t.famille, Object.keys(FAMILLES)), t.nom + " fait partie des " + t.famille + " (" + FAMILLES[t.famille].sens + ").", "technique.html?id=" + encodeURIComponent(t.id)); }
  ];
  const genL = [
    function (m) { return question("Que signifie « " + m.jp + " » ?", m.fr, distracteurs(m.fr, L.map(function (x) { return x.fr; })), m.jp + " : " + m.fr + "."); },
    function (m) { return question("Comment dit-on « " + m.fr + " » en japonais ?", m.jp, distracteurs(m.jp, L.map(function (x) { return x.jp; })), m.fr + " se dit « " + m.jp + " »."); }
  ];
  const nT = mode === "tech" ? NB_QUESTIONS : mode === "lex" ? 0 : Math.ceil(NB_QUESTIONS / 2);
  const nL = NB_QUESTIONS - nT;
  // techniques : on privilégie celles du niveau choisi (poids double)
  const lourdes = []; T.forEach(function (t) { lourdes.push(t); if (t.niveau === niveau) { lourdes.push(t); } });
  const tires = [];
  melanger(lourdes).forEach(function (t) { if (tires.length < nT && tires.indexOf(t) < 0) { tires.push(t); } });
  tires.forEach(function (t) { Q.push(genT[Math.floor(Math.random() * genT.length)](t)); });
  melanger(L).slice(0, nL).forEach(function (m) { Q.push(genL[Math.floor(Math.random() * genL.length)](m)); });
  return melanger(Q);
}

function dessinerNiveaux() {
  zoneNiveaux.innerHTML = "";
  NIVEAUX.forEach(function (n) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (n.cle === niveau ? " actif" : "");
    b.style.setProperty("--c", COULEUR[n.cle]);
    b.textContent = n.nom;
    b.addEventListener("click", function () { niveau = n.cle; demarrer(); });
    zoneNiveaux.appendChild(b);
  });
}
function demarrer() {
  dessinerNiveaux();
  document.body.style.setProperty("--accent", COULEUR[niveau]);
  const nb = poolTech().length;
  document.getElementById("info-niveau").textContent = "Programme « " + nomNiveau(niveau) + " » : " + nb + " techniques en réserve (ceintures précédentes comprises).";
  questions = fabriquer(); rang = 0; score = 0;
  afficher();
}
function afficher() {
  zone.innerHTML = "";
  if (rang >= questions.length) {
    const p = document.createElement("p"); p.className = "quiz-score";
    p.textContent = "Score : " + score + " / " + questions.length;
    const m = document.createElement("p");
    m.textContent = score === questions.length ? "Parfait ! 🥋" : score >= questions.length * 0.7 ? "Très bien, continue !" : "À retravailler : relis les fiches techniques et le lexique.";
    const b = document.createElement("button"); b.type = "button"; b.className = "bouton"; b.textContent = "Rejouer";
    b.addEventListener("click", demarrer);
    zone.appendChild(p); zone.appendChild(m); zone.appendChild(b);
    return;
  }
  const q = questions[rang];
  const n = document.createElement("p"); n.className = "resume"; n.textContent = "Question " + (rang + 1) + " / " + questions.length;
  const h = document.createElement("h2"); h.textContent = q.texte;
  zone.appendChild(n); zone.appendChild(h);
  const retour = document.createElement("div"); retour.className = "quiz-retour"; retour.setAttribute("aria-live", "polite");
  q.choix.forEach(function (c) {
    const b = document.createElement("button"); b.type = "button"; b.className = "quiz-choix"; b.textContent = c;
    b.addEventListener("click", function () {
      zone.querySelectorAll(".quiz-choix").forEach(function (x) {
        x.disabled = true;
        if (x.textContent === q.bonne) { x.classList.add("juste"); } else if (x === b) { x.classList.add("faux"); }
      });
      const ok = c === q.bonne; if (ok) { score++; }
      retour.textContent = (ok ? "✅ Bonne réponse. " : "❌ Raté. ") + q.expl;
      if (q.lien) { const a = document.createElement("a"); a.href = q.lien; a.textContent = " Voir la fiche"; retour.appendChild(a); }
      const s = document.createElement("button"); s.type = "button"; s.className = "bouton"; s.textContent = rang + 1 < questions.length ? "Question suivante" : "Voir mon score";
      s.addEventListener("click", function () { rang++; afficher(); });
      retour.appendChild(s);
    });
    zone.appendChild(b);
  });
  zone.appendChild(retour);
}

const fiches = lireFiches();
if (fiches.length > 0) {
  const sauve = Number(localStorage.getItem("judokaChoisi"));
  const f = fiches.find(function (x) { return x.id === sauve; }) || fiches[0];
  niveau = SUIVANTE[f.ceinture] || "jaune";
}
selMode.addEventListener("change", demarrer);
demarrer();
