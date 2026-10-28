// =====================================================================
//  DONNÉES DES COMPÉTITIONS  (saison 2025-2026, recopiées des calendriers du club)
//  Pour une nouvelle saison : remplacer le contenu de la liste "competitions".
//  Chaque ligne : nom, debut (AAAA-MM-JJ), fin (ou null), lieu, infos,
//  categories (les mêmes noms que dans judo-commun.js), type ("championnat" ou "interclub").
//  "Vétéran" : s'applique aux judokas de 30 ans et plus.
// =====================================================================
const SAISON = "2025-2026";
const competitions = [
 {
  "nom": "Tournoi vétérans Aura Label Excellence",
  "debut": "2025-10-05",
  "fin": null,
  "lieu": "Tremblay / 93",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": ""
 },
 {
  "nom": "Interclubs",
  "debut": "2025-10-11",
  "fin": null,
  "lieu": "Serézin (Espace Jean Monnet - 5 route de Ternay)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Ligue Aura équipes",
  "debut": "2025-10-12",
  "fin": null,
  "lieu": "Ceyrat / 63",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi Excellence",
  "debut": "2025-10-18",
  "fin": null,
  "lieu": "Clermont Ferrand / 63",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi Excellence",
  "debut": "2025-10-19",
  "fin": null,
  "lieu": "Clermont Ferrand / 63",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2025-10-25",
  "fin": null,
  "lieu": "Privas / 07",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi vétérans Aura Label B",
  "debut": "2025-10-26",
  "fin": null,
  "lieu": "Bourg en Bresse / 01",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": ""
 },
 {
  "nom": "Championnat du Monde Vétérans",
  "debut": "2025-11-03",
  "fin": "2025-11-07",
  "lieu": "Dojo de Paris / 75",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2025-11-08",
  "fin": null,
  "lieu": "Corbas (Gymnase des Taillis - Avenue des Taillis)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-11-08",
  "fin": null,
  "lieu": "42153 Riorges",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2025-11-08",
  "fin": null,
  "lieu": "42153 Riorges",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe jeunes arbitres",
  "debut": "2025-11-15",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc 12h00"
 },
 {
  "nom": "District A B C",
  "debut": "2025-11-15",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "A 12h00 B:14h00 C:16h00 Masc"
 },
 {
  "nom": "Tournoi de la Loire",
  "debut": "2025-11-15",
  "fin": null,
  "lieu": "Andrézieux Bouthéon / 42",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-11-16",
  "fin": null,
  "lieu": "Andrézieux Bouthéon / 42",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2025-11-16",
  "fin": null,
  "lieu": "Bernin / 38",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2025-11-22",
  "fin": null,
  "lieu": "Saint-Bonnet-de-Mure (Halle des sports - 1 route de Meyzieu)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-11-22",
  "fin": null,
  "lieu": "Fontaine / 38",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-11-23",
  "fin": null,
  "lieu": "Fontaine / 38",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi vétérans",
  "debut": "2025-11-23",
  "fin": null,
  "lieu": "Fontaine / 38",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France équipes clubs",
  "debut": "2025-11-29",
  "fin": null,
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-11-29",
  "fin": null,
  "lieu": "Rumilly / 74",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2025-11-30",
  "fin": null,
  "lieu": "Rumilly / 74",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe départementale",
  "debut": "2025-12-06",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Masc 10h00/Fém 13h00"
 },
 {
  "nom": "Coupe jeunes arbitres",
  "debut": "2025-12-06",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc 10h00"
 },
 {
  "nom": "Interclubs",
  "debut": "2025-12-06",
  "fin": null,
  "lieu": "Saint-Pierre-de-Chandieu (Salle pluraliste - Rue du Stade)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Championnat du Rhône 1ère Div",
  "debut": "2025-12-07",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém 8h00/Masc 9h30 et 12h30"
 },
 {
  "nom": "Championnat de France",
  "debut": "2025-12-13",
  "fin": "2025-12-14",
  "lieu": "Saint Chamond / 42",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe départementale équipes de clubs",
  "debut": "2025-12-13",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "15h00 Fém/ Masc"
 },
 {
  "nom": "Grand Prix de Noël",
  "debut": "2025-12-13",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Poussin"
  ],
  "type": "championnat",
  "infos": "13h00 Fém/Masc"
 },
 {
  "nom": "Coupe des jeunes arbitres",
  "debut": "2025-12-20",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc 10h00"
 },
 {
  "nom": "District A B C",
  "debut": "2025-12-20",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "A:10h00/B:12h00/C:14h00 Masc"
 },
 {
  "nom": "Tournoi",
  "debut": "2025-12-20",
  "fin": null,
  "lieu": "Portes les Valences / 26",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2025-12-20",
  "fin": null,
  "lieu": "Porte les Valence / 26",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2026-01-10",
  "fin": null,
  "lieu": "Romans / 26",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi",
  "debut": "2026-01-11",
  "fin": null,
  "lieu": "Romans / 26",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi Equipes",
  "debut": "2026-01-11",
  "fin": null,
  "lieu": "Romans / 26",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat du Rhône",
  "debut": "2026-01-17",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Masc 10h00/Fém 12h30"
 },
 {
  "nom": "Championnat interdépartemental 1ère Div",
  "debut": "2026-01-18",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe des jeunes arbitres départ",
  "debut": "2026-01-24",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc 12h00"
 },
 {
  "nom": "Coupe départementale",
  "debut": "2026-01-24",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "Masc 12h00/Fém 15h00"
 },
 {
  "nom": "Tournoi Super Excellence",
  "debut": "2026-01-24",
  "fin": "2026-01-25",
  "lieu": "Dijon / 21",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi vétérans label super excellence",
  "debut": "2026-01-24",
  "fin": "2026-01-25",
  "lieu": "Mouvaux / 59",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": ""
 },
 {
  "nom": "Coupe Interdépart jeunes arbitres",
  "debut": "2026-01-25",
  "fin": null,
  "lieu": "Drôme-Ardèche",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe Interdépartementale 1ére Div",
  "debut": "2026-01-25",
  "fin": null,
  "lieu": "Drôme-Ardèche",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe inter départementale",
  "debut": "2026-01-25",
  "fin": null,
  "lieu": "Drôme / Ardèche",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura 1ère Div",
  "debut": "2026-01-31",
  "fin": null,
  "lieu": "Arnas / 01",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-01-31",
  "fin": null,
  "lieu": "Écully (Complexe sportif - Rue Jean Rigaud)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-01-31",
  "fin": null,
  "lieu": "Brignais (Complexe sportif Pierre Minssieux - Boulevard des sports)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Tournoi circuit",
  "debut": "2026-02-01",
  "fin": null,
  "lieu": "Brignais / 69",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-02-07",
  "fin": null,
  "lieu": "Feyzin (C.O.S.E.C - 4 chemin sous le fort)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Tournoi Super Excellence",
  "debut": "2026-02-14",
  "fin": "2026-02-15",
  "lieu": "Aix en Provence / 13",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Tournoi vétérans label excellence",
  "debut": "2026-02-22",
  "fin": null,
  "lieu": "Saint Marcel / 71",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": ""
 },
 {
  "nom": "Coupe Aura",
  "debut": "2026-02-28",
  "fin": null,
  "lieu": "Montélimar / 26",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe Aura jeunes arbitres",
  "debut": "2026-02-28",
  "fin": null,
  "lieu": "Montélimar / 26",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura 1ére Div",
  "debut": "2026-03-01",
  "fin": null,
  "lieu": "Montélimar / 26",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France 1ère Div",
  "debut": "2026-03-07",
  "fin": "2026-03-08",
  "lieu": "Villebon sur-Yvette / 91",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat du Rhône 2ème et 3ème Div",
  "debut": "2026-03-07",
  "fin": null,
  "lieu": "Lyon / 69",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém 15h30/Masc 11h00-13h30"
 },
 {
  "nom": "Championnat équipes interdépart",
  "debut": "2026-03-14",
  "fin": null,
  "lieu": "Ain / 01",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/ Masc"
 },
 {
  "nom": "Coupe des jeunes arbitres interdépart",
  "debut": "2026-03-14",
  "fin": null,
  "lieu": "Ain / 01",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/ Masc"
 },
 {
  "nom": "Coupe inter-départementale",
  "debut": "2026-03-14",
  "fin": null,
  "lieu": "Ain / 01",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "Fém/ Masc"
 },
 {
  "nom": "Championnat interdépartemental",
  "debut": "2026-03-15",
  "fin": null,
  "lieu": "Ain / 01",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "National Coupe de France",
  "debut": "2026-03-21",
  "fin": "2026-03-22",
  "lieu": "Villebon / Yvette / 91",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France 1ère Div",
  "debut": "2026-03-28",
  "fin": "2026-03-29",
  "lieu": "Villebon-Sur-Yvette / 91",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-03-28",
  "fin": null,
  "lieu": "Communay (Salle polyvalente de la Plaine - Route de Marennes)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Championnat Aura 2ème Div",
  "debut": "2026-04-04",
  "fin": null,
  "lieu": "Bâgé-Dommartin / 01",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura équipes de clubs",
  "debut": "2026-04-04",
  "fin": null,
  "lieu": "Bage Dommartin / 01",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fem/Masc"
 },
 {
  "nom": "Championnat Aura Espoirs (1ére année)",
  "debut": "2026-04-05",
  "fin": null,
  "lieu": "Bâgé-Dommartin / 01",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura équipes clubs 1ére Div",
  "debut": "2026-04-05",
  "fin": null,
  "lieu": "Bâgé-Dommartin / 01",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France vétérans",
  "debut": "2026-04-11",
  "fin": "2026-04-12",
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura équipes de clubs 1ère Div",
  "debut": "2026-04-18",
  "fin": null,
  "lieu": "Grenoble / 38",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura",
  "debut": "2026-04-19",
  "fin": null,
  "lieu": "Grenoble / 38",
  "categories": [
   "Senior",
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura",
  "debut": "2026-04-19",
  "fin": null,
  "lieu": "Grenoble / 38",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-04-25",
  "fin": null,
  "lieu": "Ampuis (Salle polyvalente - 11 bd des Allées)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Championnat de France par équipe 1ére Div",
  "debut": "2026-05-02",
  "fin": null,
  "lieu": "Villebon sur-Yvette / 91",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Open national KYU",
  "debut": "2026-05-03",
  "fin": null,
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Senior",
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat Aura équipes mixtes",
  "debut": "2026-05-09",
  "fin": null,
  "lieu": "Ain / 01",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "National équipes de départements",
  "debut": "2026-05-09",
  "fin": "2026-05-10",
  "lieu": "Vervins / HDF",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France équipes mixtes de clubs proleague",
  "debut": "2026-05-16",
  "fin": null,
  "lieu": "Dojo de Paris / 75",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France équipes mixtes",
  "debut": "2026-05-23",
  "fin": null,
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Coupe aura des jeunes arbitres",
  "debut": "2026-05-23",
  "fin": null,
  "lieu": "Andrézieux Bouthéon / 42",
  "categories": [
   "Minime"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Critérium Aura",
  "debut": "2026-05-23",
  "fin": null,
  "lieu": "Andrézieux Bouthéon / 42",
  "categories": [
   "Benjamin"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France équipes 1ère Div",
  "debut": "2026-05-24",
  "fin": null,
  "lieu": "Villebon-Sur-Yvette / 91",
  "categories": [
   "Junior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France 2ème Div et espoirs féminines",
  "debut": "2026-05-30",
  "fin": null,
  "lieu": "Ceyrat / 63",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-05-30",
  "fin": null,
  "lieu": "Saint-Fons (Palais des Sports - 60 rue Carnot)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Championnat de France 3ème Div et espoirs masculins",
  "debut": "2026-05-31",
  "fin": null,
  "lieu": "Ceyrat / 63",
  "categories": [
   "Cadet"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France",
  "debut": "2026-06-06",
  "fin": null,
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Junior",
   "Senior"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Championnat de France",
  "debut": "2026-06-07",
  "fin": null,
  "lieu": "Villebon-sur-Yvette / 91",
  "categories": [
   "Senior",
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 },
 {
  "nom": "Interclubs",
  "debut": "2026-06-07",
  "fin": null,
  "lieu": "Mornant (Gymnase de la Tannerie - Chemin de la Tannerie)",
  "infos": "Combats debout pour tous · horaires selon l'année de naissance, sur place",
  "categories": [
   "Poussin",
   "Benjamin",
   "Minime",
   "Cadet",
   "Junior",
   "Senior"
  ],
  "type": "interclub"
 },
 {
  "nom": "Championnat d'europe Vétérans",
  "debut": "2026-06-18",
  "fin": "2026-06-21",
  "lieu": "Bordeaux / 33",
  "categories": [
   "Vétéran"
  ],
  "type": "championnat",
  "infos": "Fém/Masc"
 }
];
