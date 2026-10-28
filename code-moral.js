// Page "Code moral du judo" : une carte illustrée par valeur.
const zone = document.getElementById("valeurs");
VALEURS.forEach(function (v) {
  const carte = document.createElement("article");
  carte.className = "valeur";
  carte.style.setProperty("--c", v.couleur);
  const haut = document.createElement("div");
  haut.className = "valeur-image";
  haut.appendChild(dessinValeur(v));
  const kanji = document.createElement("span");
  kanji.className = "valeur-kanji";
  kanji.textContent = v.kanji;
  kanji.setAttribute("lang", "ja");
  haut.appendChild(kanji);
  carte.appendChild(haut);
  const nom = document.createElement("h2");
  nom.textContent = v.nom;
  carte.appendChild(nom);
  const romaji = document.createElement("p");
  romaji.className = "valeur-romaji";
  romaji.textContent = v.romaji;
  carte.appendChild(romaji);
  const sens = document.createElement("p");
  sens.textContent = v.sens;
  carte.appendChild(sens);
  zone.appendChild(carte);
});
