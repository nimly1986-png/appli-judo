// =====================================================================
//  ASSISTANT DE LA FICHE JUDOKA : le formulaire se remplit en 5 étapes.
//  Ce fichier ne change aucune donnée : il range seulement les champs de admin-fiches.js
//  (ceinture en pastilles de couleur, champs facultatifs repliés, boutons Précédent / Suivant).
// =====================================================================
(function () {
  const form = document.querySelector(".formulaire");
  const etapes = Array.from(form.querySelectorAll(":scope > details.repli-sec"));
  const menuCeinture = document.getElementById("ceinture");
  const bloc = document.getElementById("bloc-formulaire");
  let courante = 0;

  // --- Champs facultatifs : repliés dans « Plus d'infos »
  const plus = document.createElement("details");
  plus.className = "repli-filtre";
  plus.innerHTML = "<summary>➕ Plus d'infos (facultatif)</summary>";
  ["entree", "poids", "photo"].forEach(function (id) { plus.appendChild(document.getElementById(id).closest("label")); });
  plus.appendChild(document.getElementById("retirer-photo"));
  etapes[0].appendChild(plus);

  // --- Ceinture : pastilles de couleur, qui pilotent le menu d'origine
  const labelCeinture = menuCeinture.closest("label");
  const rangee = document.createElement("div");
  rangee.className = "ceintures-choix";
  rangee.setAttribute("role", "radiogroup");
  rangee.setAttribute("aria-label", "Ceinture");
  ceintures.forEach(function (c) {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.nom = c.nom; b.setAttribute("role", "radio");
    const rond = document.createElement("i"); colorer(rond, c.nom);
    b.appendChild(rond); b.appendChild(document.createElement("span")).textContent = c.nom.replace("-", " / ").toLowerCase();
    b.addEventListener("click", function () { menuCeinture.value = c.nom; menuCeinture.dispatchEvent(new Event("change", { bubbles: true })); majCeintures(); });
    rangee.appendChild(b);
  });
  labelCeinture.insertAdjacentElement("afterend", rangee);
  labelCeinture.classList.add("cache");
  function majCeintures() {
    rangee.querySelectorAll("button").forEach(function (b) {
      const on = b.dataset.nom === menuCeinture.value;
      b.classList.toggle("actif", on); b.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  // --- Catégorie d'âge calculée en direct sous la date de naissance
  const naiss = document.getElementById("naissance");
  const cat = document.createElement("p");
  cat.className = "cat-direct"; cat.setAttribute("role", "status");
  naiss.closest("label").insertAdjacentElement("afterend", cat);
  function majCategorie() {
    const n = calculerCategorie(naiss.value);
    cat.textContent = naiss.value && n ? libelleCategorie(n) : "";
    cat.hidden = !cat.textContent;
  }
  naiss.addEventListener("input", majCategorie);

  // --- Barre de progression + navigation
  const barre = document.createElement("ol");
  barre.className = "etapes-barre";
  etapes.forEach(function (e, i) {
    const li = document.createElement("li");
    const titre = e.querySelector("summary").textContent.trim();
    li.innerHTML = "<b>" + titre.split(" ")[0] + "</b><small>" + titre.split(" ").slice(1).join(" ") + "</small>";
    li.addEventListener("click", function () { aller(i); });
    barre.appendChild(li);
  });
  form.insertBefore(barre, form.firstChild);

  const nav = document.createElement("div");
  nav.className = "etapes-nav";
  const prec = document.createElement("button"); prec.type = "button"; prec.className = "bouton secondaire"; prec.textContent = "‹ Précédent";
  const suiv = document.createElement("button"); suiv.type = "button"; suiv.className = "bouton"; suiv.textContent = "Suivant ›";
  const msg = document.createElement("p"); msg.className = "petit erreur-etape"; msg.setAttribute("role", "alert"); msg.hidden = true;
  nav.appendChild(prec); nav.appendChild(suiv);
  etapes[etapes.length - 1].insertAdjacentElement("afterend", msg);
  msg.insertAdjacentElement("afterend", nav);

  prec.addEventListener("click", function () { aller(courante - 1); });
  suiv.addEventListener("click", function () {
    if (courante === 0 && (!document.getElementById("prenom").value.trim() || !document.getElementById("nom").value.trim())) {
      msg.textContent = "Indiquez le prénom et le nom pour continuer."; msg.hidden = false; return;
    }
    aller(courante + 1);
  });

  function aller(i) {
    courante = Math.max(0, Math.min(etapes.length - 1, i));
    msg.hidden = true;
    etapes.forEach(function (e, k) { e.open = k === courante; e.hidden = k !== courante; });
    Array.from(barre.children).forEach(function (li, k) { li.classList.toggle("fait", k < courante); li.classList.toggle("actif", k === courante); });
    prec.hidden = courante === 0;
    suiv.hidden = courante === etapes.length - 1;
    form.classList.toggle("derniere", courante === etapes.length - 1);
    majCeintures(); majCategorie();
    form.scrollIntoView({ block: "nearest" });
  }
  form.classList.add("assistant");
  etapes.forEach(function (e) { e.querySelector("summary").addEventListener("click", function (ev) { ev.preventDefault(); }); });

  // Quand on ouvre le bloc (nouvelle fiche ou modification) : retour à la première étape
  bloc.addEventListener("toggle", function () { if (bloc.open) { aller(0); } });
  ["enregistrer", "annuler"].forEach(function (id) {
    document.getElementById(id).addEventListener("click", function () { setTimeout(function () { aller(0); }, 0); });
  });
  aller(0);
})();
