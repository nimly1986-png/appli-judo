// =====================================================================
//  ESPACE ADMINISTRATEUR : créer, modifier et supprimer les fiches.
//  Les familles verront le résultat sur la page "Fiche du judoka".
// =====================================================================
let fiches = lireFiches();
let idEnModification = null;      // null = nouvelle fiche ; sinon l'identifiant de la fiche modifiée
let photoCourante = "";           // la photo (réduite) de la fiche en cours de saisie
let cheques = [];                 // chèques de la fiche en cours : { numero, date, valide }
let paiements = {};               // autres modes : { virement: { date, valide }, ... }
const NOMS_MODES = { cheques: "Chèques", virement: "Virement", especes: "Espèces", passsport: "Pass'Sport Région" };
const MODES = ["cheques", "virement", "especes", "passsport"];

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
    email: champ("email").value.trim(),
    telephone: champ("telephone").value.trim(),
    certificat: champ("certificat").checked,
    reglement: {
      recu: champ("reglement-recu").checked,
      modes: modesCoches(),
      cheques: modesCoches().includes("cheques") ? cheques.slice(0, nombreCheques()) : [],
      paiements: Object.fromEntries(modesCoches().filter(function (m) { return m !== "cheques" && paiements[m]; }).map(function (m) { return [m, paiements[m]]; })),
      relance: champ("relance").value
    },
    photo: photoCourante
  };
}

// ----- Règlement : modes, chèques, relance -----
function modesCoches() {
  return Array.from(document.querySelectorAll("#modes input:checked")).map(function (c) { return c.value; });
}
function nombreCheques() { return Math.max(0, Math.min(12, Number(champ("nb-cheques").value) || 0)); }
function dessinerCheques() {
  const bloc = champ("bloc-cheques");
  bloc.hidden = !modesCoches().includes("cheques");
  const zone = champ("liste-cheques");
  zone.innerHTML = "";
  const n = nombreCheques();
  while (cheques.length < n) { cheques.push({ numero: "", date: "" }); }
  for (let i = 0; i < n; i++) {
    const ligne = creer("div", "ligne-cheque");
    ligne.appendChild(creer("strong", "", "Chèque " + (i + 1)));
    const numero = document.createElement("input");
    numero.placeholder = "Numéro"; numero.value = cheques[i].numero; numero.autocomplete = "off";
    numero.addEventListener("input", function () { cheques[i].numero = numero.value.trim(); });
    const date = document.createElement("input");
    date.type = "date"; date.value = cheques[i].date; date.title = "Date d'encaissement souhaitée";
    date.addEventListener("input", function () { cheques[i].date = date.value; });
    const l1 = creer("label", "", "N° du chèque"); l1.appendChild(numero);
    const l2 = creer("label", "", "Encaissement souhaité le"); l2.appendChild(date);
    ligne.appendChild(l1); ligne.appendChild(l2);
    ligne.appendChild(boutonValider(cheques[i], "Encaissé", date));
    zone.appendChild(ligne);
  }
}
// Bouton « valider » : un clic note l'opération (avec la date saisie, ou celle du jour si elle est vide)
function boutonValider(objet, mot, champDate) {
  const b = creer("button", "bouton-valider" + (objet.valide ? " valide" : ""), objet.valide ? "✓ " + mot + (objet.date ? " le " + dateFr(objet.date) : "") : "Valider : " + mot.toLowerCase());
  b.type = "button";
  b.addEventListener("click", function () {
    objet.valide = !objet.valide;
    if (objet.valide && !objet.date) { objet.date = aujourdhui(); if (champDate) { champDate.value = objet.date; } }
    if (objet.valide && toutEstValide()) { champ("reglement-recu").checked = true; }
    majApercu();
  });
  return b;
}
function toutEstValide() {
  const modes = modesCoches();
  if (modes.length === 0) { return false; }
  return modes.every(function (m) {
    if (m === "cheques") { return nombreCheques() > 0 && cheques.slice(0, nombreCheques()).every(function (c) { return c.valide; }); }
    return paiements[m] && paiements[m].valide;
  });
}
// Une ligne par mode coché (hors chèques) : date du paiement + validation
function dessinerPaiements() {
  const zone = champ("paiements");
  zone.innerHTML = "";
  modesCoches().filter(function (m) { return m !== "cheques"; }).forEach(function (m) {
    if (!paiements[m]) { paiements[m] = { date: "", valide: false }; }
    const p = paiements[m];
    const ligne = creer("div", "ligne-paiement");
    ligne.appendChild(creer("strong", "", NOMS_MODES[m]));
    const date = document.createElement("input");
    date.type = "date"; date.value = p.date || ""; date.title = "Date du paiement";
    date.addEventListener("input", function () { p.date = date.value; });
    const l = creer("label", "", "Date du paiement"); l.appendChild(date);
    ligne.appendChild(l);
    ligne.appendChild(boutonValider(p, "Reçu", date));
    zone.appendChild(ligne);
  });
}
function dateFr(iso) { return iso ? iso.split("-").reverse().join("/") : ""; }
function aujourdhui() { return new Date().toISOString().slice(0, 10); }
function majReglement() {
  dessinerCheques();
  dessinerPaiements();
  const f = ficheDuFormulaire();
  champ("alerte-reglement").hidden = f.reglement.recu;
  champ("relance").min = aujourdhui();
  const mail = champ("relance-mail"), tel = champ("relance-tel");
  mail.hidden = !f.email; tel.hidden = !f.telephone;
  if (f.email) {
    const sujet = "JCO Chandieu : règlement de l'inscription" + (f.prenom ? " de " + f.prenom : "");
    const corps = "Bonjour,\n\nSauf erreur de notre part, le règlement de l'inscription" + (f.prenom ? " de " + f.prenom : "") +
      " n'a pas encore été reçu. Vous pouvez payer par chèque, virement, espèces ou Pass'Sport Région.\n\nMerci de nous tenir informés.\n\nSportivement,\nLe bureau du JCO Chandieu";
    mail.href = "mailto:" + f.email + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);
  }
  if (f.telephone) { tel.href = "tel:" + f.telephone.replace(/[^\d+]/g, ""); }
}
// Relance : un événement « journée entière » à importer dans l'agenda (fichier .ics)
function ajouterRelanceAgenda() {
  const f = ficheDuFormulaire();
  if (!f.reglement.relance) { alert("Choisissez d'abord la date de relance."); return; }
  const nom = ((f.prenom || "") + " " + (f.nom || "")).trim() || "judoka";
  const evenement = {
    debut: f.reglement.relance, fin: null, nom: "Relance règlement : " + nom, lieu: "",
    infos: [f.telephone ? "Tél. " + f.telephone : "", f.email ? "E-mail " + f.email : ""].filter(Boolean).join(" · "),
    serie: "", type: "relance", aConfirmer: false
  };
  const texte = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JCO Chandieu//Relances//FR", icsEvenement(evenement).replace(/SUMMARY:[^\r\n]*/, "SUMMARY:" + icsTexte(evenement.nom)).replace(/\r\nBEGIN:VALARM[\s\S]*?END:VALARM/, ""), "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([texte], { type: "text/calendar;charset=utf-8" }));
  a.download = "relance-" + f.reglement.relance + ".ics";
  document.body.appendChild(a); a.click(); a.remove();
}

function majApercu() {
  const zone = champ("apercu");
  zone.innerHTML = "";
  zone.appendChild(creerCarte(ficheDuFormulaire()));
  champ("retirer-photo").hidden = photoCourante === "";
  majReglement();
}

function viderFormulaire() {
  for (const id of ["prenom", "nom", "naissance", "licence", "entree", "poids", "contacts", "photo"]) {
    champ(id).value = "";
  }
  for (const id of ["email", "telephone", "relance", "nb-cheques"]) { champ(id).value = ""; }
  champ("certificat").checked = false;
  champ("reglement-recu").checked = false;
  document.querySelectorAll("#modes input").forEach(function (c) { c.checked = false; });
  cheques = [];
  paiements = {};
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
  for (const titre of ["Judoka", "Catégorie", "Ceinture", "Licence", "Au club", "Dossier", ""]) {
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
    const dossier = cellule(ligne, "");
    dossier.appendChild(creer("span", "badge " + (f.certificat ? "ok" : "alerte"), "Certificat " + (f.certificat ? "✓" : "✗")));
    dossier.appendChild(creer("span", "badge " + (f.reglement && f.reglement.recu ? "ok" : "alerte"), "Règlement " + (f.reglement && f.reglement.recu ? "✓" : "✗")));

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
        afficherAlertes();
      }
    });
    actions.appendChild(modifier);
    actions.appendChild(supprimer);
  });
}

// Dossiers à suivre : règlement non reçu, avec la relance prévue
function afficherAlertes() {
  const zone = champ("alertes");
  zone.innerHTML = "";
  const aSuivre = fiches.filter(function (f) { return !(f.reglement && f.reglement.recu); });
  if (aSuivre.length === 0) { return; }
  const boite = creer("div", "alerte-reglement");
  boite.appendChild(creer("strong", "", "⚠ Règlements non reçus (" + aSuivre.length + ")"));
  aSuivre.forEach(function (f) {
    const relance = f.reglement && f.reglement.relance;
    const urgent = relance && relance <= aujourdhui();
    const b = creer("button", "ligne-alerte" + (urgent ? " urgent" : ""), f.prenom + " " + f.nom + " : " +
      (relance ? (urgent ? "relance à faire (prévue le " : "relance prévue le ") + dateFr(relance) + (urgent ? ")" : "") : "aucune relance prévue"));
    b.type = "button";
    b.addEventListener("click", function () { commencerModification(f); });
    boite.appendChild(b);
  });
  zone.appendChild(boite);
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
  champ("email").value = f.email || "";
  champ("telephone").value = f.telephone || "";
  champ("certificat").checked = !!f.certificat;
  const r = f.reglement || {};
  champ("reglement-recu").checked = !!r.recu;
  document.querySelectorAll("#modes input").forEach(function (c) { c.checked = (r.modes || []).includes(c.value); });
  cheques = (r.cheques || []).map(function (x) { return { numero: x.numero || "", date: x.date || "", valide: !!x.valide }; });
  paiements = JSON.parse(JSON.stringify(r.paiements || {}));
  champ("nb-cheques").value = cheques.length || "";
  champ("relance").value = r.relance || "";
  champ("photo").value = "";
  photoCourante = f.photo || "";
  champ("titre-formulaire").textContent = "Modifier la fiche de " + f.prenom;
  champ("enregistrer").textContent = "Enregistrer les modifications";
  champ("annuler").hidden = false;
  majApercu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----- Réactions de la page -----
for (const id of ["prenom", "nom", "naissance", "ceinture", "licence", "entree", "poids", "contacts", "email", "telephone", "certificat", "reglement-recu", "relance"]) {
  champ(id).addEventListener("input", majApercu);
}
document.querySelectorAll("#modes input").forEach(function (c) { c.addEventListener("change", function () { if (c.value === "cheques" && c.checked && !nombreCheques()) { champ("nb-cheques").value = 1; } majReglement(); }); });
champ("nb-cheques").addEventListener("input", majReglement);
champ("relance-agenda").addEventListener("click", ajouterRelanceAgenda);

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
    afficherAlertes();
  }
});

// ----- Démarrage -----
majApercu();
afficherTableau();
afficherAlertes();
