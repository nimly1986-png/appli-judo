// =====================================================================
//  OUVERTURE DE L'APPLI : logo JCO Chandieu qui se reconstitue
//    1. les deux judokas arrivent du fond de l'écran
//    2. le cercle rouge se lève comme un soleil
//    3. les caractères s'écrivent trait par trait, puis le texte apparaît//
//  Tout est dessiné sur un <canvas>. La "scène" fait 1080 x 1080 unités,
//  quelle que soit la taille de l'écran : c'est le même repère que celui
//  des images du dossier "img".
// =====================================================================

// ---------- RÉGLAGES (vous pouvez les modifier) ----------
const VITESSE = 1;              // 1 = lent, 1.2 = normal, 1.5 = rapide
const ENTREE_AUTO = 3;            // secondes d'attente après le logo (0 = jamais)
const PAGE_SUIVANTE = "accueil.html";

// Astuce de mise au point : ouvrir la page avec  ?t=3.2  fige l'animation
// à 3,2 secondes.

// ---------- Repères de la scène ----------
const STAGE = 1080;
const SOLEIL = { x: 600.5, y: 598.5, r: 473.5 };   // position du cercle rouge du logo
const ROUGE = "#f1100a";

// ---------- Moments clés (en secondes, vitesse 1) ----------
const T_JUDOKAS = [0.2, 1.7];     // les judokas arrivent du fond
const T_SOLEIL = [1.9, 3.4];      // le soleil se lève
const T_KANJI = 3.5;              // début de l'écriture des caractères
const T_TEXTE = [6.7, 7.4];       // "JCO CHANDIEU" apparaît
const T_FIN = 7.5;                // le logo est complet

// ---------- Outils mathématiques ----------
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lisse = (u) => { u = clamp(u); return u * u * (3 - 2 * u); };      // départ et arrivée doux
const sortie = (u) => { u = clamp(u); return 1 - (1 - u) * (1 - u); };    // démarre vite, freine

// =====================================================================
//  LES CARACTÈRES : écrits trait par trait
//  Chaque trait est un rectangle du fichier kanji.png, révélé par un
//  balayage dans une direction (comme un coup de pinceau).
//  [x0, y0, x1, y1, direction x, direction y, durée]
// =====================================================================
const TRAITS = [
  // 柔
  [665,   0, 870,  50,  1,  0, 0.20],
  [640,  50, 975, 150,  1,  0, 0.28],
  [640, 100, 775, 205, -0.75, 0.66, 0.20],
  [740,  40, 825, 222,  0,  1, 0.26],
  [622, 205, 985, 268,  1,  0, 0.28],
  [715, 255, 825, 400,  0,  1, 0.20],
  [650, 285, 735, 360, -0.7, 0.7, 0.12],
  [820, 295, 885, 380,  0.7, 0.7, 0.12],
  // 道
  [735, 420, 780, 495,  0,  1, 0.10],
  [730, 440, 950, 532,  1,  0, 0.22],
  [728, 530, 950, 730,  0,  1, 0.30],
  [645, 440, 700, 512,  0,  1, 0.10],
  [605, 530, 735, 745,  0,  1, 0.22],
  [605, 700, 990, 795,  1,  0, 0.28],
];

// =====================================================================
//  LE PROGRAMME PRINCIPAL
// =====================================================================
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const invite = document.getElementById("invite");
const image = {};
let tracesKanji = [];
let tZero = null, fini = false, entree = false;
const gel = new URLSearchParams(location.search).get("t");

function charger(nom, src) {
  return new Promise((ok) => { const i = new Image(); i.onload = () => { image[nom] = i; ok(); }; i.src = src; });
}

function preparerKanji() {
  let debut = T_KANJI;
  tracesKanji = TRAITS.map(([x0, y0, x1, y1, dx, dy, duree]) => {
    const w = x1 - x0, h = y1 - y0;
    const fixe = document.createElement("canvas"); fixe.width = w; fixe.height = h;
    fixe.getContext("2d").drawImage(image.kanji, x0, y0, w, h, 0, 0, w, h);
    const travail = document.createElement("canvas"); travail.width = w; travail.height = h;
    const l = Math.hypot(dx, dy); dx /= l; dy /= l;
    const trace = { x0, y0, w, h, dx, dy, fixe, travail, debut, duree };
    debut += duree + 0.02;
    return trace;
  });
}

function dessinerTrace(tr, t) {
  const p = clamp((t - tr.debut) / tr.duree);
  if (p <= 0) return;
  if (p >= 1) { ctx.drawImage(tr.fixe, tr.x0, tr.y0); return; }
  const c = tr.travail.getContext("2d");
  c.globalCompositeOperation = "source-over";
  c.clearRect(0, 0, tr.w, tr.h);
  c.drawImage(tr.fixe, 0, 0);
  // dégradé qui avance dans la direction du trait
  const cx = tr.w / 2, cy = tr.h / 2;
  const coins = [[0, 0], [tr.w, 0], [0, tr.h], [tr.w, tr.h]].map(([x, y]) => (x - cx) * tr.dx + (y - cy) * tr.dy);
  const demi = Math.max(...coins), mini = -demi;
  const g = c.createLinearGradient(cx + tr.dx * mini, cy + tr.dy * mini, cx + tr.dx * demi, cy + tr.dy * demi);
  const douceur = 0.18;
  g.addColorStop(clamp(p * (1 + douceur) - douceur), "rgba(0,0,0,1)");
  g.addColorStop(clamp(p * (1 + douceur)), "rgba(0,0,0,0)");
  c.globalCompositeOperation = "destination-in";
  c.fillStyle = g; c.fillRect(0, 0, tr.w, tr.h);
  ctx.drawImage(tr.travail, tr.x0, tr.y0);
}

// ----- mise à l'échelle de la scène dans l'écran -----
let echelle = 1, decalX = 0, decalY = 0, dpr = 1, largeur = 0, hauteur = 0;
function ajuster() {
  dpr = window.devicePixelRatio || 1;
  largeur = canvas.clientWidth; hauteur = canvas.clientHeight;
  canvas.width = Math.round(largeur * dpr); canvas.height = Math.round(hauteur * dpr);
  echelle = Math.min(largeur / STAGE, (hauteur * 0.84) / STAGE);
  decalX = (largeur - STAGE * echelle) / 2;
  decalY = (hauteur - STAGE * echelle) / 2 - hauteur * 0.04;
}

function dessiner(t) {
  // fond : ciel du matin (écran entier)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const ciel = ctx.createLinearGradient(0, 0, 0, hauteur);
  ciel.addColorStop(0, "#bfe3ff"); ciel.addColorStop(0.6, "#e6f3ff"); ciel.addColorStop(1, "#fff1d9");
  ctx.fillStyle = ciel; ctx.fillRect(0, 0, largeur, hauteur);

  ctx.setTransform(dpr * echelle, 0, 0, dpr * echelle, dpr * decalX, dpr * decalY);

  // 1. soleil qui se lève, derrière les judokas
  const pS = clamp((t - T_SOLEIL[0]) / (T_SOLEIL[1] - T_SOLEIL[0]));
  if (pS > 0) {
    const bas = (hauteur - decalY) / echelle;                  // bas de l'écran, en unités de scène
    const depart = bas - (SOLEIL.y - SOLEIL.r) + 30;
    const cy = SOLEIL.y + depart * (1 - sortie(pS));
    const halo = ctx.createRadialGradient(SOLEIL.x, cy, SOLEIL.r * 0.8, SOLEIL.x, cy, SOLEIL.r * 1.5);
    halo.addColorStop(0, "rgba(255,120,60,0.45)"); halo.addColorStop(1, "rgba(255,150,80,0)");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(SOLEIL.x, cy, SOLEIL.r * 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = ROUGE; ctx.beginPath(); ctx.arc(SOLEIL.x, cy, SOLEIL.r, 0, Math.PI * 2); ctx.fill();
  }

  // 2. les deux judokas arrivent du fond : petits et transparents, puis grandissent
  const pJ = sortie((t - T_JUDOKAS[0]) / (T_JUDOKAS[1] - T_JUDOKAS[0]));
  if (pJ > 0) {
    const zoom = 0.25 + 0.75 * pJ;
    ctx.save();
    ctx.globalAlpha = clamp(pJ * 1.6);
    ctx.translate(SOLEIL.x, SOLEIL.y);                         // on grandit depuis le centre du logo
    ctx.scale(zoom, zoom);
    ctx.translate(-SOLEIL.x, -SOLEIL.y);
    ctx.drawImage(image.judokas, 0, 0);
    ctx.restore();
  }

  // 3. caractères, puis texte
  for (const tr of tracesKanji) dessinerTrace(tr, t);
  const pT = lisse((t - T_TEXTE[0]) / (T_TEXTE[1] - T_TEXTE[0]));
  if (pT > 0) { ctx.globalAlpha = pT; ctx.drawImage(image.texte, 0, 0); ctx.globalAlpha = 1; }
}

function entrer() {
  if (entree) return;
  entree = true;
  window.location.href = PAGE_SUIVANTE;
}

function boucle(maintenant) {
  if (tZero === null) tZero = maintenant;
  const t = gel !== null ? parseFloat(gel) : ((maintenant - tZero) / 1000) * VITESSE;
  dessiner(t);
  if (!fini && t >= T_FIN) { fini = true; invite.classList.add("visible"); }
  if (gel === null && ENTREE_AUTO > 0 && t >= T_FIN + ENTREE_AUTO * VITESSE) { entrer(); return; }
  requestAnimationFrame(boucle);
}

// Un toucher : on saute à la fin de l'animation, un second toucher entre dans l'appli.
document.getElementById("ouverture").addEventListener("click", () => {
  if (gel !== null) return;
  if (!fini) { tZero = performance.now() - (T_FIN / VITESSE) * 1000; }
  else entrer();
});
window.addEventListener("resize", ajuster);

Promise.all([charger("judokas", "img/judokas.png"), charger("kanji", "img/kanji.png"), charger("texte", "img/texte.png")])
  .then(() => { preparerKanji(); ajuster(); requestAnimationFrame(boucle); });
