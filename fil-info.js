// Fil d'info défilant de l'accueil : les 8 dernières infos, qui défilent en boucle.
(function () {
  const lien = document.getElementById("fil");
  if (!lien) { return; }
  const piste = lien.querySelector(".fil-piste");
  const infos = infosTriees().slice(0, 8);
  if (infos.length === 0) {
    const p = document.createElement("span");
    p.className = "fil-vide";
    p.textContent = "Les informations du club apparaîtront ici.";
    piste.appendChild(p);
    return;
  }
  function element(info) {
    const t = TYPES_INFO[info.type] || TYPES_INFO.info;
    const s = document.createElement("span");
    s.className = "fil-item";
    s.style.setProperty("--c", t.couleur);
    const point = document.createElement("i");
    const quoi = document.createElement("b");
    quoi.textContent = t.nom + " ";
    const texte = document.createElement("span");
    texte.textContent = info.texte;
    s.appendChild(point); s.appendChild(quoi); s.appendChild(texte);
    return s;
  }
  const defile = document.createElement("div");
  defile.className = "fil-defile";
  // deux copies côte à côte : le défilement boucle sans saut
  for (let copie = 0; copie < 2; copie++) {
    const groupe = document.createElement("div");
    groupe.style.display = "inline-flex";
    infos.forEach(function (i) { groupe.appendChild(element(i)); });
    defile.appendChild(groupe);
  }
  piste.appendChild(defile);
  const caracteres = infos.reduce(function (n, i) { return n + i.texte.length + 12; }, 0);
  defile.style.setProperty("--duree", Math.max(18, caracteres * 0.22) + "s");
})();
