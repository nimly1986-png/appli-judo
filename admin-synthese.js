// =====================================================================
//  SYNTHÈSE ADMINISTRATEUR : inscrits et cotisations, commandes, bilan, financements.
//  Sources : fiches (localStorage "fiches"), demandes de kimono (localStorage "equipement"),
//  tarifs (cours-data.js). Les lignes du bilan et les financements sont saisis ici (localStorage "synthese").
// =====================================================================
const fiches = lireFiches();
const LICENCE = 46;            // part de la licence fédérale dans chaque cotisation (formulaire d'inscription)

// Version 2 (nov. 2026) : le bilan repart de zéro. Les lignes et financements saisis avant sont effacés une seule fois.
const VERSION_SYNTHESE = 2;
function lireSynthese() {
  try {
    const s = JSON.parse(localStorage.getItem("synthese"));
    if (s && s.version === VERSION_SYNTHESE) { return { version: VERSION_SYNTHESE, lignes: s.lignes || [], financements: s.financements || [] }; }
  } catch (e) {}
  const vide = { version: VERSION_SYNTHESE, lignes: [], financements: [] };
  try { localStorage.setItem("synthese", JSON.stringify(vide)); } catch (e) {}
  return vide;
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
// Chaque judoka compte pour la cotisation réellement fixée sur sa fiche (famille, réduction bureau, Pass'Sport...) ;
// à défaut, pour le tarif de son cours.
const NOM_COURS_TARIF = { "Baby Judo": "Baby judo", "Mini-Poussins": "Mini-Poussins", "Poussins Benjamins": "Poussins / Benjamins", "Ados Adultes": "Ados / Adultes" };
function coursReel(f) { return NOM_COURS_TARIF[f.cours] || coursDe(f); }
function tarifDe(f) { const t = TARIFS.find(function (x) { return x.nom === coursReel(f); }); return t ? t.montant : 0; }
function dueDe(f) { return typeof f.cotisation === "number" ? f.cotisation : tarifDe(f); }
let totalCotisations = 0, totalEncaisse = 0, nbInscrits = 0;
function dessinerInscrits() {
  const zone = document.getElementById("inscrits");
  const parCours = {};
  TARIFS.forEach(function (t) { parCours[t.nom] = { tarif: t, n: 0, du: 0, recu: 0, brut: 0 }; });
  let sansDate = 0;
  fiches.forEach(function (f) {
    const c = coursReel(f);
    if (!c) { sansDate++; return; }
    const p = parCours[c]; p.n++;
    p.du += dueDe(f); p.brut += tarifDe(f);
    if (reglementRecu(f)) { p.recu += dueDe(f); }
  });
  const t = tableau(["Cours", "Inscrits", "Tarif plein", "Dû", "Encaissé"]);
  totalCotisations = 0; totalEncaisse = 0; nbInscrits = 0;
  let brutTotal = 0;
  TARIFS.forEach(function (tarif) {
    const p = parCours[tarif.nom];
    totalCotisations += p.du; totalEncaisse += p.recu; nbInscrits += p.n; brutTotal += p.brut;
    ligneTable(t, [tarif.nom, p.n, euros(tarif.montant), euros(p.du), euros(p.recu)]);
  });
  ligneTable(t, [{ t: "Total" }, { t: String(nbInscrits) }, { t: "" }, { t: euros(totalCotisations) }, { t: euros(totalEncaisse) }]);
  dans(zone, t);

  // règlement et pièces du dossier
  zone.appendChild(creer("h3", "", "Règlement et pièces"));
  const reglesN = fiches.filter(reglementRecu).length;
  const certMed = fiches.filter(function (f) { return f.certificatMedical; }).length;
  const attest = fiches.filter(function (f) { return f.certificat && !f.certificatMedical; }).length;
  const sans = fiches.filter(function (f) { return !f.certificat; }).length;
  const t3 = tableau(["", "Judokas"]);
  ligneTable(t3, ["Ont réglé leur cotisation", reglesN + " sur " + fiches.length]);
  ligneTable(t3, ["Règlement à recevoir", fiches.length - reglesN + " (" + euros(totalCotisations - totalEncaisse) + ")"]);
  ligneTable(t3, ["Certificat médical fourni", certMed]);
  ligneTable(t3, ["Attestation sur l'honneur (sans certificat)", attest]);
  ligneTable(t3, ["Ni certificat ni attestation", sans]);
  dans_ajout(zone, t3);

  // réductions : calculées d'après le prix réellement fixé sur chaque fiche
  zone.appendChild(creer("h3", "", "Réductions (famille, bureau…)"));
  const reduits = fiches.filter(function (f) { return dueDe(f) < tarifDe(f); });
  const montantReduc = brutTotal - totalCotisations;
  const t4 = tableau(["", "Valeur"]);
  ligneTable(t4, ["Judokas qui paient moins que le tarif plein", reduits.length]);
  ligneTable(t4, ["Total des réductions", euros(Math.max(0, montantReduc))]);
  const familles = {}; fiches.forEach(function (f) { const k = sansAccentsDe(f.nom); familles[k] = (familles[k] || 0) + 1; });
  ligneTable(t4, ["Familles avec plusieurs judokas", Object.keys(familles).filter(function (k) { return familles[k] > 1; }).length]);
  dans_ajout(zone, t4);
  const notes = [];
  if (sansDate) { notes.push(sansDate + " fiche(s) sans date de naissance non comptée(s)."); }
  const sansPrix = fiches.filter(function (f) { return typeof f.cotisation !== "number"; }).length;
  if (sansPrix) { notes.push(sansPrix + " fiche(s) sans cotisation saisie : comptées au tarif plein de leur cours."); }
  notes.push("Le prix de chaque judoka est celui de sa fiche (champ « Cotisation »), donc une famille avec réduction paie moins que le tarif plein. « Encaissé » = fiches dont le règlement est marqué reçu.");
  notes.forEach(function (n) { zone.appendChild(creer("p", "petit", n)); });
}
function sansAccentsDe(t) { return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(); }
function dans_ajout(zone, table) { const c = creer("div", "tableau-conteneur"); c.appendChild(table); zone.appendChild(c); }

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
  const licences = nbInscrits * LICENCE;
  const entrees = totalEncaisse + benef + dons + recuFin;
  const sorties = licences + dep;
  const t = tableau(["Poste", "Montant"]);
  ligneTable(t, ["Cotisations encaissées (prix réel de chaque fiche)", euros(totalEncaisse)]);
  ligneTable(t, ["Bénéfices", euros(benef)]);
  ligneTable(t, ["Dons", euros(dons)]);
  ligneTable(t, ["Financements reçus", euros(recuFin)]);
  ligneTable(t, [{ t: "Total des entrées" }, { t: euros(entrees) }]);
  ligneTable(t, ["Licences à reverser (" + nbInscrits + " × " + LICENCE + " €)", "− " + euros(licences)]);
  ligneTable(t, ["Autres dépenses saisies", "− " + euros(dep)]);
  ligneTable(t, [{ t: "Total des sorties" }, { t: "− " + euros(sorties) }]);
  const solde = entrees - sorties;
  ligneTable(t, [{ t: "Solde" }, { t: euros(solde) }], solde < 0 ? "negatif" : "positif");
  ligneTable(t, ["Solde si toutes les cotisations dues sont encaissées (+ " + euros(totalCotisations - totalEncaisse) + ")", euros(solde + totalCotisations - totalEncaisse)]);
  dans(zone, t);
  const futur = synthese.financements.filter(function (f) { return f.statut !== "recu"; }).reduce(function (s, f) { return s + f.montant; }, 0);
  zone.appendChild(creer("p", "petit", "Non inclus : commandes d'équipement (neutres, refacturées aux familles)" + (futur ? " et " + euros(futur) + " de financements demandés ou accordés, pas encore reçus" : "") + ". Seules les cotisations dont le règlement est marqué reçu sont comptées en entrées."));
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

// ----- une seule rubrique à la fois, choisie dans la page Financier (?v=bilan, inscrits, commandes, financements) -----
(function () {
  const v = new URLSearchParams(location.search).get("v");
  const titres = { bilan: "📈 Bilan", inscrits: "👥 Inscrits et cotisations", commandes: "🥋 Commandes", financements: "🏛️ Financements" };
  if (!titres[v]) { return; }
  ["bilan", "inscrits", "commandes", "financements"].forEach(function (s) { document.getElementById("s-" + s).hidden = s !== v; });
  document.getElementById("titre").textContent = titres[v];
  document.querySelectorAll("section h2").forEach(function (h) { h.hidden = true; });
})();
