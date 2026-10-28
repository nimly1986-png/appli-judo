// =====================================================================
//  ESPACE ADMINISTRATEUR : valider les inscriptions aux compétitions
//  et ajouter des compétitions. Les familles voient le résultat en lecture seule.
// =====================================================================
const fiches = lireFiches();
const menu = document.getElementById("choix");
const zoneInscriptions = document.getElementById("liste-inscriptions");

function afficherInscriptions() {
  zoneInscriptions.innerHTML = "";
  const fiche = fiches[Number(menu.value)];
  if (!fiche) { return; }
  const aVenir = toutesLesCompetitions().filter(function (c) { return concerne(c, fiche) && !estPassee(c); });
  if (aVenir.length === 0) {
    zoneInscriptions.appendChild(creer("p", "message-vide", "Aucune compétition à venir pour la catégorie de " + fiche.prenom + "."));
    return;
  }
  aVenir.forEach(function (c) {
    const ligne = creer("label", "ligne-inscription");
    const case_ = document.createElement("input");
    case_.type = "checkbox";
    case_.checked = estInscrit(fiche, c);
    case_.addEventListener("change", function () {
      const toutes = lireInscriptions();
      toutes[fiche.id] = toutes[fiche.id] || {};
      if (case_.checked) { toutes[fiche.id][cleCompetition(c)] = true; } else { delete toutes[fiche.id][cleCompetition(c)]; }
      enregistrerInscriptions(toutes);
    });
    ligne.appendChild(case_);
    ligne.appendChild(creer("span", "", dateCourte(c.debut) + " · " + c.nom + " · " + c.lieu));
    zoneInscriptions.appendChild(ligne);
  });
}

if (fiches.length === 0) {
  document.getElementById("vide").hidden = false;
} else {
  fiches.forEach(function (f, i) {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = f.prenom + " " + f.nom + " (" + calculerCategorie(f.naissance) + ")";
    menu.appendChild(o);
  });
  menu.addEventListener("change", afficherInscriptions);
  afficherInscriptions();
}

// ----- Ajouter / supprimer des compétitions -----
const zoneCategories = document.getElementById("c-categories");
categories.map(function (c) { return c.nom; }).concat(["Vétéran"]).forEach(function (nom) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = nom;
  label.appendChild(input);
  label.appendChild(document.createTextNode(" " + nom));
  zoneCategories.appendChild(label);
});

function afficherAjoutees() {
  const zone = document.getElementById("liste-ajoutees");
  zone.innerHTML = "";
  const liste = lireAjoutees();
  if (liste.length === 0) { zone.appendChild(creer("p", "message-vide", "Aucune compétition ajoutée à la main.")); return; }
  const ul = creer("ul");
  liste.forEach(function (c, index) {
    const li = creer("li", "");
    li.appendChild(creer("strong", "", c.nom));
    li.appendChild(creer("p", "", texteDate(c) + " · " + c.lieu + " · " + c.categories.join(", ")));
    const supprimer = creer("button", "bouton danger", "Supprimer");
    supprimer.type = "button";
    supprimer.addEventListener("click", function () {
      if (confirm("Supprimer « " + c.nom + " » ?")) {
        const reste = lireAjoutees();
        reste.splice(index, 1);
        enregistrerAjoutees(reste);
        afficherAjoutees();
        afficherInscriptions();
      }
    });
    li.appendChild(supprimer);
    ul.appendChild(li);
  });
  zone.appendChild(ul);
}

document.getElementById("c-ajouter").addEventListener("click", function () {
  const nom = document.getElementById("c-nom").value.trim();
  const debut = document.getElementById("c-debut").value;
  const fin = document.getElementById("c-fin").value;
  const lieu = document.getElementById("c-lieu").value.trim();
  const cats = Array.from(zoneCategories.querySelectorAll("input:checked")).map(function (i) { return i.value; });
  if (!nom || !debut || cats.length === 0) { alert("Renseignez au moins le nom, la date et une catégorie."); return; }
  if (fin && fin < debut) { alert("La date de fin est avant la date de début."); return; }
  const liste = lireAjoutees();
  liste.push({ nom: nom, debut: debut, fin: fin || null, lieu: lieu || "Lieu à confirmer", infos: "Ajoutée par l'administrateur", categories: cats, type: "championnat", aConfirmer: !lieu });
  enregistrerAjoutees(liste);
  for (const id of ["c-nom", "c-debut", "c-fin", "c-lieu"]) { document.getElementById(id).value = ""; }
  zoneCategories.querySelectorAll("input").forEach(function (i) { i.checked = false; });
  afficherAjoutees();
  afficherInscriptions();
});
afficherAjoutees();
