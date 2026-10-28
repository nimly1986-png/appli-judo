// =====================================================================
//  PLANNING DES COURS (modifiable à la main, sans toucher au reste du code)
//  Chaque ligne : jour, debut, fin, nom du cours, categories concernées.
//  Les noms de catégories sont ceux de judo-commun.js : Baby judo, Mini-Poussin, Poussin,
//  Benjamin, Minime, Cadet, Junior, Senior, et "Vétéran" (30 ans et plus).
//  À VÉRIFIER avec le professeur : quelle catégorie va dans quel cours.
// =====================================================================
const JOURS_COURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const COURS = [
  { jour: "Mardi", debut: "17h", fin: "18h", nom: "Baby judo", categories: ["Baby judo"] },
  { jour: "Mardi", debut: "18h", fin: "19h", nom: "Cours enfants", categories: ["Mini-Poussin", "Poussin", "Benjamin", "Minime", "Cadet"] },
  { jour: "Mardi", debut: "19h", fin: "20h30", nom: "Cours adultes", categories: ["Junior", "Senior", "Vétéran"] },
  { jour: "Jeudi", debut: "17h", fin: "18h", nom: "Baby judo", categories: ["Baby judo"] },
  { jour: "Jeudi", debut: "18h", fin: "19h", nom: "Cours enfants", categories: ["Mini-Poussin", "Poussin", "Benjamin", "Minime", "Cadet"] },
  { jour: "Jeudi", debut: "19h", fin: "20h30", nom: "Cours adultes", categories: ["Junior", "Senior", "Vétéran"] }
];

// =====================================================================
//  TARIFS DES COURS (à compléter par le club : "montant: null" s'affiche "À confirmer")
//  Chaque ligne : nom, categories concernées, montant (en euros par saison, ou null), details.
//  Ne mettez que des montants officiels du club : cette page est publique.
// =====================================================================
const SAISON_TARIFS = "2026-2027";
const TARIFS = [
  { nom: "Baby judo", categories: ["Baby judo"], montant: null, details: "" },
  { nom: "Enfants", categories: ["Mini-Poussin", "Poussin", "Benjamin", "Minime", "Cadet"], montant: null, details: "" },
  { nom: "Adultes", categories: ["Junior", "Senior", "Vétéran"], montant: null, details: "" }
];
// Ce que le tarif comprend (licence, assurance...) et facilités de paiement : à renseigner par le club.
const TARIFS_INFOS = [];
