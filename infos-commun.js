// =====================================================================
//  INFOS DU CLUB (fil d'info de l'accueil)
//  Saisies par l'administrateur (admin-infos.html), lues par les familles.
//  Enregistrées sur cet appareil seulement, tant qu'il n'y a pas de base en ligne.
// =====================================================================
const TYPES_INFO = {
  info: { nom: "Info", couleur: "var(--bleu)" },
  resultat: { nom: "Résultat", couleur: "var(--vert)" },
  important: { nom: "Important", couleur: "var(--orange)" }
};
function lireInfos() {
  try { return JSON.parse(localStorage.getItem("infos")) || []; } catch (e) { return []; }
}
function enregistrerInfos(liste) { localStorage.setItem("infos", JSON.stringify(liste)); }
// les plus récentes d'abord
function infosTriees() {
  return lireInfos().slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)) || b.id - a.id; });
}
function dateCourte(iso) {
  const p = String(iso).split("-");
  return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : "";
}
