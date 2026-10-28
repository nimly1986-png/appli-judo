// À modifier : la date butoir et les dates proposées
const DATE_LIMITE = new Date("2026-11-01T23:59:00");

const dates = [
  { id: "d1", label: "Sam. 10 Oct." },
  { id: "d2", label: "Sam. 7 Nov.",  },
  { id: "d3", label: "Sam. 14 Nov.", }
];

const choix = [
  { valeur: "", texte: "—" },
  { valeur: "present", texte: "Présent" },
  { valeur: "absent", texte: "Absent" },
  ];

let judokas = JSON.parse(localStorage.getItem("judokas")) || [];

function sauvegarder() {
  localStorage.setItem("judokas", JSON.stringify(judokas));
}

function dateLimiteDepassee() {
  return new Date() > DATE_LIMITE;
}

function compter(id, valeur) {
  let total = 0;
  for (const j of judokas) {
    if (j.reponses[id] === valeur) {
      total = total + 1;
    }
  }
  return total;
}

function ajouterCellule(ligne, texte, balise) {
  const cellule = document.createElement(balise || "td");
  cellule.textContent = texte;
  ligne.appendChild(cellule);
  return cellule;
}

function afficherTableau() {
  const tableau = document.getElementById("tableau");
  tableau.innerHTML = "";
  const close = dateLimiteDepassee();

  // Ligne d'en-tête
  const entete = tableau.insertRow();
  ajouterCellule(entete, "Judoka", "th");
  for (const d of dates) {
    ajouterCellule(entete, d.label, "th");
  }
  ajouterCellule(entete, "", "th");

    // Une ligne par judoka
  for (let index = 0; index < judokas.length; index++) {
    const j = judokas[index];
    const ligne = tableau.insertRow();
    if (j.valide) {
      ligne.className = "valide";
    }
    ajouterCellule(ligne, j.nom);

    for (const d of dates) {
      const cellule = ajouterCellule(ligne, "");
      const select = document.createElement("select");
      for (const c of choix) {
        const option = document.createElement("option");
        option.value = c.valeur;
        option.textContent = c.texte;
        select.appendChild(option);
      }
      select.value = j.reponses[d.id] || "";
      select.disabled = close || j.valide;
      select.addEventListener("change", function () {
        j.reponses[d.id] = select.value;
        sauvegarder();
        afficherTableau();
      });
      cellule.appendChild(select);
    }

    const celluleActions = ajouterCellule(ligne, "");
    if (!close) {
      const boutonValider = document.createElement("button");
      if (j.valide) {
        boutonValider.textContent = "↩ Modifier";
        boutonValider.addEventListener("click", function () {
          j.valide = false;
          sauvegarder();
          afficherTableau();
        });
      } else {
        boutonValider.textContent = "✔ Valider";
        boutonValider.addEventListener("click", function () {
          for (const d of dates) {
            if (!j.reponses[d.id]) {
              alert("Répondez pour : " + d.label);
              return;
            }
          }
          j.valide = true;
          sauvegarder();
          afficherTableau();
        });
      }
      celluleActions.appendChild(boutonValider);

      const boutonRetirer = document.createElement("button");
      boutonRetirer.textContent = "✕ Retirer";
      boutonRetirer.addEventListener("click", function () {
        if (confirm("Retirer " + j.nom + " de la liste ?")) {
          judokas.splice(index, 1);
          sauvegarder();
          afficherTableau();
        }
      });
      celluleActions.appendChild(boutonRetirer);
    }
  }

  // Lignes de totaux
  const ligneP = tableau.insertRow();
  ligneP.className = "total";
  ajouterCellule(ligneP, "Présents");
  for (const d of dates) {
    ajouterCellule(ligneP, compter(d.id, "present"));
  }
  ajouterCellule(ligneP, "");

  const ligneA = tableau.insertRow();
  ligneA.className = "total";
  ajouterCellule(ligneA, "Absents");
  for (const d of dates) {
    ajouterCellule(ligneA, compter(d.id, "absent"));
  }
  ajouterCellule(ligneA, "");
}

document.getElementById("ajouter").addEventListener("click", function () {
  const nom = document.getElementById("nom").value.trim();
  if (nom === "") {
    alert("Indiquez un prénom");
    return;
  }
  for (const j of judokas) {
    if (j.nom.toLowerCase() === nom.toLowerCase()) {
      alert("Ce prénom est déjà dans la liste");
      return;
    }
  }
  judokas.push({ nom: nom, reponses: {} });
  sauvegarder();
  document.getElementById("nom").value = "";
  afficherTableau();
});

// Démarrage de la page
document.getElementById("info-date-limite").textContent =
  "Date limite d'inscription : " + DATE_LIMITE.toLocaleDateString("fr-FR");
if (dateLimiteDepassee()) {
  document.getElementById("formulaire").style.display = "none";
  document.getElementById("info-date-limite").textContent += " (inscriptions closes)";
}
afficherTableau();