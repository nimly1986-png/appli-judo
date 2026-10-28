// =====================================================================
//  ÉQUIPEMENT (kimono) : pré-réservation pour la saison suivante.
//  À renseigner par le club :
//   - CLUB_EMAIL : adresse qui reçoit les demandes (laisser "" tant qu'elle n'est pas choisie)
//   - DATE_LIMITE : date limite de réponse, au format "AAAA-MM-JJ" (ou "" si aucune)
//  Ce fichier est public : n'y mettez qu'une adresse e-mail du club prévue pour cet usage.
// =====================================================================
const CLUB_EMAIL = "";
const DATE_LIMITE = "";
const SAISON_SUIVANTE = "2027-2028";
const TAILLES_KIMONO = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

// Survêtements du club (anciens, avec le logo) : stock limité, tailles restantes et prix en euros.
const SURVETEMENTS = [
  { taille: "8/9 ans", public: "Enfant", prix: 15 },
  { taille: "12/13 ans", public: "Enfant", prix: 15 },
  { taille: "M à XXL", public: "Adulte", prix: 25 }
];
const TAILLES_SURVETEMENT = ["8/9 ans", "12/13 ans", "M", "L", "XL", "XXL"];
