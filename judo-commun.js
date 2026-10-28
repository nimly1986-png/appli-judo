// =====================================================================
//  CODE COMMUN aux pages "Fiche du judoka" et "Espace administrateur".
//  On l'écrit une seule fois ici, et les deux pages l'utilisent.
// =====================================================================

// ----- Données à vérifier et modifier selon la saison / la fédération -----
const categories = [
  { nom: "Baby judo", de: 2021, a: 2022 },
  { nom: "Mini-Poussin", de: 2019, a: 2020 },
  { nom: "Poussin", de: 2017, a: 2018 },
  { nom: "Benjamin", de: 2015, a: 2016 },
  { nom: "Minime", de: 2013, a: 2014 },
  { nom: "Cadet", de: 2010, a: 2012 },
  { nom: "Junior", de: 2007, a: 2009 },
  { nom: "Senior", de: 1900, a: 2006 }
];

const ceintures = [
  { nom: "Blanche", couleurs: ["#ffffff"] },
  { nom: "Blanche-jaune", couleurs: ["#ffffff", "#f1c40f"] },
  { nom: "Jaune", couleurs: ["#f1c40f"] },
  { nom: "Jaune-orange", couleurs: ["#f1c40f", "#e67e22"] },
  { nom: "Orange", couleurs: ["#e67e22"] },
  { nom: "Orange-verte", couleurs: ["#e67e22", "#27ae60"] },
  { nom: "Verte", couleurs: ["#27ae60"] },
  { nom: "Bleue", couleurs: ["#2980b9"] },
  { nom: "Marron", couleurs: ["#7b4a2a"] },
  { nom: "Noire", couleurs: ["#111111"] }
];

// ----- Lire et enregistrer les fiches (dans le navigateur de l'appareil) -----
function lireFiches() {
  try {
    const liste = JSON.parse(localStorage.getItem("fiches")) || [];
    // les anciennes fiches n'avaient pas d'identifiant : on leur en donne un
    let modifie = false;
    liste.forEach(function (f, i) {
      if (!f.id) { f.id = Date.now() + i; modifie = true; }
    });
    if (modifie) { localStorage.setItem("fiches", JSON.stringify(liste)); }
    return liste;
  } catch (erreur) {
    return [];
  }
}

function enregistrerFiches(liste) {
  try {
    localStorage.setItem("fiches", JSON.stringify(liste));
    return true;
  } catch (erreur) {
    alert("Impossible d'enregistrer : le stockage de l'appareil est plein ou bloqué.");
    return false;
  }
}

// ----- Calculs -----
// "2015-04-12" -> [2015, 4, 12]
function decouperDate(dateNaissance) {
  return dateNaissance.split("-").map(Number);
}

function calculerCategorie(dateNaissance) {
  if (!dateNaissance) { return "—"; }
  const annee = decouperDate(dateNaissance)[0];
  for (const c of categories) {
    if (annee >= c.de && annee <= c.a) { return c.nom; }
  }
  return "Hors grille";
}

function calculerAge(dateNaissance) {
  if (!dateNaissance) { return null; }
  const [annee, mois, jour] = decouperDate(dateNaissance);
  const aujourdhui = new Date();
  let age = aujourdhui.getFullYear() - annee;
  const avantAnniversaire =
    aujourdhui.getMonth() + 1 < mois ||
    (aujourdhui.getMonth() + 1 === mois && aujourdhui.getDate() < jour);
  if (avantAnniversaire) { age = age - 1; }
  return age;
}

function trouverCeinture(nom) {
  for (const c of ceintures) {
    if (c.nom === nom) { return c; }
  }
  return ceintures[0];
}

// Colore un élément avec la couleur (ou les deux couleurs) d'une ceinture
function colorer(element, nomCeinture) {
  const ceinture = trouverCeinture(nomCeinture);
  if (ceinture.couleurs.length === 1) {
    element.style.background = ceinture.couleurs[0];
  } else {
    element.style.background =
      "linear-gradient(90deg, " + ceinture.couleurs[0] + " 50%, " + ceinture.couleurs[1] + " 50%)";
  }
}

// ----- Petits outils pour créer des éléments de page -----
function creer(balise, classe, texte) {
  const element = document.createElement(balise);
  if (classe) { element.className = classe; }
  if (texte !== undefined) { element.textContent = texte; }
  return element;
}

// "2019" -> "Au club depuis 2019 (7 ans)"
function texteAnciennete(anneeEntree) {
  const annee = Number(anneeEntree);
  if (!annee) { return ""; }
  const ans = new Date().getFullYear() - annee;
  if (ans < 0) { return ""; }
  const duree = ans === 0 ? "première année" : ans + (ans > 1 ? " ans" : " an");
  return "Au club depuis " + annee + " (" + duree + ")";
}

// ----- La fiche récapitulative d'un judoka -----
function creerCarte(fiche) {
  const carte = creer("article", "carte-judoka");

  const photo = creer("div", "carte-photo");
  if (fiche.photo) {
    const image = creer("img");
    image.src = fiche.photo;
    image.alt = "Photo de " + fiche.prenom;
    photo.appendChild(image);
  } else {
    photo.textContent = "🥋";
  }
  carte.appendChild(photo);

  const nomComplet = ((fiche.prenom || "") + " " + (fiche.nom || "")).trim();
  carte.appendChild(creer("h2", "carte-nom", nomComplet || "—"));

  const puces = creer("div", "puces");
  puces.appendChild(creer("span", "puce", "🏷️ " + calculerCategorie(fiche.naissance)));
  const age = calculerAge(fiche.naissance);
  if (age !== null) { puces.appendChild(creer("span", "puce", "🎂 " + age + " ans")); }
  if (fiche.poids) { puces.appendChild(creer("span", "puce", "⚖️ " + fiche.poids + " kg")); }
  carte.appendChild(puces);

  const ligneCeinture = creer("div", "ceinture-ligne");
  const visuel = creer("span", "ceinture-visuel");
  colorer(visuel, fiche.ceinture);
  ligneCeinture.appendChild(visuel);
  ligneCeinture.appendChild(creer("span", "", "Ceinture " + (fiche.ceinture || "blanche").toLowerCase()));
  carte.appendChild(ligneCeinture);

  // licence et ancienneté dans le club
  const anciennete = texteAnciennete(fiche.entree);
  if (fiche.licence || anciennete) {
    const infos = creer("div", "carte-infos");
    if (fiche.licence) { infos.appendChild(creer("p", "", "🪪 Licence n° " + fiche.licence)); }
    if (anciennete) { infos.appendChild(creer("p", "", "🏠 " + anciennete)); }
    carte.appendChild(infos);
  }

  if (fiche.contacts) {
    const contacts = creer("div", "carte-contacts");
    contacts.appendChild(creer("strong", "", "Responsable légal / contacts"));
    contacts.appendChild(creer("p", "", fiche.contacts));
    carte.appendChild(contacts);
  }

  // bilan sportif de la saison (si des résultats ont été saisis par l'administrateur)
  if (typeof bilanJudoka === "function" && fiche.id) {
    const b = bilanJudoka(fiche);
    if (b.combats > 0) {
      const ligne = creer("p", "carte-bilan", "🏅 Saison : " + b.total.v + " V · " + b.total.d + " D · " + b.total.n + " N");
      carte.appendChild(ligne);
    }
  }

  // prochaine échéance de compétition, en bas à droite de la fiche
  // (seulement si les scripts des compétitions sont chargés sur la page)
  if (typeof prochaineEcheance === "function") {
    const c = prochaineEcheance(fiche);
    if (c) {
      const bloc = creer("div", "carte-prochaine");
      bloc.appendChild(creer("small", "", "Prochaine échéance"));
      bloc.appendChild(creer("strong", "", (c.type === "interclub" ? "🤼 " : "🏆 ") + c.nom));
      const j = enJours(c.debut);
      bloc.appendChild(creer("span", "", dateCourte(c.debut) + (j > 0 ? " · dans " + j + (j > 1 ? " jours" : " jour") : " · en cours")));
      bloc.appendChild(creer("span", "statut " + (estInscrit(fiche, c) ? "ok" : "attente"),
        estInscrit(fiche, c) ? "✅ Inscription validée" : "⏳ Inscription non validée"));
      carte.appendChild(bloc);
    }
  }
  return carte;
}

// ----- Photo : recadrée en carré et réduite (pour ne pas saturer la mémoire) -----
function redimensionnerPhoto(fichier, taille) {
  return new Promise(function (resolu, echec) {
    const lecteur = new FileReader();
    lecteur.onerror = echec;
    lecteur.onload = function () {
      const image = new Image();
      image.onerror = echec;
      image.onload = function () {
        const cote = Math.min(image.width, image.height);
        const toile = document.createElement("canvas");
        toile.width = taille;
        toile.height = taille;
        toile.getContext("2d").drawImage(
          image,
          (image.width - cote) / 2, (image.height - cote) / 2, cote, cote,
          0, 0, taille, taille
        );
        resolu(toile.toDataURL("image/jpeg", 0.8));
      };
      image.src = lecteur.result;
    };
    lecteur.readAsDataURL(fichier);
  });
}
