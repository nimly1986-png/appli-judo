// Choix clair / sombre : clair par défaut, le choix est gardé sur l'appareil.
(function () {
  var racine = document.documentElement;
  function lire() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
  function ecrire(v) { try { localStorage.setItem("theme", v); } catch (e) {} }
  function appliquer(t) {
    if (t === "dark") { racine.setAttribute("data-theme", "dark"); } else { racine.removeAttribute("data-theme"); }
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { m.setAttribute("content", t === "dark" ? "#0d1226" : "#f3f5fb"); }
  }
  appliquer(lire());
  var SOLEIL = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var LUNE = '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>';
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bouton-theme";
    function maj() {
      var sombre = racine.getAttribute("data-theme") === "dark";
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (sombre ? SOLEIL : LUNE) + "</svg>";
      b.setAttribute("aria-label", sombre ? "Passer en mode clair" : "Passer en mode sombre");
      b.title = b.getAttribute("aria-label");
    }
    b.addEventListener("click", function () {
      var suivant = racine.getAttribute("data-theme") === "dark" ? "light" : "dark";
      appliquer(suivant); ecrire(suivant); maj();
    });
    maj();
    document.body.appendChild(b);
  });
})();
