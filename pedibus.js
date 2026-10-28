let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

function afficher() {
  const listeBesoins = document.getElementById("liste-besoins");
  const listeDispos = document.getElementById("liste-dispos");
  listeBesoins.innerHTML = "";
  listeDispos.innerHTML = "";

  annonces.forEach(function (a, index) {
    const li = document.createElement("li");
    li.textContent = a.jour + " : " + a.prenom + " (" + a.nombre + ") ";

    // bouton pour annuler une annonce faite par erreur
    const annuler = document.createElement("button");
    annuler.textContent = "✕ Annuler";
    annuler.className = "bouton-annuler";
    annuler.addEventListener("click", function () {
      if (confirm("Annuler l'annonce de " + a.prenom + " (" + a.jour + ") ?")) {
        annonces.splice(index, 1);
        localStorage.setItem("annonces", JSON.stringify(annonces));
        afficher();
      }
    });
    li.appendChild(annuler);
    if (a.type === "besoin") {
      listeBesoins.appendChild(li);
    } else {
      listeDispos.appendChild(li);
    }
  });
}

document.getElementById("ajouter").addEventListener("click", function () {
  const prenom = document.getElementById("prenom").value.trim();
  if (prenom === "") {
    alert("Indiquez votre prénom");
    return;
  }
  annonces.push({
    type: document.getElementById("type").value,
    jour: document.getElementById("jour").value,
    prenom: prenom,
    nombre: document.getElementById("nombre").value
  });
  localStorage.setItem("annonces", JSON.stringify(annonces));
  document.getElementById("prenom").value = "";
  afficher();
});

afficher();