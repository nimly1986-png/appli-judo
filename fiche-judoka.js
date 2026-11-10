// =====================================================================
//  PAGE "FICHE DU JUDOKA" : affichage seulement (aucune saisie ici).
//  Les informations sont saisies dans l'espace administrateur.
// =====================================================================
const fiches = lireFiches();
const zoneCarte = document.getElementById("carte");
const zoneChoix = document.getElementById("zone-choix");
const menuChoix = document.getElementById("choix");

// ---------- Mot de bienvenue ----------
// Plus tard, avec identifiant et mot de passe : la connexion enregistrera { famille: "Dupont" } sous la clé "session".
// En attendant, le nom de famille vient des fiches enregistrées sur cet appareil.
const MOTS_BIENVENUE = [
  "Ici, on tombe en riant et on se relève en équipe.",
  "Le tatami est prêt : les chaussures restent dehors, la bonne humeur entre.",
  "Ippon pour l'accueil ! Les câlins sont autorisés, les étranglements non.",
  "Chez nous, la ceinture se noue et la bonne humeur se partage.",
  "Attention : le kimono ne sent plus la lavande après l'entraînement. Merci pour votre courage !",
  "Waza-ari pour la famille ! Il ne manque plus qu'un ippon de sourire.",
  "Rappel : on salue avant de monter sur le tatami, et on dit merci au goûter.",
  "Aujourd'hui, le seul combat à gagner, c'est celui contre le canapé."
];
function majuscules(texte) { return texte.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, function (m, a, b) { return a + b.toUpperCase(); }); }
function nomsDeFamille() {
  try {
    const s = JSON.parse(localStorage.getItem("session"));
    if (s && s.famille) { return [majuscules(String(s.famille))]; }
  } catch (e) {}
  const noms = [];
  fiches.forEach(function (f) { const n = majuscules((f.nom || "").trim()); if (n && !noms.includes(n)) { noms.push(n); } });
  return noms;
}
function afficherBienvenue() {
  let noms = nomsDeFamille();
  if (noms.length > 3) { noms = []; }                 // appareil du club (toutes les fiches) : pas de liste de familles
  const zone = document.getElementById("bienvenue");
  document.getElementById("bienvenue-titre").textContent = "Bienvenue au JCO Chandieu !";
  const famille = noms.length ? "Famille " + noms.join(" – ") : "";
  let prenoms = fiches.map(function (f) { return f.prenom; }).filter(Boolean);
  if (prenoms.length > 6) { prenoms = []; }
  document.getElementById("bienvenue-judokas").textContent = [famille, prenoms.length ? "Judokas de la maison : " + prenoms.join(", ") : ""].filter(Boolean).join(" · ");
  document.getElementById("bienvenue-mot").textContent = MOTS_BIENVENUE[Math.floor(Math.random() * MOTS_BIENVENUE.length)];
  zone.hidden = false;
}
afficherBienvenue();

function afficher(index) {
  zoneCarte.innerHTML = "";
  zoneCarte.appendChild(creerCarte(fiches[index]));
}

fiches.sort(function (x, y) { return (y.validee ? 1 : 0) - (x.validee ? 1 : 0); });   // fiches complètes en haut

if (fiches.length === 0) {
  document.getElementById("vide").hidden = false;
} else {
  // un menu pour choisir le judoka, seulement s'il y en a plusieurs
  fiches.forEach(function (f, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = (f.validee ? "✅ " : "") + f.prenom + " " + f.nom;
    menuChoix.appendChild(option);
  });
  zoneChoix.hidden = fiches.length < 2;
  menuChoix.addEventListener("change", function () {
    afficher(Number(menuChoix.value));
  });
  afficher(0);
}
