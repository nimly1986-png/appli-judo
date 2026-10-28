// =====================================================================
//  LE CODE MORAL DU JUDO : les huit valeurs, avec leur illustration (dessinée en SVG).
//  Utilisé par la page "Code moral" et par le carnet de bons points.
//  À vérifier avec le texte officiel de la fédération avant diffusion.
// =====================================================================
const VALEURS = [
  { cle: "politesse", nom: "Politesse", kanji: "礼", romaji: "Reigi", couleur: "#4d9bff",
    sens: "Respecter les autres : saluer, dire bonjour et merci.",
    dessin: '<path d="M8 110h104" /><path d="M34 110V88l14-16"/><circle cx="54" cy="64" r="7"/><path d="M86 110V88L72 72"/><circle cx="66" cy="64" r="7"/><path d="M52 40c4-8 12-8 16 0" opacity=".6"/>' },
  { cle: "courage", nom: "Courage", kanji: "勇", romaji: "Yūki", couleur: "#ff5a5f",
    sens: "Faire ce qui est juste, même quand c'est difficile.",
    dessin: '<path d="M60 12l36 12v34c0 26-18 42-36 50-18-8-36-24-36-50V24z"/><path d="M60 40c10 12 14 20 10 30-3 8-17 8-20-2-2-8 6-12 4-22 4 2 6-2 6-6z"/>' },
  { cle: "sincerite", nom: "Sincérité", kanji: "誠", romaji: "Makoto", couleur: "#a78bfa",
    sens: "Dire ce que l'on pense, sans tricher.",
    dessin: '<path d="M60 58S42 48 42 36c0-8 6-12 12-10 4 1 6 5 6 5s2-4 6-5c6-2 12 2 12 10 0 12-18 22-18 22z"/><path d="M20 78q40 40 80 0"/><path d="M30 76q30 28 60 0" opacity=".6"/><path d="M60 10v6M34 18l4 4M86 18l-4 4" opacity=".7"/>' },
  { cle: "honneur", nom: "Honneur", kanji: "誉", romaji: "Meiyo", couleur: "#ffd23f",
    sens: "Tenir parole et rester fidèle à ses engagements.",
    dessin: '<path d="M42 10l18 34M78 10L60 44M50 10l10 20M70 10L60 30" /><circle cx="60" cy="74" r="28"/><circle cx="60" cy="74" r="19" opacity=".6"/><path d="M60 62l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"/>' },
  { cle: "modestie", nom: "Modestie", kanji: "謙", romaji: "Kenjō", couleur: "#3ddc84",
    sens: "Parler de soi sans orgueil et savoir apprendre des autres.",
    dessin: '<path d="M34 112C32 76 40 44 86 28"/><path d="M33 96h9M35 78h9M41 60h9M54 44h9" /><path d="M86 28c8-4 16-2 20 4-8 4-16 4-20-4zM76 34c2-8 8-14 16-14-1 8-7 14-16 14zM68 40c-6-6-16-6-22-2 6 6 16 6 22 2z"/>' },
  { cle: "respect", nom: "Respect", kanji: "敬", romaji: "Sonkei", couleur: "#ff9a3d",
    sens: "Sans respect, aucune confiance ne peut naître.",
    dessin: '<path d="M10 54h40v18H10zM70 54h40v18H70z"/><rect x="46" y="48" width="28" height="30" rx="6"/><path d="M52 78l-10 32h14l4-22M68 78l10 32H64l-4-22"/>' },
  { cle: "controle", nom: "Contrôle de soi", kanji: "制", romaji: "Jisei", couleur: "#35d0ba",
    sens: "Savoir se calmer et se taire quand la colère monte.",
    dessin: '<path d="M88 30A38 38 0 1 0 98 64" stroke-width="6"/><circle cx="60" cy="60" r="3"/><path d="M40 60q10-10 20 0t20 0" opacity=".6"/>' },
  { cle: "amitie", nom: "Amitié", kanji: "友", romaji: "Yūjō", couleur: "#ff7ab8",
    sens: "Le sentiment le plus fort : s'entraider, progresser ensemble.",
    dessin: '<circle cx="46" cy="62" r="26"/><circle cx="74" cy="62" r="26"/><path d="M60 14c-4-6-14-4-14 4 0 6 8 10 14 14 6-4 14-8 14-14 0-8-10-10-14-4z" opacity=".8"/>' }
];

function dessinValeur(v, taille) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 120 120");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("class", "dessin-valeur");
  if (taille) { svg.style.width = taille + "px"; svg.style.height = taille + "px"; }
  svg.style.stroke = v.couleur;
  svg.innerHTML = v.dessin;
  return svg;
}
function trouverValeur(cle) { return VALEURS.find(function (v) { return v.cle === cle; }); }

// ----- Bons points des Baby judo et Mini-poussins -----
// Chaque image reçue du professeur est validée dans l'appli. 3 images = 1 autocollant,
// qui porte la valeur de la 3e image.
const IMAGES_PAR_AUTOCOLLANT = 3;
const CATEGORIES_BONS_POINTS = ["Baby judo", "Mini-Poussin"];
function lireBonsPoints() {
  try { return JSON.parse(localStorage.getItem("bonspoints")) || {}; } catch (e) { return {}; }
}
function enregistrerBonsPoints(objet) { localStorage.setItem("bonspoints", JSON.stringify(objet)); }
function bonsPointsJudoka(fiche) {
  const liste = (fiche && fiche.id && lireBonsPoints()[fiche.id]) || [];
  const autocollants = [];
  for (let i = IMAGES_PAR_AUTOCOLLANT - 1; i < liste.length; i += IMAGES_PAR_AUTOCOLLANT) { autocollants.push(liste[i]); }
  return { liste: liste, total: liste.length, autocollants: autocollants, enCours: liste.length % IMAGES_PAR_AUTOCOLLANT };
}
function estPetit(fiche) { return CATEGORIES_BONS_POINTS.includes(calculerCategorie(fiche.naissance)); }
