// =====================================================================
//  PROGRESSION FRANÇAISE DE L'ENSEIGNEMENT DU JUDO (FFJudo)
//  Contenu relevé dans les 6 fiches PDF « Progression française » (page ffjudo.com/progression-francaise).
//  Une fiche = le programme pour obtenir la ceinture indiquée (ex. « jaune » = fiche blanche → jaune).
//  Les valeurs, nombres de séances et événements par an sont recopiés des fiches.
// =====================================================================
const PROGRAMMES = {
  jaune:  { fiche: "Blanche → Jaune", but: "Initiation", seances: "35 séances minimum", valeurs: "Amitié et respect", rythme: "2 à 4 animations par an",
    entrainement: "Kakari geiko, Yaku soku geiko ; je développe mes habiletés motrices.",
    regles: "Hajime, Matte, Sonomama / Yoshi, Osae komi, Toketa.", plus: "Je sais attacher ma ceinture ; je réalise et répète mon propre enchaînement." },
  orange: { fiche: "Jaune → Orange", but: "Perfectionnement global", seances: "45 séances minimum", valeurs: "Politesse et courage", rythme: "3 à 4 interclubs par an",
    entrainement: "Uchi komi par séries de 10, Kakari geiko, Yaku soku geiko et Randori.",
    regles: "Waza-ari awasete ippon, Waza-ari, Yuko, Ippon.", plus: "J'utilise les principes du Nage no kata ; je sais riposter après avoir esquivé et enchaîner les attaques." },
  verte:  { fiche: "Orange → Verte", but: "Perfectionnement global", seances: "45 séances minimum", valeurs: "Sincérité et contrôle de soi", rythme: "4 à 6 interclubs par an",
    entrainement: "Tandoku renshu, Uchi komi, Nage komi, Kakari geiko, Yaku soku geiko et Randori no kata.",
    regles: "Kachi (victoire), non-combativité, pénalité.", plus: "Une technique = Kuzushi, Tsukuri, Kake, puis Nage ; j'utilise les principes du Go no sen et du Katame no kata." },
  bleue:  { fiche: "Verte → Bleue", but: "Perfectionnement individualisé", seances: "55 séances minimum", valeurs: "Modestie et honneur", rythme: "4 à 6 compétitions par an",
    entrainement: "Tandoku renshu, Uchi komi, Nage komi, Kakari geiko, Yaku soku geiko et Randori no kata.",
    regles: "", plus: "Je construis mon système d'attaque et de défense ; je sais faire mon tokui waza dans trois déplacements ; je travaille en garde emboîtée (Ai yotsu) et opposée (Kenka yotsu)." },
  marron: { fiche: "Bleue → Marron", but: "Perfectionnement individualisé", seances: "55 séances minimum", valeurs: "Proactivité et confiance en soi", rythme: "4 à 6 compétitions par an",
    entrainement: "Tandoku renshu, Uchi komi, Nage komi, Kakari geiko, Yaku soku geiko et Randori no kata ; j'utilise les circuits intégrés.",
    regles: "", plus: "Je sais faire mon tokui waza dans les cinq déplacements et attaquer dans les quatre secteurs de chute ; j'utilise les principes de kumikata.",
    culture: "1882 : naissance du judo et création du premier Kodokan. Jigoro Kano (1860-1938), fondateur du judo. 1935 : premier club de judo français, fondé par Kawaishi Mikinosuke." },
  dan1:   { fiche: "Marron → Noire", but: "Perfectionnement individualisé", seances: "", valeurs: "Réalisation de soi et responsabilité", rythme: "6 à 8 compétitions par an",
    entrainement: "J'utilise tous les procédés d'entraînement.",
    regles: "", plus: "Pas de nouvelle technique : j'utilise enchaînements, combinaisons et confusions autour de mon tokui waza, jusque dans le ne waza ; j'étudie le Nage no kata ou le Kodokan goshin jitsu. Examen shodan (dominante technique ou compétition) : UV1 kata, UV2 technique, UV3 efficacité, UV4 engagement personnel.",
    culture: "Champions français : Shozo Awazu (1923-2016), grand maître du judo français." }
};

// Niveau auquel un mot du lexique est cité dans les fiches (clé : mot japonais sans accents, espaces ni tirets).
const NIVEAU_LEXIQUE = {
  jaune: ["hajime", "mate", "sonomama", "yoshi", "osaekomi", "toketa", "judogi", "obi", "zori", "ukemi", "yokoukemi", "ushiroukemi", "maemawariukemi", "tori", "uke", "seiryokuzenyo", "jitakyoei", "kakarigeiko", "yakusokugeiko", "nagewaza", "katamewaza"],
  orange: ["ippon", "wazaari", "yuko", "wazaariawaseteippon", "uchikomi", "randori", "tai", "hiza", "ashi", "koshi", "atama", "ude", "te", "hikidashi", "nagenokata"],
  verte: ["momo", "mata", "kataepaule", "kubi", "mune", "kachi", "tsurite", "hikite", "kuzushi", "tsukuri", "kake", "nage", "oikomi", "gonosen", "tandokurenshu", "nagekomi", "katamenokata"],
  bleue: ["kibisu", "tobikomi", "aiyotsu", "kenkayotsu", "tokuiwaza"],
  marron: ["kumikata", "kodokan"],
  dan1: ["shodan", "kodokangoshinjitsu"]
};
function cleLexique(mot) { return mot.split("/")[0].toLowerCase().normalize("NFD").replace(/[^a-z]/g, ""); }
