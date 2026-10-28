// Fiche d'une technique : photos en 4 étapes + points clés.
const id = new URLSearchParams(location.search).get("id");
const tech = TECHNIQUES.find(function (t) { return t.id === id; });
const zone = document.getElementById("fiche");
function el(tag, classe, texte) { const e = document.createElement(tag); if (classe) { e.className = classe; } if (texte) { e.textContent = texte; } return e; }

if (!tech) {
  zone.appendChild(el("p", "message-vide", "Technique introuvable."));
} else {
  const niv = NIVEAUX.find(function (n) { return n.cle === tech.niveau; });
  document.title = tech.nom;
  const COUL = { jaune: "var(--jaune)", orange: "var(--orange)", verte: "var(--vert)", bleue: "var(--bleu)", marron: "var(--marron)", dan1: "var(--noire)", dan2: "var(--noire)", dan3: "var(--noire)" };
  document.body.style.setProperty("--accent", COUL[tech.niveau]);
  zone.appendChild(el("h1", "", tech.nom));
  zone.appendChild(el("p", "trad", "« " + tech.trad + " »"));
  const puces = el("div", "puces");
  [tech.groupe, tech.famille + " (" + FAMILLES[tech.famille].sens + ")", "Niveau : " + niv.nom].forEach(function (x) { puces.appendChild(el("span", "puce", x)); });
  zone.appendChild(puces);

  // photos : à placer dans img/techniques/<id>/1.jpg ... 4.jpg
  const etapes = tech.groupe === "Nage-waza" ? ["1 · Saisie", "2 · Déséquilibre", "3 · Entrée", "4 · Finition"] : ["1 · Position", "2 · Contrôle", "3 · Placement", "4 · Finition"];
  const photos = el("div", "photos-tech");
  etapes.forEach(function (nomEtape, i) {
    const fig = el("figure", "photo-tech");
    const img = document.createElement("img");
    img.src = "img/techniques/" + tech.id + "/" + (i + 1) + ".jpg";
    img.alt = tech.nom + " — " + nomEtape;
    img.addEventListener("error", function () { img.remove(); fig.classList.add("vide"); manque.textContent = "Photo à ajouter"; });
    const manque = el("span", "manque", "");
    fig.appendChild(img); fig.appendChild(manque);
    fig.appendChild(el("figcaption", "", nomEtape));
    photos.appendChild(fig);
  });
  zone.appendChild(photos);
  const q = encodeURIComponent(tech.nom.replace(/-/g, " ") + " judo");
  const liens = el("div", "liens-images");
  [["Voir des images", "https://www.google.com/search?tbm=isch&q=" + q], ["Voir des vidéos", "https://www.youtube.com/results?search_query=" + q]].forEach(function (l) {
    const a = el("a", "", l[0]); a.href = l[1]; a.target = "_blank"; a.rel = "noopener noreferrer"; liens.appendChild(a);
  });
  zone.appendChild(liens);
  zone.appendChild(el("p", "note-source", "Ces liens ouvrent un moteur de recherche extérieur : choisissez des sources sérieuses (fédération, clubs, professeurs)."));

  if (tech.prise) {
    zone.appendChild(el("h2", "", "Points clés"));
    const liste = el("dl", "points-cles");
    [["Saisie", tech.prise], ["Déséquilibre (kuzushi)", tech.desequilibre], ["Action", tech.action], ["Erreur fréquente", tech.erreur]].forEach(function (p) {
      if (!p[1] || p[1] === "—") { return; }
      liste.appendChild(el("dt", "", p[0]));
      liste.appendChild(el("dd", "", p[1]));
    });
    zone.appendChild(liste);
  } else {
    zone.appendChild(el("p", "avertissement", "La fiche détaillée de cette technique n'est pas encore rédigée. Seuls le nom, la traduction et la famille sont renseignés."));
  }
  if (tech.famille === "Shime-waza" || tech.famille === "Kansetsu-waza") {
    zone.appendChild(el("p", "avertissement", "Sécurité : étranglements et clés se travaillent lentement, avec un partenaire et sous le contrôle du professeur. Dès que uke tape deux fois (maitte), on lâche immédiatement. Ils ne sont pas autorisés en compétition chez les jeunes."));
  }
  zone.appendChild(el("p", "note-source", "Textes rédigés pour l'appli, à faire relire par le professeur. Niveau d'après : " + SOURCE_NIVEAUX));
}
