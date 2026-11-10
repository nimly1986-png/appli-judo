// =====================================================================
//  ESPACE ADMINISTRATEUR : créer, modifier et supprimer les fiches.
//  Les familles verront le résultat sur la page "Fiche du judoka".
// =====================================================================
let fiches = lireFiches();
let idEnModification = null;      // null = nouvelle fiche ; sinon l'identifiant de la fiche modifiée
let photoCourante = "";           // la photo (réduite) de la fiche en cours de saisie
let cheques = [];                 // chèques de la fiche en cours : { numero, date, valide }
let paiements = {};
let uvCourantes = {};             // UV validées de la fiche en cours : { UV1: true, ... }
let valideeCourante = false;      // fiche validée (apparaît dans « complètes »)               // autres modes : { virement: { date, valide }, ... }
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
    photo: photoCourante,
    dan: menuCeinture.value === "Noire" ? Number(champ("dan").value) || 1 : undefined,
    danDate: menuCeinture.value === "Noire" ? champ("dan-date").value : "",
    uv: Object.assign({}, uvCourantes),
    pointsUV3: champ("points-uv3").value.trim(),
    validee: valideeCourante
  };
}

// ----- Grade (ceinture marron ou noire) : dan, UV validées, points -----
function majBlocGrade() {
  const bloc = champ("bloc-grade");
  const f = { ceinture: menuCeinture.value, dan: champ("dan").value };
  const vise = gradeVise(f);
  bloc.hidden = !(f.ceinture === "Noire" || vise);
  champ("label-dan").hidden = f.ceinture !== "Noire";
  champ("label-dan-date").hidden = f.ceinture !== "Noire";
  const zone = champ("uv-liste");
  zone.innerHTML = "";
  champ("titre-uv").textContent = vise ? "UV validées pour le " + NOMS_DAN[vise] : "";
  champ("label-points").hidden = !vise || vise > 4;
  if (!vise) { return; }
  uvDuGrade(vise).forEach(function (u) {
    const etiquette = creer("label", "case");
    const c = document.createElement("input");
    c.type = "checkbox"; c.checked = !!uvCourantes[u];
    c.addEventListener("change", function () { uvCourantes[u] = c.checked; majApercu(); });
    etiquette.appendChild(c);
    etiquette.appendChild(document.createTextNode(" " + u + " " + UV_LIBELLES[u]));
    zone.appendChild(etiquette);
  });
}

// ----- Validation de la fiche -----
function majValidation() {
  const manque = manquePourValider(ficheDuFormulaire());
  const bouton = champ("valider-fiche");
  if (manque.length) { valideeCourante = false; }
  champ("validation-manque").textContent = manque.length ? "Pour valider, il manque : " + manque.join(", ") + "." : (valideeCourante ? "✅ Fiche validée : elle sera classée dans « Fiches judoka complètes »." : "Le dossier est complet : vous pouvez valider la fiche.");
  bouton.disabled = manque.length > 0;
  bouton.textContent = valideeCourante ? "✓ Fiche validée (cliquer pour annuler)" : "Valider la fiche";
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
  if (manquePourValider(ficheDuFormulaire()).length) { valideeCourante = false; }
  zone.appendChild(creerCarte(ficheDuFormulaire()));
  champ("retirer-photo").hidden = photoCourante === "";
  majReglement();
  majBlocGrade();
  majValidation();
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
  champ("dan").value = "1"; champ("dan-date").value = ""; champ("points-uv3").value = "";
  uvCourantes = {}; valideeCourante = false;
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

// ----- Suivi des dossiers : tableau de bord de validation -----
let filtreSuivi = "tous";       // tous | pretes | reglement | certificat | licence | contact | completes
let rechercheSuivi = "";
let panneauOuvert = null;       // { id, quoi } : saisie rapide de la licence ou du contact
const FILTRES_SUIVI = [
  ["tous", "Toutes"], ["pretes", "Prêtes à valider"], ["reglement", "Règlement"], ["certificat", "Certificat"],
  ["licence", "Licence"], ["contact", "Contact"], ["completes", "Complètes"]
];
function etapesDossier(f) {
  return [
    { cle: "certificat", icone: "📄", nom: "Certificat", ok: !!f.certificat },
    { cle: "reglement", icone: "💶", nom: "Règlement", ok: reglementRecu(f) },
    { cle: "licence", icone: "🪪", nom: "Licence", ok: !!f.licence },
    { cle: "contact", icone: "📞", nom: "Contact", ok: !!(f.email || f.telephone) }
  ];
}
function afficherTableau() {
  const zone = champ("suivi");
  zone.innerHTML = "";
  const sauver = function () { if (enregistrerFiches(fiches)) { afficherTableau(); majApercu(); } };
  const parNom = function (x, y) { return (x.nom + x.prenom).localeCompare(y.nom + y.prenom, "fr"); };
  const nbOk = function (f) { return etapesDossier(f).filter(function (e) { return e.ok; }).length; };
  const completes = fiches.filter(function (f) { return f.validee; }).sort(parNom);
  const reste = fiches.filter(function (f) { return !f.validee; });
  const pretes = reste.filter(function (f) { return nbOk(f) === 4; });

  // --- bandeau de synthèse ---
  const synthese = creer("div", "sv-synthese");
  [["✅", completes.length, "complètes"], ["🟢", pretes.length, "prêtes à valider"], ["⏳", reste.length - pretes.length, "à compléter"]].forEach(function (s) {
    const p = creer("div", "sv-stat"); p.appendChild(creer("strong", "", s[1])); p.appendChild(creer("span", "", s[0] + " " + s[2])); synthese.appendChild(p);
  });
  zone.appendChild(synthese);
  if (pretes.length) {
    const tout = creer("button", "bouton", "✅ Valider les " + pretes.length + " dossier" + (pretes.length > 1 ? "s" : "") + " prêt" + (pretes.length > 1 ? "s" : ""));
    tout.type = "button";
    tout.addEventListener("click", function () {
      if (confirm("Valider " + pretes.length + " fiche(s) dont le dossier est complet ?")) { pretes.forEach(function (f) { f.validee = true; }); sauver(); }
    });
    zone.appendChild(tout);
  }

  // --- recherche et filtres ---
  const recherche = document.createElement("input");
  recherche.type = "search"; recherche.placeholder = "Chercher un judoka"; recherche.value = rechercheSuivi; recherche.className = "sv-recherche";
  recherche.addEventListener("input", function () { rechercheSuivi = recherche.value; dessinerListe(); });
  zone.appendChild(recherche);
  const filtres = creer("div", "sv-filtres");
  FILTRES_SUIVI.forEach(function (fl) {
    const b = creer("button", "sv-filtre" + (filtreSuivi === fl[0] ? " actif" : ""), fl[1]);
    b.type = "button";
    b.addEventListener("click", function () { filtreSuivi = fl[0]; afficherTableau(); });
    filtres.appendChild(b);
  });
  zone.appendChild(filtres);
  const liste = creer("div", "sv-liste");
  zone.appendChild(liste);

  function garde(f) {
    const q = sansAccentsMin(rechercheSuivi);
    if (q && sansAccentsMin(f.prenom + " " + f.nom).indexOf(q) === -1) { return false; }
    const e = etapesDossier(f), manque = function (c) { return !e.find(function (x) { return x.cle === c; }).ok; };
    if (filtreSuivi === "completes") { return !!f.validee; }
    if (filtreSuivi === "pretes") { return !f.validee && nbOk(f) === 4; }
    if (["reglement", "certificat", "licence", "contact"].includes(filtreSuivi)) { return !f.validee && manque(filtreSuivi); }
    return true;
  }
  const bouton = function (parent, classe, texte, action) {
    const b = creer("button", classe, texte); b.type = "button"; b.addEventListener("click", action); parent.appendChild(b); return b;
  };
  function carte(f) {
    const etapes = etapesDossier(f), n = etapes.filter(function (e) { return e.ok; }).length;
    const c = creer("article", "sv-carte" + (f.validee ? " complete" : n === 4 ? " prete" : ""));
    const tete = creer("div", "sv-tete");
    const pastille = creer("span", "pastille"); colorer(pastille, f.ceinture); tete.appendChild(pastille);
    const qui = creer("div", "sv-qui");
    qui.appendChild(creer("strong", "", f.prenom + " " + f.nom));
    qui.appendChild(creer("span", "petit", calculerCategorie(f.naissance) + (f.ceintureAVerifier ? " · ⚠ ceinture à renseigner" : "")));
    tete.appendChild(qui);
    if (f.validee) { tete.appendChild(creer("span", "badge ok", "✅ Complète")); }
    else { const anneau = creer("span", "sv-anneau", n + "/4"); anneau.style.setProperty("--p", (n * 25) + "%"); tete.appendChild(anneau); }
    const outils = creer("div", "sv-outils");
    bouton(outils, "", "✏️", function () { commencerModification(f); }).title = "Ouvrir la fiche complète";
    bouton(outils, "", "🗑️", function () {
      if (confirm("Supprimer la fiche de " + f.prenom + " ?")) { fiches = fiches.filter(function (x) { return x.id !== f.id; }); enregistrerFiches(fiches); if (idEnModification === f.id) { viderFormulaire(); } afficherTableau(); }
    }).title = "Supprimer";
    tete.appendChild(outils);
    c.appendChild(tete);

    if (f.validee) {
      c.appendChild(creer("p", "petit", "Licence " + f.licence));
      bouton(c, "bouton-mini", "Annuler la validation", function () { f.validee = false; sauver(); });
      return c;
    }
    // quatre pastilles à toucher
    const grille = creer("div", "sv-etapes");
    etapes.forEach(function (e) {
      const b = bouton(grille, "sv-etape" + (e.ok ? " ok" : ""), "", function () {
        if (e.cle === "certificat") { f.certificat = !f.certificat; sauver(); }
        else if (e.cle === "reglement") { f.reglement = f.reglement || { recu: false, modes: [], cheques: [], paiements: {}, relance: "" }; f.reglement.recu = !f.reglement.recu; sauver(); }
        else { panneauOuvert = (panneauOuvert && panneauOuvert.id === f.id && panneauOuvert.quoi === e.cle) ? null : { id: f.id, quoi: e.cle }; afficherTableau(); }
      });
      b.appendChild(creer("span", "sv-ico", e.ok ? "✔" : e.icone));
      b.appendChild(creer("span", "", e.nom));
    });
    c.appendChild(grille);
    if (!reglementRecu(f)) {
      const r = f.reglement && f.reglement.relance;
      c.appendChild(creer("p", "alerte-fiche", "⚠ Règlement non reçu" + (r ? " · relance le " + dateFr(r) : "")));
    }
    // saisie rapide de la licence ou du contact, sans ouvrir la fiche
    if (panneauOuvert && panneauOuvert.id === f.id) {
      const p = creer("div", "sv-panneau");
      const champs = [];
      const ajouter = function (etiquette, valeur, type, ph) {
        const l = creer("label", "", etiquette); const i = document.createElement("input"); i.type = type; i.value = valeur || ""; i.placeholder = ph || ""; l.appendChild(i); p.appendChild(l); champs.push(i); return i;
      };
      if (panneauOuvert.quoi === "licence") { ajouter("Numéro de licence", f.licence, "text"); }
      else { ajouter("E-mail du responsable", f.email, "email", "prenom.nom@exemple.fr"); ajouter("Téléphone du responsable", f.telephone, "tel", "06 00 00 00 00"); }
      bouton(p, "bouton", "Enregistrer", function () {
        if (panneauOuvert.quoi === "licence") { f.licence = champs[0].value.trim(); } else { f.email = champs[0].value.trim(); f.telephone = champs[1].value.trim(); }
        panneauOuvert = null; sauver();
      });
      c.appendChild(p);
    }
    const v = bouton(c, "bouton-mini" + (n === 4 ? " vert" : ""), n === 4 ? "✅ Valider la fiche" : "Il manque : " + etapes.filter(function (e) { return !e.ok; }).map(function (e) { return e.nom.toLowerCase(); }).join(", "), function () { f.validee = true; sauver(); });
    v.disabled = n < 4;
    return c;
  }
  function dessinerListe() {
    liste.innerHTML = "";
    const ordre = completes.concat(reste.sort(function (x, y) { return nbOk(y) - nbOk(x) || parNom(x, y); }));
    const vues = ordre.filter(garde);
    if (!vues.length) { liste.appendChild(creer("p", "petit", "Aucune fiche ne correspond.")); return; }
    vues.forEach(function (f) { liste.appendChild(carte(f)); });
  }
  dessinerListe();
}

// La grande liste des règlements non reçus a été retirée : l'alerte est directement sur chaque fiche.
function afficherAlertes() { champ("alertes").innerHTML = ""; }

function commencerModification(f) {
  idEnModification = f.id;
  champ("prenom").value = f.prenom || "";
  champ("nom").value = f.nom || "";
  champ("naissance").value = f.naissance || "";
  menuCeinture.value = f.ceinture || ceintures[0].nom;
  champ("licence").value = f.licence || "";
  champ("entree").value = f.entree || "";
  champ("poids").value = f.poids || "";
  champ("dan").value = String(f.dan || 1); champ("dan-date").value = f.danDate || ""; champ("points-uv3").value = f.pointsUV3 || "";
  uvCourantes = Object.assign({}, f.uv || {}); valideeCourante = !!f.validee;
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
for (const id of ["dan", "dan-date", "points-uv3", "prenom", "nom", "naissance", "ceinture", "licence", "entree", "poids", "contacts", "email", "telephone", "certificat", "reglement-recu", "relance"]) {
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
champ("valider-fiche").addEventListener("click", function () { valideeCourante = !valideeCourante; majApercu(); });

champ("enregistrer").addEventListener("click", function () {
  const f = ficheDuFormulaire();
  if (f.prenom === "" || f.nom === "" || f.naissance === "") {
    alert("Renseignez le prénom, le nom et la date de naissance");
    return;
  }
  if (f.validee && manquePourValider(f).length) { f.validee = false; }
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

// ----- Import de la liste du club (fichier JSON local) -----
function cleJudoka(f) { return sansAccentsMin(f.prenom) + "|" + sansAccentsMin(f.nom) + "|" + (f.naissance || ""); }
function sansAccentsMin(t) { return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(); }
// Version « codée » (3 premières lettres du nom + initiale du prénom) : remplace la fiche complète déjà importée
function cleCode(f) { return sansAccentsMin(String(f.nom || "").replace(/\s/g, "")).slice(0, 3) + "|" + sansAccentsMin(f.prenom).charAt(0) + "|" + (f.naissance || ""); }
function estCode(x) { return String(x.nom).length <= 3 && String(x.prenom).length <= 2; }
champ("import-fichier").addEventListener("change", function (e) {
  const fichier = e.target.files[0];
  const sortie = champ("import-resultat");
  if (!fichier) { return; }
  const lecteur = new FileReader();
  lecteur.onload = function () {
    let liste;
    try { liste = JSON.parse(lecteur.result); if (!Array.isArray(liste)) { throw new Error(); } }
    catch (err) { sortie.textContent = "❌ Fichier illisible : choisissez licencies-club.json."; return; }
    const existantes = new Set(fiches.map(cleJudoka));
    let ajoutees = 0, doublons = 0, aVerifier = 0, remplacees = 0;
    liste.forEach(function (x, i) {
      if (!x || !x.prenom || !x.nom || !x.naissance) { return; }
      if (existantes.has(cleJudoka(x))) { doublons++; return; }
      const complete = estCode(x) ? fiches.find(function (e) { return !estCode(e) && cleCode(e) === cleCode(x); }) : null;
      if (complete) {                                   // on garde ceinture, dossier, règlement : seule l'identité est codée
        existantes.delete(cleJudoka(complete)); complete.prenom = x.prenom; complete.nom = x.nom;
        existantes.add(cleJudoka(complete)); remplacees++; return;
      }
      const fiche = {
        id: Date.now() + i, prenom: x.prenom, nom: x.nom, naissance: x.naissance,
        ceinture: x.ceinture || ceintures[0].nom, licence: x.licence || "", entree: "", poids: "",
        contacts: "", email: "", telephone: "", certificat: false, photo: "",
        reglement: { recu: false, modes: [], cheques: [], paiements: {}, relance: "" }
      };
      if (!x.ceinture) { fiche.ceintureAVerifier = true; aVerifier++; }
      fiches.push(fiche); existantes.add(cleJudoka(fiche)); ajoutees++;
    });
    if (enregistrerFiches(fiches)) {
      sortie.textContent = "✅ " + ajoutees + " fiche(s) ajoutée(s), " + remplacees + " remplacée(s) par leur version codée, " + doublons + " déjà présente(s). Ceinture à renseigner pour " + aVerifier + " (cliquez ✏️ sur chaque fiche).";
      afficherTableau(); afficherAlertes();
    }
  };
  lecteur.readAsText(fichier);
  e.target.value = "";
});

// ----- Démarrage -----
majApercu();
afficherTableau();
afficherAlertes();
