// =====================================================================
//  PARTICIPATIONS : planning à la journée de notre interclub (créneaux d'1 h)
//  + commentaires (gâteaux, crêpes...). Données enregistrées sur cet appareil.
// =====================================================================
const HEURE_DEBUT = 8;     // premier créneau : 8 h - 9 h
const HEURE_FIN = 19;      // dernier créneau : 18 h - 19 h

if (dateSimulee) {
  const b = document.getElementById("bandeau-date");
  b.hidden = false;
  b.textContent = "Date simulée : " + texteDate({ debut: aujourdhuiISO() });
}

// ----- Notre interclub : le prochain (ou le dernier) interclub organisé par "CO Chandieu" -----
const interclubs = toutesLesCompetitions().filter(function (c) { return c.type === "interclub" && c.lieu.includes("CO Chandieu"); });
const notre = interclubs.find(function (c) { return !estPassee(c); }) || interclubs[interclubs.length - 1];

if (!notre) {
  document.getElementById("vide").hidden = false;
} else {
  document.getElementById("contenu").hidden = false;
  document.getElementById("titre-jour").textContent = "Interclub du " + texteDate(notre) + (estPassee(notre) ? " (terminé)" : "");
  demarrer("participation-" + notre.debut);
}

function demarrer(cle) {
  let donnees;
  try { donnees = JSON.parse(localStorage.getItem(cle)) || {}; } catch (e) { donnees = {}; }
  donnees.creneaux = donnees.creneaux || {};     // { "8": ["Anna", "Karim"], ... }
  donnees.commentaires = donnees.commentaires || [];
  const sauver = function () { localStorage.setItem(cle, JSON.stringify(donnees)); };

  const champPrenom = document.getElementById("prenom");
  champPrenom.value = localStorage.getItem("prenomParent") || "";
  champPrenom.addEventListener("input", function () { localStorage.setItem("prenomParent", champPrenom.value.trim()); });
  const prenom = () => champPrenom.value.trim();
  const demanderPrenom = function () {
    if (prenom() === "") { alert("Indiquez d'abord votre prénom."); champPrenom.focus(); return false; }
    return true;
  };

  function afficherCreneaux() {
    const zone = document.getElementById("creneaux");
    zone.innerHTML = "";
    for (let h = HEURE_DEBUT; h < HEURE_FIN; h++) {
      const noms = donnees.creneaux[h] || [];
      const ligne = creer("div", "creneau" + (noms.length ? " rempli" : ""));
      const bouton = creer("button", "creneau-heure", h + "h – " + (h + 1) + "h");
      bouton.type = "button";
      bouton.addEventListener("click", function () {
        if (!demanderPrenom()) { return; }
        const liste = donnees.creneaux[h] || [];
        if (liste.includes(prenom())) { return; }          // déjà inscrit(e) sur ce créneau
        liste.push(prenom());
        donnees.creneaux[h] = liste;
        sauver();
        afficherCreneaux();
      });
      ligne.appendChild(bouton);
      const noms_ = creer("div", "creneau-noms");
      if (noms.length === 0) { noms_.appendChild(creer("span", "creneau-libre", "Libre")); }
      noms.forEach(function (n) {
        const puce = creer("button", "puce-nom", n + " ✕");
        puce.type = "button";
        puce.title = "Retirer " + n;
        puce.addEventListener("click", function () {
          if (confirm("Retirer " + n + " de ce créneau ?")) {
            donnees.creneaux[h] = donnees.creneaux[h].filter(function (x) { return x !== n; });
            sauver();
            afficherCreneaux();
          }
        });
        noms_.appendChild(puce);
      });
      ligne.appendChild(noms_);
      zone.appendChild(ligne);
    }
  }

  function afficherCommentaires() {
    const ul = document.getElementById("commentaires");
    ul.innerHTML = "";
    // bilan : combien de familles apportent quoi
    const compte = {};
    donnees.commentaires.forEach(function (c) { (c.choix || []).forEach(function (x) { compte[x] = (compte[x] || 0) + 1; }); });
    const bilan = Object.keys(compte).map(function (k) { return k + " : " + compte[k]; });
    document.getElementById("bilan").textContent = bilan.length ? bilan.join("  ·  ") : "Personne ne s'est encore signalé.";

    donnees.commentaires.forEach(function (c, index) {
      const li = creer("li", "");
      li.appendChild(creer("strong", "", c.prenom));
      if (c.choix && c.choix.length) {
        const puces = creer("div", "puces");
        c.choix.forEach(function (x) { puces.appendChild(creer("span", "puce", x)); });
        li.appendChild(puces);
      }
      if (c.texte) { li.appendChild(creer("p", "", c.texte)); }
      const retirer = creer("button", "lien-retirer", "Supprimer");
      retirer.type = "button";
      retirer.addEventListener("click", function () {
        if (confirm("Supprimer cette note ?")) {
          donnees.commentaires.splice(index, 1);
          sauver();
          afficherCommentaires();
        }
      });
      li.appendChild(retirer);
      ul.appendChild(li);
    });
  }

  document.getElementById("publier").addEventListener("click", function () {
    if (!demanderPrenom()) { return; }
    const champ = document.getElementById("commentaire");
    const texte = champ.value.trim();
    const cases = Array.from(document.querySelectorAll(".choix-apport:checked"));
    const choix = cases.map(function (i) { return i.value; });
    if (texte === "" && choix.length === 0) { alert("Cochez crêpes et/ou gâteau, ou écrivez une précision."); return; }
    donnees.commentaires.push({ prenom: prenom(), choix: choix, texte: texte });
    sauver();
    champ.value = "";
    cases.forEach(function (i) { i.checked = false; });
    afficherCommentaires();
  });

  afficherCreneaux();
  afficherCommentaires();
}
