// Administrateur : ajouter, voir et supprimer les infos du fil d'info.
const formulaire = document.getElementById("formulaire");
const zone = document.getElementById("liste");

function aujourdhui() { return new Date().toISOString().slice(0, 10); }

function afficher() {
  const infos = infosTriees();
  zone.innerHTML = "";
  document.getElementById("vide").hidden = infos.length > 0;
  infos.forEach(function (i) {
    const t = TYPES_INFO[i.type] || TYPES_INFO.info;
    const c = document.createElement("div"); c.className = "info-carte"; c.style.setProperty("--c", t.couleur);
    c.appendChild(document.createElement("i"));
    const d = document.createElement("div"); d.style.flex = "1";
    const q = document.createElement("span"); q.className = "quoi"; q.textContent = t.nom;
    const p = document.createElement("p"); p.textContent = i.texte;
    const s = document.createElement("small"); s.textContent = dateCourte(i.date);
    const b = document.createElement("button"); b.type = "button"; b.className = "bouton-annuler"; b.textContent = "Supprimer";
    b.addEventListener("click", function () {
      if (!confirm("Supprimer cette info ?")) { return; }
      enregistrerInfos(lireInfos().filter(function (x) { return x.id !== i.id; }));
      afficher();
    });
    d.appendChild(q); d.appendChild(p); d.appendChild(s); d.appendChild(b);
    c.appendChild(d); zone.appendChild(c);
  });
}

formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  const texte = document.getElementById("texte").value.trim();
  if (!texte) { return; }
  const liste = lireInfos();
  liste.push({ id: Date.now(), type: document.getElementById("type").value, texte: texte, date: aujourdhui() });
  enregistrerInfos(liste);
  document.getElementById("texte").value = "";
  afficher();
});

document.getElementById("exemples").addEventListener("click", function () {
  const liste = lireInfos(), d = aujourdhui(), n = Date.now();
  liste.push({ id: n, type: "important", texte: "EXEMPLE : l'entraînement de jeudi est maintenu, pensez à la gourde", date: d });
  liste.push({ id: n + 1, type: "resultat", texte: "EXEMPLE : 3 médailles pour le club au tournoi de Villefranche", date: d });
  liste.push({ id: n + 2, type: "info", texte: "EXEMPLE : réunion des parents samedi à 10 h au dojo", date: d });
  enregistrerInfos(liste);
  afficher();
});
afficher();
