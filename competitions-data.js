// =====================================================================
//  DONNÉES DES COMPÉTITIONS  (saison 2026-2027)
//  Sources : récapitulatif par catégorie d'âges du comité du Rhône (au 22/09/2026), déclarations et
//  labels des manifestations de clubs 2026-2027, flyer des interclubs mini-poussins, tournois Label A
//  (au 25/08/2026) et Label Excellence (au 03/09/2026), calendrier France Judo Vétérans 2026-2027
//  (prévisionnel), informations passages de grades de la ligue AURA (mise à jour du 15/09/2026).
//  Chaque ligne : nom, debut (AAAA-MM-JJ), fin (ou null), lieu, infos, categories (mêmes noms que
//  judo-commun.js), type, serie (interclub, championnat, labelA, excellence, veterans, grade, officiels,
//  autres), region (facultatif : code de ligue, pour le filtre « Ligue AURA ») et aConfirmer (true/false).
// =====================================================================
const SAISON = "2026-2027";
const competitions = [
  {
    "nom": "Championnats du monde vétérans",
    "debut": "2026-09-20",
    "fin": "2026-09-24",
    "lieu": "Sarajevo (Bosnie-Herzégovine)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "Étranger",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-09-26",
    "fin": null,
    "lieu": "Lamballe (Bretagne)",
    "infos": "Tournoi labellisé. Ligue : Bretagne.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-09-26",
    "fin": null,
    "lieu": "Saint-Marcel (Bourgogne-Franche-Comté)",
    "infos": "Tournoi labellisé. Ligue : Bourgogne-Franche-Comté.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Juniors",
    "debut": "2026-09-27",
    "fin": null,
    "lieu": "Saint-Marcel (Bourgogne-Franche-Comté)",
    "infos": "Tournoi labellisé. Ligue : Bourgogne-Franche-Comté.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Seniors",
    "debut": "2026-09-27",
    "fin": null,
    "lieu": "Lamballe (Bretagne)",
    "infos": "Tournoi labellisé. Ligue : Bretagne.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-10-03",
    "fin": "2026-10-04",
    "lieu": "Noisy-le-Grand (Île-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Île-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-10-03",
    "fin": null,
    "lieu": "Contrexeville (Grand Est)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Grand Est.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-10-04",
    "fin": null,
    "lieu": "Contrexeville (Grand Est)",
    "infos": "Tournoi labellisé. Ligue : Grand Est.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-10-04",
    "fin": null,
    "lieu": "Bressuire (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-10-04",
    "fin": null,
    "lieu": "Tours (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Formation arbitrage – District",
    "debut": "2026-10-10",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Formation commissaire sportif – District",
    "debut": "2026-10-10",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Interclubs",
    "debut": "2026-10-10",
    "fin": null,
    "lieu": "Espace Jean Monnet, route de Ternay, 69360 Sérézin-du-Rhône",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Norbert Butin 07 82 70 63 03. Buvette, buffet et tombola sur place.",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Interclubs",
    "debut": "2026-10-10",
    "fin": null,
    "lieu": "Dojo Rhône Vivarais (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Passage de grade UV4 1er et 2e dan (engagement)",
    "debut": "2026-10-10",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Récapitulatif sportif du comité du Rhône (au 22/09/2026) : date de l'UV4 pour le 1er et 2e dan.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "serie": "grade",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-10-10",
    "fin": "2026-10-11",
    "lieu": "Le Luc (Provence-Alpes-Côte d'Azur)",
    "infos": "Tournoi labellisé. Ligue : Provence-Alpes-Côte d'Azur.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "PACA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2026-10-17",
    "fin": null,
    "lieu": "Ceyrat (Auvergne-Rhône-Alpes)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Auvergne-Rhône-Alpes.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "AURA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2026-10-17",
    "fin": null,
    "lieu": "Cormelles (Normandie)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Normandie.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NOR",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-10-18",
    "fin": null,
    "lieu": "Ceyrat (Auvergne-Rhône-Alpes)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Auvergne-Rhône-Alpes.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "AURA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-10-18",
    "fin": null,
    "lieu": "Cormelles (Normandie)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Normandie.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NOR",
    "aConfirmer": false
  },
  {
    "nom": "Stage sportif départemental Benjamins-Minimes-Cadets",
    "debut": "2026-10-19",
    "fin": "2026-10-20",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026).",
    "categories": [
      "Benjamin",
      "Minime",
      "Cadet"
    ],
    "type": "championnat",
    "serie": "stage",
    "aConfirmer": true
  },
  {
    "nom": "Championnats d'Europe vétérans",
    "debut": "2026-10-22",
    "fin": "2026-10-25",
    "lieu": "Portimão (Portugal)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "Étranger",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-10-24",
    "fin": null,
    "lieu": "Lormont (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-10-24",
    "fin": null,
    "lieu": "Nantes (Pays de la Loire)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Pays de la Loire.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-10-25",
    "fin": null,
    "lieu": "Troyes (Grand Est)",
    "infos": "Tournoi labellisé. Ligue : Grand Est.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-10-25",
    "fin": null,
    "lieu": "Lormont (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-10-31",
    "fin": null,
    "lieu": "Bourges (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-10-31",
    "fin": "2026-11-01",
    "lieu": "Saint-Ouen (Île-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Île-de-France.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2026-10-31",
    "fin": null,
    "lieu": "Tergnier (Hauts-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Hauts-de-France.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Seniors",
    "debut": "2026-11-01",
    "fin": null,
    "lieu": "Troyes (Grand Est)",
    "infos": "Tournoi labellisé. Ligue : Grand Est.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Interclubs",
    "debut": "2026-11-07",
    "fin": null,
    "lieu": "JC Murois (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-11-07",
    "fin": null,
    "lieu": "Saint-Grégoire (Bretagne)",
    "infos": "Tournoi labellisé. Ligue : Bretagne.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-11-07",
    "fin": null,
    "lieu": "Harnes (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Harnes (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Juniors",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Saint-Grégoire (Bretagne)",
    "infos": "Tournoi labellisé. Ligue : Bretagne.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Reims (Grand Est)",
    "infos": "Tournoi labellisé. Ligue : Grand Est.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Pontault-Combault (Île-de-France)",
    "infos": "Tournoi labellisé. Ligue : Île-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Besançon (Bourgogne-Franche-Comté)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Bourgogne-Franche-Comté.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2026-11-08",
    "fin": null,
    "lieu": "Normandie, ville à déterminer",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Normandie.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NOR",
    "aConfirmer": true
  },
  {
    "nom": "Jujitsu – District",
    "debut": "2026-11-09",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Kata – District",
    "debut": "2026-11-10",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Interclubs",
    "debut": "2026-11-14",
    "fin": null,
    "lieu": "Gymnase des Taillis, avenue des Taillis, 69960 Corbas (UJ Rhône)",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Alain L'Herbette 06 82 58 16 24. Buvette, buffet et tombola sur place.",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Vétérans – District",
    "debut": "2026-11-16",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "aConfirmer": true
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Cadets – District",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Formation arbitrage – Rhône",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Formation commissaire sportif – Rhône",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Minimes (individuel) – District",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Passage de grade UV4 2e dan (engagement)",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Récapitulatif sportif du comité du Rhône (au 22/09/2026) : date de l'UV4 pour le 2e dan.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "serie": "grade",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label A – Seniors féminines",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Verquin (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Forges-les-Eaux (Normandie)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Normandie.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NOR",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans de Fontaine (Grenoble) – Label Excellence",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Fontaine, Grenoble (Auvergne-Rhône-Alpes)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "AURA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans de Nantes – Label A",
    "debut": "2026-11-21",
    "fin": null,
    "lieu": "Nantes (Pays de la Loire)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Cadets 1ère division – Rhône",
    "debut": "2026-11-22",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-11-22",
    "fin": null,
    "lieu": "Istres (Provence-Alpes-Côte d'Azur)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Provence-Alpes-Côte d'Azur.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PACA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-11-22",
    "fin": null,
    "lieu": "Nantes (Pays de la Loire)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Pays de la Loire.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2026-11-22",
    "fin": null,
    "lieu": "Poitiers (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Passage de grade UV3 (shiai)",
    "debut": "2026-11-28",
    "fin": null,
    "lieu": "Halles des sports Fabrice Marchiol, avenue des Plantations, 38350 La Mure",
    "infos": "Grades : ceinture marron à 2e dan. Samedi : marron juniors/seniors/vétérans 8h00 ; noire juniors/seniors/vétérans et cadets 3 10h00 ; marron cadets 13h30. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard. Pour l'option 2 de l'UV3, la partie B se passe le dimanche avec les UV1 et UV2.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Seniors 1ère division – France",
    "debut": "2026-11-28",
    "fin": "2026-11-29",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Juniors",
    "debut": "2026-11-28",
    "fin": null,
    "lieu": "Montech (Occitanie)",
    "infos": "Tournoi labellisé. Ligue : Occitanie.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Passage de grade UV1 + UV2 (kata + technique)",
    "debut": "2026-11-29",
    "fin": null,
    "lieu": "Halles des sports Fabrice Marchiol, avenue des Plantations, 38350 La Mure",
    "infos": "Grades : ceinture marron à 3e dan. Dimanche : marron cadets 9h00 ; marron juniors/seniors/vétérans 13h00 (9h00 si le kata est présenté avec un cadet) ; noire juniors/seniors/vétérans et cadets 14h00. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-11-29",
    "fin": null,
    "lieu": "Montech (Occitanie)",
    "infos": "Tournoi labellisé. Ligue : Occitanie.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Interclubs",
    "debut": "2026-12-05",
    "fin": null,
    "lieu": "Gymnase Deslyres, rue du Stade, 69780 Saint-Pierre-de-Chandieu (notre club)",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Fabien Camuzet 06 74 94 41 98. Buvette, buffet et tombola sur place.",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2026-12-05",
    "fin": null,
    "lieu": "Nîmes (Occitanie)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Occitanie.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans d'Angers – Label Excellence",
    "debut": "2026-12-05",
    "fin": null,
    "lieu": "Angers (Pays de la Loire)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Équipes Benjamins – Rhône",
    "debut": "2026-12-05",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Benjamin"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Cadets – Rhône",
    "debut": "2026-12-06",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Minimes (individuel) – Rhône",
    "debut": "2026-12-06",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-12-06",
    "fin": null,
    "lieu": "Brétigny-sur-Orge (Île-de-France)",
    "infos": "Tournoi labellisé. Ligue : Île-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-12-06",
    "fin": null,
    "lieu": "Nîmes (Occitanie)",
    "infos": "Tournoi labellisé. Ligue : Occitanie.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-12-12",
    "fin": null,
    "lieu": "Lambersart (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Super Excellence – Cadets",
    "debut": "2026-12-12",
    "fin": null,
    "lieu": "Lormont (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Super Excellence – Juniors",
    "debut": "2026-12-13",
    "fin": null,
    "lieu": "Lormont (Nouvelle-Aquitaine)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Nouvelle-Aquitaine.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-12-19",
    "fin": null,
    "lieu": "Beaune (Bourgogne-Franche-Comté)",
    "infos": "Tournoi labellisé. Ligue : Bourgogne-Franche-Comté.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-12-19",
    "fin": null,
    "lieu": "Chartres (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2026-12-19",
    "fin": null,
    "lieu": "Toulouse (Occitanie)",
    "infos": "Tournoi labellisé. Ligue : Occitanie.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2026-12-20",
    "fin": null,
    "lieu": "Chartres (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets espoirs (1re année)",
    "debut": "2026-12-20",
    "fin": null,
    "lieu": "Toulouse (Occitanie)",
    "infos": "Tournoi labellisé. Ligue : Occitanie.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2027-01-09",
    "fin": null,
    "lieu": "Romans-sur-Isère (Auvergne-Rhône-Alpes)",
    "infos": "Tournoi labellisé. Ligue : Auvergne-Rhône-Alpes. La date indiquée dans le PDF porte l'année 2026 : lue comme 2027 (saison 2026-2027), à confirmer.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "AURA",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Juniors",
    "debut": "2027-01-10",
    "fin": null,
    "lieu": "Belfort (Bourgogne-Franche-Comté)",
    "infos": "Tournoi labellisé. Ligue : Bourgogne-Franche-Comté. La date indiquée dans le PDF porte l'année 2026 : lue comme 2027 (saison 2026-2027), à confirmer.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Vétérans – Rhône",
    "debut": "2027-01-11",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "aConfirmer": true
  },
  {
    "nom": "Kata – Rhône",
    "debut": "2027-01-12",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2027-01-16",
    "fin": null,
    "lieu": "Orléans (Centre-Val de Loire)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Centre-Val de Loire.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2027-01-17",
    "fin": null,
    "lieu": "Amiens (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Jujitsu – Rhône",
    "debut": "2027-01-18",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Benjamins (individuel) – District",
    "debut": "2027-01-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Benjamin"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Minimes – District",
    "debut": "2027-01-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Formation arbitrage – Inter-départemental",
    "debut": "2027-01-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Formation commissaire sportif – Inter-départemental",
    "debut": "2027-01-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "officiels",
    "aConfirmer": true
  },
  {
    "nom": "Passage de grade UV4 1er et 2e dan (engagement)",
    "debut": "2027-01-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Récapitulatif sportif du comité du Rhône (au 22/09/2026) : date de l'UV4 pour le 1er et 2e dan.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "serie": "grade",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2027-01-23",
    "fin": "2027-01-24",
    "lieu": "Bailly-Romainvilliers (Île-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Île-de-France.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans de Mouvaux – Label Super Excellence",
    "debut": "2027-01-23",
    "fin": "2027-01-24",
    "lieu": "Mouvaux (Hauts-de-France)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Cadets – Inter-départemental",
    "debut": "2027-01-24",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-01-24",
    "fin": null,
    "lieu": "USOL Vaugneray (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Juniors 1ère division – Inter-départemental",
    "debut": "2027-01-24",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Minimes (individuel) – Inter-départemental",
    "debut": "2027-01-24",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2027-01-24",
    "fin": null,
    "lieu": "Cesson-Sévigné (Bretagne)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Bretagne.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Cadets 1ère division – Inter-départemental",
    "debut": "2027-01-30",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-01-30",
    "fin": null,
    "lieu": "Delta Sport Brignais (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Circuit Minimes",
    "debut": "2027-01-31",
    "fin": null,
    "lieu": "Delta Sport Brignais",
    "infos": "Source : déclaration des manifestations clubs 2026-2027",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-02-06",
    "fin": null,
    "lieu": "Complexe sportif, rue Jean Rigaud, 69130 Écully",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Salvatore Amico 06 85 60 13 51. Buvette, buffet et tombola sur place.",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-02-06",
    "fin": null,
    "lieu": "JC Feyzin (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Cadets 1ère division – Ligue AURA",
    "debut": "2027-02-13",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Équipes mixtes Seniors 2ème div. – Ligue AURA",
    "debut": "2027-02-13",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Cadets – Ligue AURA",
    "debut": "2027-02-14",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Minimes (individuel) – Ligue AURA",
    "debut": "2027-02-14",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Minimes et cadets",
    "debut": "2027-02-14",
    "fin": null,
    "lieu": "Mouilleron-le-Captif (Pays de la Loire)",
    "infos": "Tournoi labellisé. Ligue : Pays de la Loire.",
    "categories": [
      "Minime",
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2027-02-14",
    "fin": null,
    "lieu": "Aix-en-Provence (Provence-Alpes-Côte d'Azur)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Provence-Alpes-Côte d'Azur.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PACA",
    "aConfirmer": false
  },
  {
    "nom": "Stage sportif départemental Benjamins-Minimes-Cadets",
    "debut": "2027-02-16",
    "fin": "2027-02-17",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026).",
    "categories": [
      "Benjamin",
      "Minime",
      "Cadet"
    ],
    "type": "championnat",
    "serie": "stage",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label A – Cadets espoirs (1re année)",
    "debut": "2027-02-20",
    "fin": null,
    "lieu": "Orléans (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2027-02-21",
    "fin": null,
    "lieu": "Orléans (Centre-Val de Loire)",
    "infos": "Tournoi labellisé. Ligue : Centre-Val de Loire.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2027-02-21",
    "fin": null,
    "lieu": "Amiens (Hauts-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Hauts-de-France.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2027-02-21",
    "fin": null,
    "lieu": "Saint-Gratien (Île-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Île-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi international vétérans BFC, Besançon – Label Excellence",
    "debut": "2027-02-21",
    "fin": null,
    "lieu": "Besançon (Bourgogne-Franche-Comté)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "BFC",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de clubs Seniors genrées 1ère div. – Ligue AURA",
    "debut": "2027-02-21",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Passage de grade UV3 (shiai)",
    "debut": "2027-02-27",
    "fin": null,
    "lieu": "Arténium, 4 parc de l'Artière, 63122 Ceyrat",
    "infos": "Grades : ceinture marron à 3e dan. Samedi : marron juniors/seniors/vétérans 8h00 ; noire juniors/seniors/vétérans et cadets 3 10h00 ; marron cadets 13h30. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard. Pour l'option 2 de l'UV3, la partie B se passe le dimanche avec les UV1 et UV2.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Tournoi vétérans d'Elven (Vannes) – Label A",
    "debut": "2027-02-27",
    "fin": null,
    "lieu": "Elven, Vannes (Bretagne)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "BRE",
    "aConfirmer": false
  },
  {
    "nom": "Jujitsu – Inter-départemental",
    "debut": "2027-03-01",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label A – Seniors équipes mixtes",
    "debut": "2027-03-03",
    "fin": null,
    "lieu": "Sainghin-en-Mélantois (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Cadets 1ère division – France",
    "debut": "2027-03-05",
    "fin": "2027-03-06",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Benjamins (individuel) – Rhône",
    "debut": "2027-03-06",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Benjamin"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Minimes – Rhône",
    "debut": "2027-03-06",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Cadets 2ème/3ème division – Rhône",
    "debut": "2027-03-07",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Vétérans – Inter-départemental",
    "debut": "2027-03-08",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "aConfirmer": true
  },
  {
    "nom": "Kata – Inter-départemental",
    "debut": "2027-03-09",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Cadets Espoirs – Ligue AURA",
    "debut": "2027-03-13",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-03-13",
    "fin": null,
    "lieu": "JC Saint-Priest (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi de France vétérans par équipes mixtes",
    "debut": "2027-03-13",
    "fin": null,
    "lieu": "Ozoir-la-Ferrière (Île-de-France)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Juniors 1ère division – Ligue AURA",
    "debut": "2027-03-14",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2027-03-14",
    "fin": null,
    "lieu": "Saint-Raphaël (Provence-Alpes-Côte d'Azur)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Provence-Alpes-Côte d'Azur.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PACA",
    "aConfirmer": false
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Cadets – France",
    "debut": "2027-03-20",
    "fin": "2027-03-21",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-03-20",
    "fin": null,
    "lieu": "Salle polyvalente de la Plaine, route de Marennes, 69360 Communay",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Fabien Camuzet 06 74 94 41 98. Buvette, buffet et tombola sur place.",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-03-20",
    "fin": null,
    "lieu": "AL Caluire (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Minimes (individuel) – France",
    "debut": "2027-03-20",
    "fin": "2027-03-21",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Passage de grade UV3 (shiai)",
    "debut": "2027-03-20",
    "fin": null,
    "lieu": "Dojo, angle rue Molière et rue Colette, 42160 Andrézieux-Bouthéon",
    "infos": "Grades : ceinture marron à 2e dan. Samedi : marron juniors/seniors/vétérans 8h00 ; noire juniors/seniors/vétérans et cadets 3 10h00 ; marron cadets 13h30. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard. Pour l'option 2 de l'UV3, la partie B se passe le dimanche avec les UV1 et UV2.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Passage de grade UV1 + UV2 (kata + technique)",
    "debut": "2027-03-21",
    "fin": null,
    "lieu": "Dojo, angle rue Molière et rue Colette, 42160 Andrézieux-Bouthéon",
    "infos": "Grades : ceinture marron à 3e dan. Dimanche : marron cadets 9h00 ; marron juniors/seniors/vétérans 13h00 (9h00 si le kata est présenté avec un cadet) ; noire juniors/seniors/vétérans et cadets 14h00. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Juniors 1ère division – France",
    "debut": "2027-03-27",
    "fin": "2027-03-28",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Seniors",
    "debut": "2027-03-27",
    "fin": null,
    "lieu": "Marnaval (Grand Est)",
    "infos": "Tournoi labellisé. Ligue : Grand Est.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans de Lormont (Master international des Vignobles du Médoc et du Bordelais) – Label Excellence",
    "debut": "2027-03-28",
    "fin": null,
    "lieu": "Lormont (Nouvelle-Aquitaine)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "NA",
    "aConfirmer": false
  },
  {
    "nom": "Benjamins (individuel) – Inter-départemental",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Benjamin"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Minimes – Inter-départemental",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "AL Vaulx-en-Velin (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "Salle polyvalente, boulevard des Allées, 69420 Ampuis",
    "infos": "Horaires pour les judokas nés en 2021 : 9h00 · 2020 : 10h00 · 2019 : 11h00 (fin prévue 10h, 11h, 12h). Autres catégories : horaires à confirmer. Contact : Fabien Camuzet 06 74 94 41 98. Buvette, buffet et tombola sur place.",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin",
      "Minime",
      "Cadet",
      "Junior",
      "Senior"
    ],
    "type": "interclub",
    "aConfirmer": false,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "Wasquehal (Hauts-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Hauts-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de clubs Minimes – Inter-départemental",
    "debut": "2027-04-03",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-04-04",
    "fin": null,
    "lieu": "EJT Montagny (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Baby judo",
      "Mini-Poussin"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi vétérans de Savoie – Label A",
    "debut": "2027-04-04",
    "fin": null,
    "lieu": "Savoie (Auvergne-Rhône-Alpes)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "AURA",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de clubs Cadets – Ligue AURA",
    "debut": "2027-04-04",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Équipes mixtes Seniors 2ème div. – France",
    "debut": "2027-04-04",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Équipes de clubs Juniors – Ligue AURA",
    "debut": "2027-04-10",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Seniors 2ème division – Rhône",
    "debut": "2027-04-11",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Seniors 3ème division – Rhône",
    "debut": "2027-04-11",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2027-04-11",
    "fin": null,
    "lieu": "Le Mans (Pays de la Loire)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Pays de la Loire.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Stage sportif départemental Benjamins-Minimes-Cadets",
    "debut": "2027-04-12",
    "fin": "2027-04-14",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026).",
    "categories": [
      "Benjamin",
      "Minime",
      "Cadet"
    ],
    "type": "championnat",
    "serie": "stage",
    "aConfirmer": true
  },
  {
    "nom": "Master de Tours vétérans – Label Excellence",
    "debut": "2027-04-17",
    "fin": null,
    "lieu": "Tours (Centre-Val de Loire)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "CVL",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de départements Minimes – France",
    "debut": "2027-04-17",
    "fin": "2027-04-18",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Minimes",
    "debut": "2027-04-18",
    "fin": null,
    "lieu": "Maubeuge (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label A – Cadets",
    "debut": "2027-04-19",
    "fin": null,
    "lieu": "Maubeuge (Hauts-de-France)",
    "infos": "Tournoi labellisé. Ligue : Hauts-de-France.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Seniors 2ème division – Ligue AURA",
    "debut": "2027-04-25",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Seniors 3ème division – Ligue AURA",
    "debut": "2027-04-25",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label A – Cadets espoirs (1re année)",
    "debut": "2027-04-25",
    "fin": null,
    "lieu": "Brétigny-sur-Orge (Île-de-France)",
    "infos": "Tournoi labellisé. Ligue : Île-de-France. La date indiquée dans le PDF porte l'année 2026 : lue comme 2027 (saison 2026-2027), à confirmer.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "labelA",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi vétérans de Gérardmer – Label Excellence",
    "debut": "2027-05-01",
    "fin": null,
    "lieu": "Gérardmer (Grand Est)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "GRE",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de clubs Cadets – France",
    "debut": "2027-05-01",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Équipes de clubs Seniors genrées 1ère div. – France",
    "debut": "2027-05-02",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Master d'Artagnan vétérans, Auch – Label Excellence",
    "debut": "2027-05-08",
    "fin": null,
    "lieu": "Auch (Occitanie)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "OCC",
    "aConfirmer": false
  },
  {
    "nom": "Tournoi Label Excellence – Juniors",
    "debut": "2027-05-08",
    "fin": null,
    "lieu": "La Roche-sur-Yon (Pays de la Loire)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Pays de la Loire.",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "PDL",
    "aConfirmer": false
  },
  {
    "nom": "Cadets 2ème/3ème division – Ligue AURA",
    "debut": "2027-05-15",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Interclubs",
    "debut": "2027-05-15",
    "fin": null,
    "lieu": "AL Chaponost (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Tournoi vétérans de Provence – Label Excellence",
    "debut": "2027-05-15",
    "fin": null,
    "lieu": "Provence (Provence-Alpes-Côte d'Azur)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles. Date à confirmer.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "PACA",
    "aConfirmer": true
  },
  {
    "nom": "Équipes de clubs Minimes – Ligue AURA",
    "debut": "2027-05-15",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Équipes mixtes Seniors 1ère div. Pro League – France",
    "debut": "2027-05-15",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi Label Excellence – Cadets",
    "debut": "2027-05-16",
    "fin": null,
    "lieu": "Comité 92 (Hauts-de-Seine), ville à déterminer",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Île-de-France.",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "IDF",
    "aConfirmer": true
  },
  {
    "nom": "Tournoi Label Excellence – Seniors",
    "debut": "2027-05-16",
    "fin": null,
    "lieu": "Tergnier (Hauts-de-France)",
    "infos": "Tournoi labellisé – pris en compte pour la qualification au championnat de France 1re division. Ligue : Hauts-de-France.",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "serie": "excellence",
    "region": "HDF",
    "aConfirmer": false
  },
  {
    "nom": "Équipes de clubs Juniors – France",
    "debut": "2027-05-22",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Junior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Benjamins (individuel) – Ligue AURA",
    "debut": "2027-05-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Benjamin"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Coupe jeunes arbitres + commissaires sportifs Minimes – Ligue AURA",
    "debut": "2027-05-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Minime"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "officiels"
  },
  {
    "nom": "Seniors 3ème division – France",
    "debut": "2027-05-23",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Cadets 2ème/3ème division – France",
    "debut": "2027-05-29",
    "fin": "2027-05-30",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Tournoi des Vikings vétérans, Gonfreville-l'Orcher (Le Havre) – Label A",
    "debut": "2027-05-29",
    "fin": null,
    "lieu": "Gonfreville-l'Orcher, Le Havre (Normandie)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "NOR",
    "aConfirmer": false
  },
  {
    "nom": "Cadets Espoirs – France",
    "debut": "2027-05-30",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Cadet"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Jujitsu – Ligue AURA",
    "debut": "2027-05-31",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Kata – Ligue AURA",
    "debut": "2027-06-01",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [],
    "type": "championnat",
    "serie": "autres",
    "aConfirmer": true
  },
  {
    "nom": "Seniors 2ème division – France",
    "debut": "2027-06-05",
    "fin": "2027-06-06",
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026)",
    "categories": [
      "Senior"
    ],
    "type": "championnat",
    "aConfirmer": true,
    "serie": "championnat"
  },
  {
    "nom": "Vétérans – Ligue AURA",
    "debut": "2027-06-07",
    "fin": null,
    "lieu": "Lieu à confirmer",
    "infos": "Source : récapitulatif sportif du comité du Rhône (au 22/09/2026). Public concerné non précisé : voir le comité.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "aConfirmer": true
  },
  {
    "nom": "Championnats de France vétérans",
    "debut": "2027-06-12",
    "fin": "2027-06-13",
    "lieu": "Villebon-sur-Yvette (Île-de-France)",
    "infos": "Calendrier France Judo Vétérans 2026-2027, communiqué à titre prévisionnel : les dates peuvent changer selon la validation des salles.",
    "categories": [
      "Vétéran"
    ],
    "type": "championnat",
    "serie": "veterans",
    "region": "IDF",
    "aConfirmer": false
  },
  {
    "nom": "Interclubs",
    "debut": "2027-06-12",
    "fin": null,
    "lieu": "ACLAM Mornant (adresse du gymnase à confirmer)",
    "infos": "Combats debout pour tous · horaires et adresse du gymnase à confirmer",
    "categories": [
      "Baby judo",
      "Mini-Poussin",
      "Poussin",
      "Benjamin"
    ],
    "type": "interclub",
    "aConfirmer": true,
    "serie": "interclub"
  },
  {
    "nom": "Passage de grade UV3 (shiai)",
    "debut": "2027-06-19",
    "fin": null,
    "lieu": "Gymnase intercommunal, 1060 route de Charlemagne, 01380 Bâgé-Dommartin",
    "infos": "Grades : ceinture marron à 2e dan. Samedi : marron juniors/seniors/vétérans 8h00 ; noire juniors/seniors/vétérans et cadets 3 10h00 ; marron cadets 13h30. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard. Pour l'option 2 de l'UV3, la partie B se passe le dimanche avec les UV1 et UV2.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  },
  {
    "nom": "Passage de grade UV1 + UV2 (kata + technique)",
    "debut": "2027-06-20",
    "fin": null,
    "lieu": "Gymnase intercommunal, 1060 route de Charlemagne, 01380 Bâgé-Dommartin",
    "infos": "Grades : ceinture marron à 3e dan. Dimanche : marron cadets 9h00 ; marron juniors/seniors/vétérans 13h00 (9h00 si le kata est présenté avec un cadet) ; noire juniors/seniors/vétérans et cadets 14h00. Inscription sur l'extranet 1 mois avant (5 € pour certaines UV) ; judogi blanc sans dossard.",
    "categories": [
      "Cadet",
      "Junior",
      "Senior",
      "Vétéran"
    ],
    "type": "grade",
    "aConfirmer": false,
    "serie": "grade"
  }
];
