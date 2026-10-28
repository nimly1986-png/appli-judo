// =====================================================================
//  ESPACE ADMINISTRATEUR : créer, modifier et supprimer les fiches.
//  Les familles verront le résultat sur la page "Fiche du judoka".
// =====================================================================
let fiches = lireFiches();
let idEnModification = null;      // null = nouvelle fiche ; sinon l'identifiant de la fiche modifiée
let photoCourante = "";           // la photo (réduite) de la fiche en cours de saisie

const champ = (id) => document.getElementById(id);
const menuCeinture = champ("ceinture");

// ----- Remplir le menu des ceintures -----
for (const c of ceintures) {
  const option = document.createElement("option");
  option.value = c.nom;
  option.textContent = c.nom;
  menuCeinture.appendChild(option);
}

// ----- Ce que contient le formulaire en ce moment -----
function ficheDuFormulaire() {
  return {
    id: idEnModification,
    prenom: champ("prenom").value.trim(),
    nom: champ("nom").value.trim(),
    naissance: champ("naissance").value,
    ceinture: menuCeinture.value,
    licence: champ("licence").value.trim(),
    entree: champ("entree").value.trim(),
    poids: champ("poids").value.trim(),
    contacts: champ("contacts").value.trim(),
    photo: photoCourante
  };
}

function majApercu() {
  const zone = champ("apercu");
  zone.innerHTML = "";
  zone.appendChild(creerCarte(ficheDuFormulaire()));
  champ("retirer-photo").hidden = photoCourante === "";
}

function viderFormulaire() {
  for (const id of ["prenom", "nom", "naissance", "licence", "entree", "poids", "contacts", "photo"]) {
    champ(id).value = "";
  }
  menuCeinture.selectedIndex = 0;
  photoCourante = "";
  idEnModification = null;
  champ("titre-formulaire").textContent = "Nouvelle fiche";
  champ("enregistrer").textContent = "Enregistrer la fiche";
  champ("annuler").hidden = true;
  majApercu();
}

// ----- Le tableau des fiches enregistrées -----
function cellule(ligne, texte) {
  const c = ligne.insertCell();
  c.textContent = texte;
  return c;
}

function afficherTableau() {
  const tableau = champ("tableau");
  tableau.innerHTML = "";

  const entete = tableau.insertRow();
  for (const titre of ["Judoka", "Catégorie", "Ceinture", "Licence", "Au club", ""]) {
    const th = document.createElement("th");
    th.textContent = titre;
    entete.appendChild(th);
  }

  fiches.forEach(function (f) {
    const ligne = tableau.insertRow();
    cellule(ligne, f.prenom + " " + f.nom);
    cellule(ligne, calculerCategorie(f.naissance));

    const celluleCeinture = cellule(ligne, "");
    const pastille = creer("span", "pastille");
    colorer(pastille, f.ceinture);
    celluleCeinture.appendChild(pastille);

    cellule(ligne, f.licence || "—");
    cellule(ligne, f.entree ? "depuis " + f.entree : "—");

    const actions = cellule(ligne, "");
    const modifier = creer("button", "", "✏️");
    modifier.title = "Modifier";
    modifier.addEventListener("click", function () { commencerModification(f); });
    const supprimer = creer("button", "", "🗑️");
    supprimer.title = "Supprimer";
    supprimer.addEventListener("click", function () {
      if (confirm("Supprimer la fiche de " + f.prenom + " ?")) {
        fiches = fiches.filter(function (x) { return x.id !== f.id; });
        enregistrerFiches(fiches);
        if (idEnModification === f.id) { viderFormulaire(); }
        afficherTableau();
      }
    });
    actions.appendChild(modifier);
    actions.appendChild(supprimer);
  });
}

function commencerModification(f) {
  idEnModification = f.id;
  champ("prenom").value = f.prenom || "";
  champ("nom").value = f.nom || "";
  champ("naissance").value = f.naissance || "";
  menuCeinture.value = f.ceinture || ceintures[0].nom;
  champ("licence").value = f.licence || "";
  champ("entree").value = f.entree || "";
  champ("poids").value = f.poids || "";
  champ("contacts").value = f.contacts || "";
  champ("photo").value = "";
  photoCourante = f.photo || "";
  champ("titre-formulaire").textContent = "Modifier la fiche de " + f.prenom;
  champ("enregistrer").textContent = "Enregistrer les modifications";
  champ("annuler").hidden = false;
  majApercu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----- Réactions de la page -----
for (const id of ["prenom", "nom", "naissance", "ceinture", "licence", "entree", "poids", "contacts"]) {
  champ(id).addEventListener("input", majApercu);
}

champ("photo").addEventListener("change", function (evenement) {
  const fichier = evenement.target.files[0];
  if (!fichier) { return; }
  redimensionnerPhoto(fichier, 240).then(function (donnees) {
    photoCourante = donnees;
    majApercu();
  }).catch(function () {
    alert("Cette image n'a pas pu être lue.");
  });
});

champ("retirer-photo").addEventListener("click", function () {
  photoCourante = "";
  champ("photo").value = "";
  majApercu();
});

champ("annuler").addEventListener("click", viderFormulaire);

champ("enregistrer").addEventListener("click", function () {
  const f = ficheDuFormulaire();
  if (f.prenom === "" || f.nom === "" || f.naissance === "") {
    alert("Renseignez le prénom, le nom et la date de naissance");
    return;
  }
  if (idEnModification === null) {
    f.id = Date.now();
    fiches.push(f);
  } else {
    fiches = fiches.map(function (x) { return x.id === idEnModification ? f : x; });
  }
  if (enregistrerFiches(fiches)) {
    viderFormulaire();
    afficherTableau();
  }
});

// ----- Démarrage -----
majApercu();
afficherTableau();
