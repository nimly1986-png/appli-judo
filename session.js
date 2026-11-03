// =====================================================================
//  SESSION (préparation de la future connexion par identifiant + mot de passe)
//  Aujourd'hui rien n'enregistre de session : l'appli se comporte comme avant.
//  Quand la connexion existera, elle devra enregistrer sous la clé "session" :
//    { famille: "Dupont", role: "famille" }   → famille : ne voit que ses judokas
//    { famille: "Dupont", role: "admin" }     → membre autorisé administrateur par le président
//    { famille: "Camuzet", role: "president" } → le président : il accorde ou retire les droits admin
//  ATTENTION : ce fichier ne vérifie aucun mot de passe et ne protège rien. Une page statique
//  peut être modifiée par n'importe qui dans son navigateur ; la vraie vérification (et le
//  droit « administrateur ») devra venir d'un serveur / d'une base de données.
// =====================================================================
function lireSession() {
  try {
    const s = JSON.parse(localStorage.getItem("session"));
    return s && s.famille ? s : null;
  } catch (e) { return null; }
}
function estAdmin() { const s = lireSession(); return !!s && (s.role === "admin" || s.role === "president"); }
function estPresident() { const s = lireSession(); return !!s && s.role === "president"; }
function sansAccent(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
function fichesDeLaFamille(fiches, s) { return s ? fiches.filter(function (f) { return sansAccent(f.nom) === sansAccent(s.famille); }) : fiches; }
