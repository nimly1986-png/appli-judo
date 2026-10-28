// =====================================================================
//  PLANNING DES COURS (modifiable à la main, sans toucher au reste du code)
//  Chaque ligne : jour, debut, fin, nom du cours, categories concernées.
//  Les noms de catégories sont ceux de judo-commun.js : Baby judo, Mini-Poussin, Poussin,
//  Benjamin, Minime, Cadet, Junior, Senior, et "Vétéran" (30 ans et plus).
//  Horaires et tarifs : d'après le formulaire d'inscription officiel du club.
// =====================================================================
const JOURS_COURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const COURS = [
  { jour: "Mardi", debut: "17h", fin: "18h", nom: "Baby judo", public: "Enfants nés en 2023 (avant le 30/06), 2022, et 2021 débutants", categories: ["Baby judo"] },
  { jour: "Jeudi", debut: "17h", fin: "18h", nom: "Mini-Poussins", court: "Mini-P.", public: "Enfants nés en 2021 non débutants, 2020 et 2019", categories: ["Mini-Poussin"] },
  { jour: "Mardi", debut: "18h", fin: "19h", nom: "Poussins / Benjamins", court: "Pouss. Benj.", public: "Enfants nés en 2018, 2017, 2016 et 2015", categories: ["Poussin", "Benjamin"] },
  { jour: "Jeudi", debut: "18h", fin: "19h", nom: "Poussins / Benjamins", court: "Pouss. Benj.", public: "Enfants nés en 2018, 2017, 2016 et 2015", categories: ["Poussin", "Benjamin"] },
  { jour: "Mardi", debut: "19h", fin: "20h30", nom: "Ados / Adultes", court: "Ados Adultes", public: "À partir de Minimes : nés en 2014 et avant", categories: ["Minime", "Cadet", "Junior", "Senior", "Vétéran"] },
  { jour: "Jeudi", debut: "19h", fin: "20h30", nom: "Ados / Adultes", court: "Ados Adultes", public: "À partir de Minimes : nés en 2014 et avant", categories: ["Minime", "Cadet", "Junior", "Senior", "Vétéran"] }
];

// =====================================================================
//  TARIFS DES COURS (à compléter par le club : "montant: null" s'affiche "À confirmer")
//  Chaque ligne : nom, categories concernées, montant (en euros par saison, ou null), details.
//  Ne mettez que des montants officiels du club : cette page est publique.
// =====================================================================
const SAISON_TARIFS = "2026-2027";
const TARIFS = [
  { nom: "Baby judo", public: "Mardi 17h-18h · nés en 2023 (avant le 30/06), 2022, 2021 débutants", categories: ["Baby judo"], montant: 200, details: "cotisation 154 € + licence 46 €" },
  { nom: "Mini-Poussins", court: "Mini-P.", public: "Jeudi 17h-18h · nés en 2021 non débutants, 2020, 2019", categories: ["Mini-Poussin"], montant: 200, details: "cotisation 154 € + licence 46 €" },
  { nom: "Poussins / Benjamins", court: "Pouss. Benj.", public: "Mardi et jeudi 18h-19h · nés en 2018 à 2015", categories: ["Poussin", "Benjamin"], montant: 220, details: "cotisation 174 € + licence 46 €" },
  { nom: "Ados / Adultes", court: "Ados Adultes", public: "Mardi et jeudi 19h-20h30 · nés en 2014 et avant", categories: ["Minime", "Cadet", "Junior", "Senior", "Vétéran"], montant: 230, details: "cotisation 184 € + licence 46 €" }
];
// Ce que le tarif comprend (licence, assurance...) et facilités de paiement : à renseigner par le club.
const TARIFS_INFOS = ["Réduction famille (parent, enfant, fratrie, conjoint) : 40 € par adhérent à partir du 2ème adhérent."];

// =====================================================================
//  KIMONOS EN VENTE AU CLUB (Mizuno) : modèle, public, tailles (en cm), prix de vente en euros.
// =====================================================================
const KIMONOS = [
  { modele: "SHIRO PLUS", public: "Junior", taille: "90 à 150", prix: 30 },
  { modele: "KODOMO PLUS", public: "Junior", taille: "110 à 150", prix: 38 },
  { modele: "KODOMO PLUS", public: "Adulte", taille: "160 à 200", prix: 45 },
  { modele: "HAYATO", public: "Junior", taille: "130 à 160", prix: 55 },
  { modele: "HAYATO", public: "Adulte", taille: "170 à 200", prix: 70 },
  { modele: "KEIKO", public: "Adulte", taille: "170 à 200", prix: 90 },
  { modele: "YUSHO", public: "Adulte", taille: "tailles japonaises", prix: 140 }
];
