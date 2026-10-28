// =====================================================================
//  CARNET DE BONS POINTS (Baby judo et Mini-poussins)
//  Les images reçues du professeur sont validées ici. 3 images = 1 autocollant.
//  Les données restent sur cet appareil (pas encore de base en ligne).
// =====================================================================
const toutes = lireFiches().filter(estPetit);
const menu = document.getElementById("choix");

function fiche() { return toutes[Number(menu.value)]; }

function afficher() {
  const f = fiche();
  const b = bonsPointsJudoka(f);

  // progression : trois cases, remplies par les images en cours
  const prog = document.getElementById("progression");
  prog.innerHTML = "";
  const recentes = b.liste.slice(b.total - b.enCours);
  for (let i = 0; i < IMAGES_PAR_AUTOCOLLANT; i++) {
    const case_ = document.createElement("div");
    case_.className = "case-image" + (recentes[i] ? " pleine" : "");
    if (recentes[i]) {
      const v = trouverValeur(recentes[i].cle);
      case_.style.setProperty("--c", v.couleur);
      case_.appendChild(dessinValeur(v));
      case_.title = v.nom;
    } else {
      case_.textContent = "?";
    }
    prog.appendChild(case_);
  }
  const reste = IMAGES_PAR_AUTOCOLLANT - b.enCours;
  document.getElementById("progression-texte").textContent =
    f.prenom + " : " + b.enCours + " image" + (b.enCours > 1 ? "s" : "") + " sur " + IMAGES_PAR_AUTOCOLLANT +
    (reste === IMAGES_PAR_AUTOCOLLANT ? " — prêt pour une nouvelle série." : " — encore " + reste + " pour le prochain autocollant.");

  // autocollants gagnés
  const zoneA = document.getElementById("autocollants");
  zoneA.innerHTML = "";
  if (b.autocollants.length === 0) {
    const p = document.createElement("p");
    p.className = "message-vide";
    p.textContent = "Pas encore d'autocollant. Le premier arrive après trois images.";
    zoneA.appendChild(p);
  }
  b.autocollants.forEach(function (a) {
    const v = trouverValeur(a.cle);
    const s = document.createElement("div");
    s.className = "autocollant";
    s.style.setProperty("--c", v.couleur);
    s.appendChild(dessinValeur(v));
    const nom = document.createElement("span");
    nom.textContent = v.nom;
    s.appendChild(nom);
    zoneA.appendChild(s);
  });
  document.getElementById("annuler-derniere").hidden = b.total === 0;
}

// les huit images à valider
const zoneImages = document.getElementById("choix-images");
VALEURS.forEach(function (v) {
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "image-valeur";
  bouton.style.setProperty("--c", v.couleur);
  bouton.appendChild(dessinValeur(v));
  const nom = document.createElement("span");
  nom.textContent = v.nom;
  bouton.appendChild(nom);
  bouton.addEventListener("click", function () {
    const f = fiche();
    if (!confirm("Valider l'image « " + v.nom + " » reçue par " + f.prenom + " ?")) { return; }
    const tout = lireBonsPoints();
    tout[f.id] = tout[f.id] || [];
    tout[f.id].push({ cle: v.cle, date: new Date().toISOString().slice(0, 10) });
    enregistrerBonsPoints(tout);
    const apres = bonsPointsJudoka(f);
    afficher();
    if (apres.enCours === 0) { alert("Bravo " + f.prenom + " ! Trois images : un autocollant « " + v.nom + " » à récupérer auprès du professeur."); }
  });
  zoneImages.appendChild(bouton);
});

document.getElementById("annuler-derniere").addEventListener("click", function () {
  const f = fiche();
  if (!confirm("Annuler la dernière image validée pour " + f.prenom + " ?")) { return; }
  const tout = lireBonsPoints();
  if (tout[f.id]) { tout[f.id].pop(); }
  enregistrerBonsPoints(tout);
  afficher();
});

if (toutes.length === 0) {
  document.getElementById("vide").hidden = false;
} else {
  document.getElementById("carnet").hidden = false;
  toutes.forEach(function (f, i) {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = f.prenom + " " + f.nom + " (" + calculerCategorie(f.naissance) + ")";
    menu.appendChild(o);
  });
  document.getElementById("zone-choix").hidden = toutes.length < 2;
  menu.addEventListener("change", afficher);
  afficher();
}
