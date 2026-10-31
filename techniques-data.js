// =====================================================================
//  BASE DE DONNÉES DES TECHNIQUES
//  Nomenclature : groupe (Nage-waza / Ne-waza) > famille > technique.
//  "niveau" = la ceinture à partir de laquelle la technique est travaillée.
//  Les niveaux jaune→marron suivent les fiches officielles FFJudo « Progression française » (voir
//  SOURCE_NIVEAUX) ; les techniques absentes de ces fiches sont marquées officiel=false. Les niveaux "dan1/dan2/dan3" viennent du référentiel technique CSDGE
//  2024-2025 de la FFJudo. Les textes "cles" sont rédigés pour l'appli : à faire relire par
//  le professeur. Une technique sans "cles" n'a pas encore de fiche détaillée.
//  Pour modifier un niveau, changez simplement la valeur de "niveau" ci-dessous.
// =====================================================================
const SOURCE_NIVEAUX = "Niveaux jaune à marron : fiches « Progression française de l'enseignement du judo » de la FFJudo (programme de chaque passage de ceinture). Les techniques marquées « hors fiches FFJudo » viennent d'un livret de club (Canéjan) et ne sont pas dans ces fiches. Niveaux dan : référentiel technique CSDGE 2024-2025 (FFJudo).";

const NIVEAUX = [
  { cle: "jaune", nom: "Jaune", couleur: "#f1c40f" },
  { cle: "orange", nom: "Orange", couleur: "#e67e22" },
  { cle: "verte", nom: "Verte", couleur: "#27ae60" },
  { cle: "bleue", nom: "Bleue", couleur: "#2980b9" },
  { cle: "marron", nom: "Marron", couleur: "#7b4a2a" },
  { cle: "dan1", nom: "1er dan", couleur: "#222222" },
  { cle: "dan2", nom: "2e dan", couleur: "#222222" },
  { cle: "dan3", nom: "3e dan", couleur: "#222222" }
];

const FAMILLES = {
  "Te-waza": { groupe: "Nage-waza", sens: "techniques de bras" },
  "Koshi-waza": { groupe: "Nage-waza", sens: "techniques de hanche" },
  "Ashi-waza": { groupe: "Nage-waza", sens: "techniques de jambe" },
  "Sutemi-waza": { groupe: "Nage-waza", sens: "techniques de sacrifice (on tombe avec uke)" },
  "Osaekomi-waza": { groupe: "Ne-waza", sens: "immobilisations" },
  "Shime-waza": { groupe: "Ne-waza", sens: "étranglements" },
  "Kansetsu-waza": { groupe: "Ne-waza", sens: "clés de bras" }
};

// t(id, nom, traduction, famille, niveau, [prise, déséquilibre, action, erreur fréquente])
function t(id, nom, trad, famille, niveau, cles) {
  const o = { id: id, nom: nom, trad: trad, famille: famille, groupe: FAMILLES[famille].groupe, niveau: niveau };
  if (cles) { o.prise = cles[0]; o.desequilibre = cles[1]; o.action = cles[2]; o.erreur = cles[3]; }
  return o;
}

const TECHNIQUES = [
  // ---------- JAUNE ----------
  t("de-ashi-barai", "De-ashi-barai", "balayage du pied qui avance", "Ashi-waza", "jaune",
    ["Une main au revers, l'autre à la manche, bras souples.", "Uke avance : on attend qu'il soit en train de poser le pied.", "La plante du pied balaie la cheville d'uke dans le sens de son déplacement, au moment où il se pose.", "Pousser avec les bras ou balayer trop tôt, quand le pied est encore en l'air."]),
  t("okuri-ashi-barai", "Okuri-ashi-barai", "balayage des deux pieds accompagné", "Ashi-waza", "verte",
    ["Revers et manche, comme pour de-ashi-barai.", "Uke se déplace sur le côté : on l'accompagne dans son pas.", "Les deux chevilles d'uke sont balayées l'une vers l'autre, dans le sens de son déplacement.", "Arrêter son accompagnement : le balayage doit venir au bout du pas, pas en début."]),
  t("ashi-guruma", "Ashi-guruma", "roue de jambe", "Ashi-waza", "orange",
    ["Revers et manche, on tire uke vers l'avant-côté.", "Uke est amené sur la pointe des pieds, poids sur l'avant.", "Jambe tendue placée en barrière devant la jambe d'uke, rotation du buste qui entraîne uke par-dessus.", "Plier la jambe d'attaque : elle doit rester tendue comme un axe."]),
  t("ippon-seoi-nage", "Ippon-seoi-nage", "projection par-dessus une épaule, à un bras", "Te-waza", "orange",
    ["Une main à la manche, l'autre bras glissé sous l'aisselle d'uke.", "On tire uke en avant et on monte son poids sur ses pointes de pieds.", "Pivot rapide, dos contre sa poitrine, genoux fléchis ; on se redresse en tirant la manche vers le bas.", "Se pencher en avant sans plier les genoux : on tire alors uke sur soi au lieu de le charger."]),
  t("o-goshi", "O-goshi", "grande hanche", "Koshi-waza", "jaune",
    ["Une main à la manche, l'autre bras enroulé autour de la taille d'uke.", "On rapproche uke de soi, son poids vers l'avant.", "Pivot, hanches plus basses que celles d'uke, dos contre son ventre ; on se redresse pour le faire basculer sur la hanche.", "Rester trop haut : les hanches doivent passer sous celles d'uke."]),
  t("kuzure-yoko-shiho-gatame", "Kuzure-yoko-shiho-gatame", "immobilisation latérale, variante", "Osaekomi-waza", "jaune",
    ["Perpendiculaire à uke, un bras passé sous sa nuque ou sa tête.", "—", "Poitrine posée sur son buste, genoux écartés pour la stabilité, on suit ses mouvements.", "Laisser les hanches se soulever : le poids doit rester collé sur uke."]),
  t("kuzure-tate-shiho-gatame", "Kuzure-tate-shiho-gatame", "immobilisation à cheval, variante", "Osaekomi-waza", "jaune",
    ["À cheval sur uke, tête d'uke bloquée contre soi.", "—", "Poids posé sur la poitrine d'uke, jambes écartées et genoux en appui pour ne pas être renversé.", "Se tenir trop haut : on se fait retourner par un pont."]),
  t("kuzure-kami-shiho-gatame", "Kuzure-kami-shiho-gatame", "immobilisation par le haut, variante", "Osaekomi-waza", "orange",
    ["Placé derrière la tête d'uke, bras passés sous ses épaules.", "—", "Poitrine contre sa tête et ses épaules, jambes écartées pour s'adapter à ses mouvements.", "Se laisser attirer sur le côté quand uke tourne."]),
  t("hon-gesa-gatame", "Hon-gesa-gatame", "immobilisation en écharpe", "Osaekomi-waza", "verte",
    ["À côté d'uke, un bras enroule sa tête, l'autre bloque son bras.", "—", "Poitrine contre son buste, jambes ouvertes en ciseaux, le bras d'uke est coincé sous notre aisselle.", "Laisser le bras d'uke libre : il peut alors s'échapper facilement."]),
  // ---------- ORANGE ----------
  t("morote-seoi-nage", "Morote-seoi-nage", "projection d'épaule à deux mains", "Te-waza", "jaune",
    ["Main au revers, coude de l'autre bras qui entre sous l'aisselle d'uke.", "Uke est tiré en avant, sur la pointe des pieds.", "Pivot, genoux fléchis, dos contre uke : on se redresse et on bascule.", "Baisser la tête sans charger uke."]),
  t("harai-goshi", "Harai-goshi", "hanche de fauchage", "Koshi-waza", "orange",
    ["Revers et manche, uke rapproché.", "Uke est tiré en avant, son poids sur ses pointes.", "Pivot, hanche contre sa cuisse, la jambe balaie sa jambe tendue ; le haut du corps entraîne.", "Poser la jambe d'appui trop loin : on perd l'équilibre avec uke."]),
  t("eri-seoi-nage", "Eri-seoi-nage", "projection d'épaule en tenant le col", "Te-waza", "orange",
    ["Une main à la manche, l'autre main tient le col d'uke, coude sous son aisselle.", "Uke tiré en avant.", "Pivot et flexion des jambes, le bras passe sous l'aisselle, on se redresse.", "Lâcher le col pendant le pivot."]),
  t("kubi-nage", "Kubi-nage", "projection par le cou", "Te-waza", "verte",
    ["Un bras passe autour du cou d'uke, l'autre tient sa manche.", "Uke est déséquilibré vers l'avant.", "Rotation du buste, le cou est contrôlé sans tirer dessus ; on bascule uke sur la hanche.", "Tirer sur le cou : à travailler lentement, sous contrôle du professeur."]),
  t("koshi-guruma", "Koshi-guruma", "roue de hanche", "Koshi-waza", "verte",
    ["Un bras enroule le cou ou la tête d'uke, l'autre tient la manche.", "Uke avancé, son poids vers l'avant.", "Pivot, hanche contre sa taille, rotation du buste qui roule uke sur la hanche.", "Se pencher en avant au lieu de pivoter."]),
  t("ushiro-gesa-gatame", "Ushiro-gesa-gatame", "immobilisation en écharpe arrière", "Osaekomi-waza", "orange",
    ["À côté d'uke, bras autour de son bras proche, face à ses pieds.", "—", "Poids sur son bras et son épaule, jambes ouvertes en appui.", "Laisser uke se tourner sur le ventre."]),
  // ---------- VERTE ----------
  t("tsurikomi-goshi", "Tsurikomi-goshi", "hanche en soulevant", "Koshi-waza", "orange",
    ["Une main tient le revers haut (près de la nuque), l'autre la manche.", "On soulève uke vers le haut et vers l'avant, il monte sur ses pointes.", "Pivot, hanche sous lui, les deux mains tirent comme pour hisser un seau.", "Ne pas soulever avec la main du revers."]),
  t("sode-tsurikomi-goshi", "Sode-tsurikomi-goshi", "hanche en soulevant, par la manche", "Koshi-waza", "verte",
    ["Une main haut sur le revers, l'autre à la manche, au-dessus du coude.", "Uke est soulevé vers l'avant.", "Pivot sous uke, les mains tournent en cercle, la manche guide la chute.", "Lâcher la manche à mi-chemin."]),
  t("tani-otoshi", "Tani-otoshi", "chute dans la vallée", "Sutemi-waza", "bleue",
    ["Revers et manche, uke près de soi.", "Uke est amené en arrière-côté.", "On passe derrière lui, on bloque sa jambe avec la nôtre et on se laisse tomber sur le côté.", "Se laisser tomber trop loin : uke doit tomber devant nous."]),
  t("uchi-mata", "Uchi-mata", "fauchage intérieur de cuisse", "Ashi-waza", "verte",
    ["Revers et manche.", "Uke est tiré en avant ; il doit être sur une jambe.", "On fait un pas entre ses jambes, la cuisse monte et fauche l'intérieur de sa cuisse ; on se redresse en tirant.", "Passer sa jambe trop bas : elle doit atteindre la cuisse d'uke."]),
  t("makura-gesa-gatame", "Makura-gesa-gatame", "immobilisation en écharpe, avec oreiller", "Osaekomi-waza", "verte",
    ["À côté d'uke, bras enroulé autour de sa tête.", "—", "Poitrine contre son buste, jambes écartées en appui, bras bloqué.", "Laisser uke ramener son bras vers soi."]),
  t("tomoe-nage", "Tomoe-nage", "projection en cercle", "Sutemi-waza", "bleue",
    ["Deux mains aux revers, uke près de soi.", "Uke est tiré en avant.", "On se laisse tomber en arrière, le pied sur son bas-ventre, on le projette par-dessus la tête.", "Pousser avec la jambe au lieu de tirer avec les bras."]),
  t("yoko-tomoe-nage", "Yoko-tomoe-nage", "projection en cercle sur le côté", "Sutemi-waza", "marron",
    ["Revers et manche.", "Uke est tiré en avant.", "On se laisse tomber de côté, pied sur sa cuisse, on l'envoie sur le côté.", "Tomber sans tirer."]),
  t("te-guruma", "Te-guruma", "roue de bras", "Te-waza", "bleue",
    ["Une main à la manche, l'autre bras passe entre ses jambes.", "Uke est déséquilibré vers l'avant.", "On se redresse en le soulevant, le bras sous sa cuisse, on le fait rouler sur l'épaule.", "Plier le dos au lieu des jambes."]),
  t("ushiro-goshi", "Ushiro-goshi", "hanche arrière", "Koshi-waza", "verte",
    ["Bras autour de sa taille, uke dans notre dos.", "—", "On se baisse, on le soulève avec les hanches puis on le dépose sur le côté, sous contrôle.", "Travailler trop vite : technique de contre à pratiquer lentement."]),
  // ---------- BLEUE ----------
  t("soto-makikomi", "Soto-makikomi", "enroulement extérieur", "Sutemi-waza", "marron",
    ["Revers et manche, uke en avant.", "Uke est déséquilibré vers l'avant-côté.", "Le bras d'uke est enveloppé sous l'aisselle, on pivote et on roule avec lui.", "Lâcher son bras en route."]),
  t("kata-guruma", "Kata-guruma", "roue d'épaule", "Te-waza", "bleue",
    ["Bras entre ses jambes, prise haute sur l'épaule.", "Uke est tiré en avant.", "On le charge sur les épaules et on le fait pivoter pour le projeter.", "Se redresser sans fléchir les genoux."]),
  t("hane-goshi", "Hane-goshi", "hanche en ressort", "Koshi-waza", "marron",
    ["Revers et manche.", "Uke est tiré en avant.", "Hanche contre lui, la jambe monte comme un ressort contre sa cuisse.", "Lever la jambe sans tourner du buste."]),
  t("sumi-gaeshi", "Sumi-gaeshi", "retournement par l'angle", "Sutemi-waza", "bleue",
    ["Deux mains au revers.", "Uke est tiré en avant sur son angle.", "On tombe sur le côté, le pied dans sa cuisse, et on le projette par-dessus.", "Tomber trop loin sans tirer."]),
  t("yoko-guruma", "Yoko-guruma", "roue latérale", "Sutemi-waza", "marron",
    ["Revers et manche, uke en avant.", "Uke est déséquilibré sur le côté.", "On passe sous lui, on tombe de côté en le roulant autour de soi.", "Rester debout trop longtemps."]),
  t("kata-ha-jime", "Kata-ha-jime", "étranglement avec une aile", "Shime-waza", "marron",
    ["Un bras passe autour du cou, la main de l'autre bras bloque la tête.", "—", "Les deux bras se resserrent sur les artères du cou ; uke frappe pour abandonner.", "Appuyer sur la gorge : on serre sur les côtés du cou, jamais devant."]),
  t("hadaka-jime", "Hadaka-jime", "étranglement nu", "Shime-waza", "bleue",
    ["Bras autour du cou par derrière, le creux du coude sous le menton.", "—", "L'autre main verrouille le bras ; on serre sur les côtés du cou.", "Serrer par la gorge ou continuer après le signal d'abandon."]),
  t("okuri-eri-jime", "Okuri-eri-jime", "étranglement avec le col, par derrière", "Shime-waza", "bleue",
    ["Une main passe sous l'aisselle et tient le col opposé, l'autre autour du cou.", "—", "Les deux mains tirent sur le col pour comprimer le cou.", "Lâcher la prise du col."]),
  t("gyaku-juji-jime", "Gyaku-juji-jime", "étranglement en croix, mains inversées", "Shime-waza", "marron",
    ["Les deux mains au col, pouces à l'extérieur.", "—", "Les poignets glissent en croix sur les côtés du cou.", "Serrer sans abandon : on s'arrête dès que uke tape."]),
  t("kata-juji-jime", "Kata-juji-jime", "étranglement en croix, mains mixtes", "Shime-waza", "marron",
    ["Une main pouce dedans, l'autre pouce dehors.", "—", "Même action que juji-jime, avec les mains mixtes.", "Mal placer les poignets sur les côtés du cou."]),
  t("nami-juji-jime", "Nami-juji-jime", "étranglement en croix, mains normales", "Shime-waza", "marron",
    ["Les deux mains au col, pouces dedans.", "—", "Les poignets croisent sur les côtés du cou.", "Serrer par la gorge."]),
  t("ude-garami", "Ude-garami", "clé de bras enroulée", "Kansetsu-waza", "marron",
    ["Le bras d'uke est plié en 90°, notre main attrape son poignet puis passe sous son bras.", "—", "On pousse son poignet vers le sol pour forcer l'épaule ; uke tape à la moindre douleur.", "Forcer brutalement : on augmente doucement."]),
  t("ude-hishigi-juji-gatame", "Ude-hishigi-juji-gatame", "clé de bras en croix", "Kansetsu-waza", "bleue",
    ["Les jambes encadrent la tête et le buste d'uke, son bras est coincé entre nos cuisses.", "—", "Les hanches montent, pouce de uke vers le haut, le bras est tendu.", "Écarter les genoux : le bras s'échappe."]),
  // ---------- MARRON ----------
  t("harai-tsurikomi-ashi", "Harai-tsurikomi-ashi", "balayage du pied d'appui, en soulevant", "Ashi-waza", "bleue"),
  t("uki-waza", "Uki-waza", "technique flottante", "Sutemi-waza", "marron"),
  t("yoko-wakare", "Yoko-wakare", "séparation latérale", "Sutemi-waza", "marron"),
  t("kuchiki-taoshi", "Kuchiki-taoshi", "arbre pourri qui tombe", "Te-waza", "marron"),
  t("morote-gari", "Morote-gari", "fauchage à deux mains", "Te-waza", "marron"),
  t("ura-nage", "Ura-nage", "projection arrière", "Sutemi-waza", "marron"),
  t("o-soto-otoshi", "O-soto-otoshi", "grande chute extérieure", "Ashi-waza", "jaune"),
  t("hara-gatame", "Ude-hishigi-hara-gatame", "clé de bras sur le ventre", "Kansetsu-waza", "marron"),
  t("ude-gatame", "Ude-hishigi-ude-gatame", "clé de bras droite", "Kansetsu-waza", "bleue"),
  t("sode-guruma-jime", "Sode-guruma-jime", "étranglement avec la manche, en roue", "Shime-waza", "marron"),
  t("sankaku-jime", "Sankaku-jime", "étranglement en triangle", "Shime-waza", "bleue"),
  t("ashi-gatame-jime", "Ashi-gatame-jime", "étranglement avec la jambe", "Shime-waza", "marron"),
  // ---------- 1er DAN : liste du référentiel (fiches à compléter) ----------
  t("o-soto-gari", "O-soto-gari", "grand fauchage extérieur", "Ashi-waza", "orange"),
  t("o-uchi-gari", "O-uchi-gari", "grand fauchage intérieur", "Ashi-waza", "jaune"),
  t("ko-uchi-gari", "Ko-uchi-gari", "petit fauchage intérieur", "Ashi-waza", "orange"),
  t("ko-soto-gari", "Ko-soto-gari", "petit fauchage extérieur", "Ashi-waza", "orange"),
  t("sasae-tsurikomi-ashi", "Sasae-tsurikomi-ashi", "blocage du pied, en soulevant", "Ashi-waza", "verte"),
  t("hiza-guruma", "Hiza-guruma", "roue de genou", "Ashi-waza", "jaune"),
  t("tai-otoshi", "Tai-otoshi", "chute du corps", "Te-waza", "jaune"),
  t("uki-otoshi", "Uki-otoshi", "chute flottante", "Te-waza", "jaune"),
  t("uki-goshi", "Uki-goshi", "hanche flottante", "Koshi-waza", "orange"),
  t("kata-gatame", "Kata-gatame", "immobilisation de l'épaule", "Osaekomi-waza", "verte"),
  t("kami-shiho-gatame", "Kami-shiho-gatame", "immobilisation par le haut", "Osaekomi-waza", "orange"),
  t("yoko-shiho-gatame", "Yoko-shiho-gatame", "immobilisation latérale", "Osaekomi-waza", "jaune"),
  t("tate-shiho-gatame", "Tate-shiho-gatame", "immobilisation à cheval", "Osaekomi-waza", "jaune"),
  // ---------- 2e DAN ----------
  t("ko-soto-gake", "Ko-soto-gake", "petit crochetage extérieur", "Ashi-waza", "dan2"),
  t("o-guruma", "O-guruma", "grande roue", "Ashi-waza", "dan2"),
  t("tsubame-gaeshi", "Tsubame-gaeshi", "hirondelle qui revient (contre)", "Ashi-waza", "dan2"),
  t("kata-te-jime", "Kata-te-jime", "étranglement à une main", "Shime-waza", "bleue"),
  t("ude-hishigi-waki-gatame", "Ude-hishigi-waki-gatame", "clé de bras sous l'aisselle", "Kansetsu-waza", "dan2"),
  t("ude-hishigi-hiza-gatame", "Ude-hishigi-hiza-gatame", "clé de bras avec le genou", "Kansetsu-waza", "marron"),
  // ---------- 3e DAN ----------
  t("utsuri-goshi", "Utsuri-goshi", "hanche par changement", "Koshi-waza", "dan3"),
  t("sukui-nage", "Sukui-nage", "projection en cuillère", "Te-waza", "dan3"),
  t("yama-arashi", "Yama-arashi", "tempête de montagne", "Ashi-waza", "dan3"),
  t("tawara-gaeshi", "Tawara-gaeshi", "balle de riz qu'on renverse", "Sutemi-waza", "dan3"),
  t("kuzure-kesa-gatame", "Kuzure-kesa-gatame", "variante du contrôle en travers", "Osaekomi-waza", "jaune"),
  t("ura-gatame", "Ura-gatame", "contrôle par l'arrière", "Osaekomi-waza", "verte"),
  t("seoi-otoshi", "Seoi-otoshi", "renversement par l'épaule", "Te-waza", "bleue"),
  t("ko-uchi-makikomi", "Ko-uchi-makikomi", "petit fauchage intérieur en roulant", "Ashi-waza", "bleue"),
  t("ude-hishigi-sankaku-gatame", "Ude-hishigi-sankaku-gatame", "luxation du coude par contrôle en triangle", "Kansetsu-waza", "bleue"),
  t("uki-gatame", "Uki-gatame", "contrôle flottant", "Osaekomi-waza", "bleue"),
  t("kibisu-gaeshi", "Kibisu-gaeshi", "renversement par le talon", "Ashi-waza", "marron"),
  t("ude-hishigi-ashi-gatame", "Ude-hishigi-ashi-gatame", "luxation du coude par contrôle de la jambe", "Kansetsu-waza", "marron")
];

// Techniques citées dans les fiches « Progression française » de la FFJudo (jaune à marron).
// Les autres techniques jaune-marron viennent du livret de club et ne figurent pas dans les fiches officielles.
const OFFICIELLES = ["ashi-guruma", "de-ashi-barai", "gyaku-juji-jime", "hadaka-jime", "hane-goshi", "harai-goshi", "harai-tsurikomi-ashi", "hiza-guruma", "hon-gesa-gatame", "ippon-seoi-nage", "kami-shiho-gatame", "kata-gatame", "kata-guruma", "kata-ha-jime", "kata-juji-jime", "kata-te-jime", "kibisu-gaeshi", "ko-soto-gari", "ko-uchi-gari", "ko-uchi-makikomi", "koshi-guruma", "kubi-nage", "kuchiki-taoshi", "kuzure-kami-shiho-gatame", "kuzure-kesa-gatame", "makura-gesa-gatame", "morote-seoi-nage", "nami-juji-jime", "o-goshi", "o-soto-gari", "o-soto-otoshi", "o-uchi-gari", "okuri-ashi-barai", "okuri-eri-jime", "sankaku-jime", "sasae-tsurikomi-ashi", "seoi-otoshi", "sode-tsurikomi-goshi", "soto-makikomi", "sumi-gaeshi", "tai-otoshi", "tani-otoshi", "tate-shiho-gatame", "te-guruma", "tomoe-nage", "tsurikomi-goshi", "uchi-mata", "ude-garami", "ude-gatame", "ude-hishigi-ashi-gatame", "ude-hishigi-hiza-gatame", "ude-hishigi-juji-gatame", "ude-hishigi-sankaku-gatame", "uki-gatame", "uki-goshi", "uki-otoshi", "ura-gatame", "ura-nage", "ushiro-gesa-gatame", "ushiro-goshi", "yoko-guruma", "yoko-shiho-gatame", "yoko-tomoe-nage"];
TECHNIQUES.forEach(function (x) { x.officiel = OFFICIELLES.indexOf(x.id) >= 0; });
