// =====================================================================
//  PAGE "FICHE DU JUDOKA" : affichage seulement (aucune saisie ici).
//  Les informations sont saisies dans l'espace administrateur.
// =====================================================================
const fiches = lireFiches();
const zoneCarte = document.getElementById("carte");
const zoneChoix = document.getElementById("zone-choix");
const menuChoix = document.getElementById("choix");

function afficher(index) {
  zoneCarte.innerHTML = "";
  zoneCarte.appendChild(creerCarte(fiches[index]));
}

if (fiches.length === 0) {
  document.getElementById("vide").hidden = false;
} else {
  // un menu pour choisir le judoka, seulement s'il y en a plusieurs
  fiches.forEach(function (f, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = f.prenom + " " + f.nom;
    menuChoix.appendChild(option);
  });
  zoneChoix.hidden = fiches.length < 2;
  menuChoix.addEventListener("change", function () {
    afficher(Number(menuChoix.value));
  });
  afficher(0);
}
