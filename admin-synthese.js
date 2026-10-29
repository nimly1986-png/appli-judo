// =====================================================================
//  SYNTHÈSE ADMINISTRATEUR : inscrits et cotisations, commandes, bilan, financements.
//  Sources : fiches (localStorage "fiches"), demandes de kimono (localStorage "equipement"),
//  tarifs (cours-data.js). Les lignes du bilan et les financements sont saisis ici (localStorage "synthese").
// =====================================================================
const fiches = lireFiches();
const LICENCE = 46;            // part de la licence fédérale dans chaque cotisation (formulaire d'inscription)
const REDUC_FAMILLE = 40;      // réduction par adhérent à partir du 2ème d'une même famille

function lireSynthese() {
  try { const s = JSON.parse(localStorage.getItem("synthese")); if (s) { return { reductions: s.reductions || 0, lignes: s.lignes || [], financements: s.financements || [] }; } } catch (e) {}
  return { reductions: 0, lignes: [], financements: [] };
}
function ecrireSynthese() { try { localStorage.setItem("synthese", JSON.stringify(synthese)); } catch (e) {} }
let synthese = lireSynthese();
function euros(n) { return (Math.round(n * 100) / 100).toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €"; }
function ligneTable(table, cellules, classe) {
  const tr = creer("tr", classe || "");
  cellules.forEach(function (c) { tr.appendChild(creer(typeof c === "object" ? "th" : "td", "", typeof c === "object" ? c.t : String(c))); });
  table.appendChild(tr);
}
function tableau(entetes) {
  const t = creer("table", "tableau-cours tableau-synthese");
  const tete = creer("tr"); entetes.forEach(function (e) { tete.appendChild(creer("th", "", e)); });
  t.appendChild(creer("thead")).appendChild(tete);
  return t;
}
function dans(zone, table) { zone.innerHTML = ""; const c = creer("div", "tableau-conteneur"); c.appendChild(table); zone.appendChild(c); }

// ----- Cours d'un judoka : selon l'année de naissance (années du formulaire d'inscription du club) -----
function coursDe(f) {
  if (!f.naissance) { return null; }
  const an = Number(f.naissance.slice(0, 4));
  if (an >= 2021) { return "Baby judo"; }          // 2021 : « débutants » seulement ; les non-débutants vont chez les Mini-Poussins
  if (an >= 2019) { return "Mini-Poussins"; }
  if (an >= 2015) { return "Poussins / Benjamins"; }
  return "Ados / Adultes";
}

// ---------- 1. Inscrits ----------
let totalCotisations = 0, nbInscrits = 0;
function dessinerInscrits() {
  const zone = document.getElementById("inscrits");
  const parCours = {};
  TARIFS.forEach(function (t) { parCours[t.nom] = { tarif: t, n: 0, cats: {} }; });
  let sansDate = 0, an2021 = 0;
  fiches.forEach(function (f) {
    const c = coursDe(f);
    if (!c) { sansDate++; return; }
    parCours[c].n++;
    const cat = calculerCategorie(f.naissance);
    parCours[c].cats[cat] = (parCours[c].cats[cat] || 0) + 1;
    if (f.naissance.slice(0, 4) === "2021") { an2021++; }
  });
  const t = tableau(["Cours", "Inscrits", "Tarif", "Cotisations"]);
  totalCotisations = 0; nbInscrits = 0;
  TARIFS.forEach(function (tarif) {
    const p = parCours[tarif.nom];
    const montant = p.n * tarif.montant;
    totalCotisations += montant; nbInscrits += p.n;
    ligneTable(t, [tarif.nom, p.n, euros(tarif.montant), euros(montant)]);
  });
  ligneTable(t, [{ t: "Total brut" }, { t: String(nbInscrits) }, { t: "" }, { t: euros(totalCotisations) }]);
  dans(zone, t);

  // par tranche d'âge
  zone.appendChild(creer("h3", "", "Par tranche d'âge"));
  const t2 = tableau(["Catégorie", "Années", "Inscrits"]);
  categories.forEach(function (c) {
    const n = fiches.filter(function (f) { return f.naissance && calculerCategorie(f.naissance) === c.nom; }).length;
    ligneTable(t2, [c.nom, c.de <= 1900 ? c.a + " et avant" : (c.de === c.a ? c.a : c.de + "-" + c.a), n]);
  });
  const horsGrille = fiches.filter(function (f) { return f.naissance && calculerCategorie(f.naissance) === "Hors grille"; }).length;
  if (horsGrille) { ligneTable(t2, ["Hors grille", "—", horsGrille]); }
  const c2 = creer("div", "tableau-conteneur"); c2.appendChild(t2); zone.appendChild(c2);

  // réduction famille
  const lab = creer("label", "reduction");
  lab.appendChild(creer("span", "", "Réductions famille accordées (−" + REDUC_FAMILLE + " € par adhérent à partir du 2ème d'une famille)"));
  const inp = document.createElement("input");
  inp.type = "number"; inp.min = "0"; inp.step = "1"; inp.inputMode = "numeric"; inp.value = synthese.reductions;
  inp.addEventListener("input", function () { synthese.reductions = Math.max(0, Number(inp.value) || 0); ecrireSynthese(); dessinerBilan(); });
  lab.appendChild(inp);
  zone.appendChild(lab);
  const notes = [];
  if (sansDate) { notes.push(sansDate + " fiche(s) sans date de naissance non comptée(s)."); }
  if (an2021) { notes.push(an2021 + " enfant(s) né(s) en 2021 comptés en Baby judo ; les non-débutants relèvent des Mini-Poussins (le tarif est le même : 200 €)."); }
  notes.push("Les frères et sœurs ne sont pas repérés automatiquement : saisissez le nombre de réductions ci-dessus.");
  notes.forEach(function (n) { zone.appendChild(creer("p", "petit", n)); });
}

// ---------- 2. Commandes ----------
let coutCommandes = { min: 0, max: 0 };
function nombreFinal(texte) { const m = String(texte).match(/(\d+(?:[.,]\d+)?)\s*€\s*$/); return m ? Number(m[1].replace(",", ".")) : null; }
function dessinerCommandes() {
  const zone = document.getElementById("commandes");
  let demandes = [];
  try { demandes = JSON.parse(localStorage.getItem("equipement")) || []; } catch (e) {}
  const oui = demandes.filter(function (d) { return d.besoin === "oui"; });
  const peutEtre = demandes.filter(function (d) { return d.besoin === "peut-etre"; });
  let min = 0, max = 0, sansModele = 0, survet = 0, surMin = 0;
  oui.forEach(function (d) {
    const prix = (d.modeles || []).map(nombreFinal).filter(function (x) { return x !== null; });
    if (prix.length) { min += Math.min.apply(null, prix); max += Math.max.apply(null, prix); } else { sansModele++; }
  });
  demandes.forEach(function (d) {
    if (d.survetement) { survet++; surMin += ["M", "L", "XL", "XXL"].includes(d.survetement) ? 25 : 15; }
  });
  coutCommandes = { min: min + surMin, max: max + surMin };
  const t = tableau(["Commande", "Nombre", "Coût estimé"]);
  ligneTable(t, ["Kimonos pré-réservés (Oui)", oui.length, min === max ? euros(min) : euros(min) + " à " + euros(max)]);
  ligneTable(t, ["Kimonos « peut-être »", peutEtre.length, "non compté"]);
  ligneTable(t, ["Survêtements demandés", survet, euros(surMin)]);
  ligneTable(t, [{ t: "Total estimé" }, { t: String(oui.length + survet) }, { t: coutCommandes.min === coutCommandes.max ? euros(coutCommandes.min) : euros(coutCommandes.min) + " à " + euros(coutCommandes.max) }]);
  dans(zone, t);
  zone.appendChild(creer("p", "petit", "Quand plusieurs modèles sont cochés, le coût est donné en fourchette (modèle le moins cher → le plus cher)." + (sansModele ? " " + sansModele + " demande(s) « Oui » sans modèle coché ne sont pas chiffrées." : "") + " Prix de vente aux familles = prix du club : cette dépense est avancée par le club puis encaissée auprès des familles."));
  zone.appendChild(creer("p", "petit", demandes.length + " demande(s) enregistrée(s) sur cet appareil."));
}

// ---------- 3. Bilan ----------
function dessinerBilan() {
  const zone = document.getElementById("bilan");
  const somme = function (type) { return synthese.lignes.filter(function (l) { return l.type === type; }).reduce(function (s, l) { return s + l.montant; }, 0); };
  const benef = somme("benefice"), dons = somme("don"), dep = somme("depense");
  const recuFin = synthese.financements.filter(function (f) { return f.statut === "recu"; }).reduce(function (s, f) { return s + f.montant; }, 0);
  const reduc = synthese.reductions * REDUC_FAMILLE;
  const cotisNettes = totalCotisations - reduc;
  const licences = nbInscrits * LICENCE;
  const entrees = cotisNettes + benef + dons + recuFin;
  const sorties = licences + dep;
  const t = tableau(["Poste", "Montant"]);
  ligneTable(t, ["Cotisations (après réductions famille)", euros(cotisNettes)]);
  ligneTable(t, ["Bénéfices", euros(benef)]);
  ligneTable(t, ["Dons", euros(dons)]);
  ligneTable(t, ["Financements reçus", euros(recuFin)]);
  ligneTable(t, [{ t: "Total des entrées" }, { t: euros(entrees) }]);
  ligneTable(t, ["Licences à reverser (" + nbInscrits + " × " + LICENCE + " €)", "− " + euros(licences)]);
  ligneTable(t, ["Autres dépenses saisies", "− " + euros(dep)]);
  ligneTable(t, [{ t: "Total des sorties" }, { t: "− " + euros(sorties) }]);
  const solde = entrees - sorties;
  ligneTable(t, [{ t: "Solde" }, { t: euros(solde) }], solde < 0 ? "negatif" : "positif");
  dans(zone, t);
  const futur = synthese.financements.filter(function (f) { return f.statut !== "recu"; }).reduce(function (s, f) { return s + f.montant; }, 0);
  zone.appendChild(creer("p", "petit", "Non inclus : commandes d'équipement (neutres, refacturées aux familles)" + (futur ? " et " + euros(futur) + " de financements demandés ou accordés, pas encore reçus" : "") + ". Les cotisations sont comptées comme dues, pas comme encaissées."));
  // lignes saisies
  const liste = document.getElementById("l-liste"); liste.innerHTML = "";
  synthese.lignes.forEach(function (l, i) {
    const p = creer("div", "demande");
    p.appendChild(creer("p", "", { benefice: "Bénéfice", don: "Don", depense: "Dépense" }[l.type] + " · " + l.libelle + " · " + euros(l.montant)));
    const sup = creer("button", "bouton-annuler", "Supprimer"); sup.type = "button";
    sup.addEventListener("click", function () { synthese.lignes.splice(i, 1); ecrireSynthese(); dessinerBilan(); });
    const a = creer("div", "actions"); a.appendChild(sup); p.appendChild(a);
    liste.appendChild(p);
  });
}
document.getElementById("l-ajouter").addEventListener("click", function () {
  const montant = Number(document.getElementById("l-montant").value);
  const libelle = document.getElementById("l-libelle").value.trim();
  if (!libelle || !(montant > 0)) { return; }
  synthese.lignes.push({ type: document.getElementById("l-type").value, libelle: libelle, montant: montant });
  ecrireSynthese();
  document.getElementById("l-libelle").value = ""; document.getElementById("l-montant").value = "";
  dessinerBilan();
});

// ---------- 4. Financements ----------
const STATUTS = { demande: "Demandé", accorde: "Accordé", recu: "Reçu" };
function dessinerFinancements() {
  const zone = document.getElementById("financements");
  zone.innerHTML = "";
  if (!synthese.financements.length) { zone.appendChild(creer("p", "message-vide", "Aucun financement saisi pour l'instant.")); return; }
  const t = tableau(["Financeur", "Montant", "Statut"]);
  const tot = { demande: 0, accorde: 0, recu: 0 };
  synthese.financements.forEach(function (f) { tot[f.statut] += f.montant; });
  synthese.financements.forEach(function (f) { ligneTable(t, [(f.nom === f.type ? f.nom : f.nom + " (" + f.type + ")"), euros(f.montant), STATUTS[f.statut]]); });
  const c = creer("div", "tableau-conteneur"); c.appendChild(t); zone.appendChild(c);
  zone.appendChild(creer("p", "", "Reçu : " + euros(tot.recu) + " · Accordé (à recevoir) : " + euros(tot.accorde) + " · Demandé : " + euros(tot.demande)));
  synthese.financements.forEach(function (f, i) {
    const p = creer("div", "demande");
    p.appendChild(creer("p", "", f.nom));
    const a = creer("div", "actions");
    const suivant = { demande: "accorde", accorde: "recu" }[f.statut];
    if (suivant) {
      const b = creer("button", "bouton-annuler", "Passer en « " + STATUTS[suivant] + " »"); b.type = "button";
      b.addEventListener("click", function () { f.statut = suivant; ecrireSynthese(); dessinerFinancements(); dessinerBilan(); });
      a.appendChild(b);
    }
    const sup = creer("button", "bouton-annuler", "Supprimer"); sup.type = "button";
    sup.addEventListener("click", function () { synthese.financements.splice(i, 1); ecrireSynthese(); dessinerFinancements(); dessinerBilan(); });
    a.appendChild(sup); p.appendChild(a); zone.appendChild(p);
  });
}
document.getElementById("f-ajouter").addEventListener("click", function () {
  const montant = Number(document.getElementById("f-montant").value);
  const nom = document.getElementById("f-nom").value.trim();
  if (!nom || !(montant > 0)) { return; }
  synthese.financements.push({ type: document.getElementById("f-type").value, nom: nom, montant: montant, statut: document.getElementById("f-statut").value });
  ecrireSynthese();
  document.getElementById("f-nom").value = ""; document.getElementById("f-montant").value = "";
  dessinerFinancements(); dessinerBilan();
});

dessinerInscrits(); dessinerCommandes(); dessinerBilan(); dessinerFinancements();
