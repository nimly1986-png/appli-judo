// =====================================================================
//  PRÉ-RÉSERVATION DE KIMONO.
//  La demande est enregistrée sur CET appareil et envoyée au club par e-mail
//  (le site n'a pas encore de base de données commune : le club ne voit rien tant que
//  le parent n'envoie pas son message).
//  Données demandées : prénom, taille, besoin. Pas de nom de famille, pas d'adresse.
// =====================================================================
const fiches = lireFiches();
const formulaire = document.getElementById("formulaire");
const liste = document.getElementById("liste");
document.getElementById("saison").textContent = SAISON_SUIVANTE;

function dateLisible(iso) { const p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
if (DATE_LIMITE) {
  const l = document.getElementById("limite");
  l.hidden = false;
  l.textContent = "Merci de répondre avant le " + dateLisible(DATE_LIMITE) + ".";
}

function lire() { try { return JSON.parse(localStorage.getItem("equipement")) || []; } catch (e) { return []; } }
function ecrire(l) { try { localStorage.setItem("equipement", JSON.stringify(l)); } catch (e) {} }
const LIBELLES = { oui: "Oui, kimono à pré-réserver", "peut-etre": "Peut-être", non: "Non" };

// tableau et choix des survêtements
SURVETEMENTS.forEach(function (s) {
  const tr = creer("tr");
  tr.appendChild(creer("td", "", s.taille)); tr.appendChild(creer("td", "", s.public)); tr.appendChild(creer("td", "", s.prix + " €"));
  document.getElementById("survetements").appendChild(tr);
});
TAILLES_SURVETEMENT.forEach(function (t) {
  const adulte = ["M", "L", "XL", "XXL"].includes(t);
  document.getElementById("survetement").appendChild(new Option(t + " (" + (adulte ? 25 : 15) + " €)", t));
});

// choix d'un judoka existant (fiches) ou saisie libre du prénom
const menu = document.getElementById("judoka");
if (fiches.length > 0) {
  document.getElementById("zone-judoka").hidden = false;
  fiches.forEach(function (f) { menu.appendChild(new Option(f.prenom, "f" + f.id)); });
  menu.appendChild(new Option("Un autre enfant", "autre"));
  const prenomInput = document.getElementById("prenom");
  const maj = function () {
    const autre = menu.value === "autre";
    document.getElementById("zone-prenom").hidden = !autre;
    prenomInput.required = autre;
  };
  menu.addEventListener("change", maj);
  maj();
}
function prenomChoisi() {
  if (fiches.length > 0 && menu.value !== "autre") {
    const f = fiches.find(function (x) { return "f" + x.id === menu.value; });
    return f ? f.prenom : "";
  }
  return document.getElementById("prenom").value.trim();
}

// choix de la taille : les modèles disponibles dans cette taille s'affichent avec leur prix
const tailleMenu = document.getElementById("taille");
TAILLES_KIMONO.forEach(function (t) { tailleMenu.appendChild(new Option(t + " cm", t)); });
function modelesPour(cm) { return KIMONOS.filter(function (k) { return cm >= k.de && cm <= k.a; }); }
function prixTexte(cm) {
  const l = modelesPour(cm);
  if (!l.length) { return ""; }
  return l.map(function (k) { return k.modele + " " + k.public.toLowerCase() + (k.note ? " (" + k.note + ")" : "") + " : " + k.prix + " €"; }).join(" · ");
}
tailleMenu.addEventListener("change", function () {
  const z = document.getElementById("prix-taille");
  z.innerHTML = "";
  const cm = Number(tailleMenu.value);
  if (!cm) { return; }
  const l = modelesPour(cm);
  const boite = creer("div", "prix-kimonos");
  boite.appendChild(creer("strong", "", "Kimonos du club en " + cm + " cm"));
  l.forEach(function (k) {
    const ligne = creer("p", "");
    ligne.appendChild(creer("span", "", k.modele + " · " + k.public + (k.note ? " (" + k.note + ")" : "")));
    ligne.appendChild(creer("b", "", k.prix + " €"));
    boite.appendChild(ligne);
  });
  z.appendChild(boite);
});

function message(d) {
  return "Pré-réservation kimono " + SAISON_SUIVANTE + "\n" +
    "Prénom : " + d.prenom + "\n" +
    "Taille du kimono : " + d.taille + " cm" + (prixTexte(d.taille) ? " (" + prixTexte(d.taille) + ")" : "") + "\n" +
    "Besoin : " + LIBELLES[d.besoin] + (d.survetement ? "\nSurvêtement : taille " + d.survetement : "") + (d.remarque ? "\nRemarque : " + d.remarque : "") + "\n" +
    "Envoyé depuis l'application du JCO Chandieu";
}

function montrerEnvoi(d) {
  const texte = message(d);
  document.getElementById("envoi").hidden = false;
  const lien = document.getElementById("mail");
  if (CLUB_EMAIL) {
    lien.hidden = false;
    lien.href = "mailto:" + CLUB_EMAIL + "?subject=" + encodeURIComponent("Pré-réservation kimono " + SAISON_SUIVANTE + " - " + d.prenom) + "&body=" + encodeURIComponent(texte);
    document.getElementById("envoi-texte").textContent = "Votre demande est enregistrée sur cet appareil. Envoyez-la au club pour qu'il en tienne compte :";
  } else {
    lien.hidden = true;
    document.getElementById("envoi-texte").textContent = "Votre demande est enregistrée sur cet appareil. L'adresse e-mail du club n'est pas encore renseignée : copiez le message et transmettez-le au club.";
  }
  document.getElementById("copier").onclick = function () {
    const etat = document.getElementById("copie-etat");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte).then(function () { etat.textContent = "Message copié."; }, function () { etat.textContent = "Copie impossible."; });
    } else { etat.textContent = "Copie impossible sur cet appareil."; }
  };
}

function afficher() {
  const l = lire();
  liste.innerHTML = "";
  document.getElementById("vide").hidden = l.length > 0;
  l.forEach(function (d) {
    const c = creer("div", "demande");
    c.appendChild(creer("p", "", d.prenom + " · " + d.taille + " cm · " + LIBELLES[d.besoin] + (d.survetement ? " · survêtement " + d.survetement : "") + " (saison " + d.saison + ")"));
    if (d.remarque) { c.appendChild(creer("small", "", d.remarque)); }
    const renvoi = creer("button", "bouton-annuler", "Envoyer");
    renvoi.type = "button";
    renvoi.addEventListener("click", function () { montrerEnvoi(d); document.getElementById("envoi").scrollIntoView(); });
    const sup = creer("button", "bouton-annuler", "Supprimer");
    sup.type = "button";
    sup.addEventListener("click", function () {
      if (!confirm("Supprimer cette demande de cet appareil ?")) { return; }
      ecrire(lire().filter(function (x) { return x.id !== d.id; }));
      afficher();
    });
    const actions = creer("div", "actions");
    actions.appendChild(renvoi); actions.appendChild(sup);
    c.appendChild(actions);
    liste.appendChild(c);
  });
}

formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  const prenom = prenomChoisi();
  const taille = Number(document.getElementById("taille").value);
  const besoin = (formulaire.querySelector('input[name="besoin"]:checked') || {}).value;
  if (!prenom || !taille || !besoin) { return; }
  const d = { id: Date.now(), prenom: prenom, taille: taille, besoin: besoin, survetement: document.getElementById("survetement").value, remarque: document.getElementById("remarque").value.trim(), saison: SAISON_SUIVANTE };
  const l = lire();
  l.push(d);
  ecrire(l);
  montrerEnvoi(d);
  formulaire.reset();
  document.getElementById("prix-taille").innerHTML = "";
  afficher();
});
afficher();
