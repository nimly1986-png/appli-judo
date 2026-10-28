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
    const estClub = typeof INFOS_CLUB !== "undefined" && INFOS_CLUB.some(function (x) { return x.id === i.id && x.texte === i.texte; });
    const c = document.createElement("div"); c.className = "info-carte"; c.style.setProperty("--c", t.couleur);
    c.appendChild(document.createElement("i"));
    const d = document.createElement("div"); d.style.flex = "1";
    const q = document.createElement("span"); q.className = "quoi"; q.textContent = t.nom;
    const p = document.createElement("p"); p.textContent = i.texte;
    const s = document.createElement("small"); s.textContent = dateCourte(i.date) + (estClub ? " · publiée pour tous (à modifier dans infos-data.js)" : " · essai sur cet appareil seulement");
    const b = document.createElement("button"); b.type = "button"; b.className = "bouton-annuler"; b.textContent = "Supprimer";
    b.addEventListener("click", function () {
      if (!confirm("Supprimer cette info ?")) { return; }
      enregistrerInfos(lireInfosLocales().filter(function (x) { return x.id !== i.id; }));
      afficher();
    });
    d.appendChild(q); d.appendChild(p); d.appendChild(s); if (!estClub) { d.appendChild(b); }
    c.appendChild(d); zone.appendChild(c);
  });
}

formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  const texte = document.getElementById("texte").value.trim();
  if (!texte) { return; }
  const liste = lireInfosLocales();
  const type = document.getElementById("type").value;
  liste.push({ id: Date.now(), type: type, texte: texte, date: aujourdhui() });
  enregistrerInfos(liste);
  // ligne prête à coller dans infos-data.js pour que tous les parents la voient
  const prochainId = (typeof INFOS_CLUB !== "undefined" ? INFOS_CLUB : []).reduce(function (m, x) { return Math.max(m, x.id); }, 0) + 1;
  document.getElementById("ligne").value = "  { id: " + prochainId + ", type: " + JSON.stringify(type) + ", texte: " + JSON.stringify(texte) + ", date: " + JSON.stringify(aujourdhui()) + " },";
  document.getElementById("publier").hidden = false;
  document.getElementById("texte").value = "";
  afficher();
});

document.getElementById("exemples").addEventListener("click", function () {
  const liste = lireInfosLocales(), d = aujourdhui(), n = Date.now();
  liste.push({ id: n, type: "important", texte: "EXEMPLE : l'entraînement de jeudi est maintenu, pensez à la gourde", date: d });
  liste.push({ id: n + 1, type: "resultat", texte: "EXEMPLE : 3 médailles pour le club au tournoi de Villefranche", date: d });
  liste.push({ id: n + 2, type: "info", texte: "EXEMPLE : réunion des parents samedi à 10 h au dojo", date: d });
  enregistrerInfos(liste);
  afficher();
});
afficher();

document.getElementById("copier").addEventListener("click", function () {
  const champ = document.getElementById("ligne");
  champ.select();
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(champ.value); }
  document.getElementById("copie-etat").textContent = "Ligne copiée. Collez-la dans infos-data.js sur GitHub, avant la ligne « ]; ».";
});
