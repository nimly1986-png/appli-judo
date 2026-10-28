// Choix du fond d'écran de l'accueil (mémorisé sur cet appareil)
(function () {
  var FONDS = [
    { id: "jardin", nom: "Jardin japonais" },
    { id: "dojo",   nom: "Dojo traditionnel" },
    { id: "salle",  nom: "Salle de judo" }
  ];
  function lire() {
    try { var v = localStorage.getItem("fond"); if (v) return v; } catch (e) {}
    return "jardin";
  }
  function appliquer(id) {
    document.body.style.setProperty("--fond-img", 'url("img/' + id + '.svg")');
    var b = document.getElementById("btn-fond");
    var f = FONDS.filter(function (x) { return x.id === id; })[0] || FONDS[0];
    if (b) b.textContent = "Fond : " + f.nom;
  }
  var id = lire();
  if (!FONDS.some(function (x) { return x.id === id; })) id = "jardin";
  appliquer(id);
  var b = document.getElementById("btn-fond");
  if (b) b.addEventListener("click", function () {
    var i = FONDS.findIndex(function (x) { return x.id === id; });
    id = FONDS[(i + 1) % FONDS.length].id;
    try { localStorage.setItem("fond", id); } catch (e) {}
    appliquer(id);
  });
})();
