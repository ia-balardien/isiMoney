
const val_point = 58.2004;
const table_correspondance_indice = [
    // [indice, grade, échelon, officier sup., officier gen., hors echelle, eligible transfert prime-point, grade + échelon]
    [388, "IA", 1, 0, false, false, false, false, "IA ECH.1 (SLT)"],
    [449, "IA", 2, 0, false, false, false, false, "IA ECH.2 (LT)"],
    [485, "IA", 3, 0, false, false, false, true, "IA ECH.3"],
    [523, "IA", 4, 0, false, false, false, true, "IA ECH.4 (CNE)"],
    [555, "IA", 5, 0, false, false, false, true, "IA ECH.5"],
    [605, "IA", 6, 0, false, false, false, true, "IA ECH.6 (CNE)"],
    [659, "IA", 7, 0, false, false, false, true, "IA ECH.7"],
    [683, "IA", 8, 0, false, false, false, true, "IA ECH.8"],
    [712, "IA", 9, 0, false, false, false, true, "IA ECH.9"],
    [689, "IPA", 1, 0, true, false, false, true, "IPA ECH.1 (CDT)"],
    [725, "IPA", 2, 0, true, false, false, true, "IPA ECH.2"],
    [765, "IPA", 3, 0, true, false, false, true, "IPA ECH.3"],
    [792, "IPA", 4, 0, true, false, false, true, "IPA ECH.4"],
    [765, "ICA", 1, 0, true, false, false, true, "ICA ECH.1"],
    [792, "ICA", 2, 0, true, false, false, true, "ICA ECH.2"],
    [810, "ICA", 3, 0, true, false, false, true, "ICA ECH.3"],
    [830, "ICA", 4, 0, true, false, false, true, "ICA ECH.4"],
    [890, "ICA", 5, 1, true, false, true, true, "ICA ECH.5 (HE A1)"],
    [925, "ICA", 5, 2, true, false, true, true, "ICA ECH.5 (HE A2)"],
    [972, "ICA", 5, 3, true, false, true, true, "ICA ECH.5 (HE A3)"],
    [972, "ICA", 6, 1, true, false, true, true, "ICA ECH.6 (HE B1)"],
    [1013, "ICA", 6, 2, true, false, true, true, "ICA ECH.6 (HE B2)"],
    [1067, "ICA", 6, 3, true, false, true, true, "ICA ECH.6 (HE B3)"],
    [1124, "IG2A", "C1", 1, false, true, true, true, "IG2A (HE C1)"],
    [1148, "IG2A", "C2", 2, false, true, true, true, "IG2A (HE C2)"],
    [1173, "IG2A", "C3", 3, false, true, true, true, "IG2A (HE C3)"],
    [1173, "IG1A", "D1", 1, false, true, true, true, "IG1A (HE D1)"],
    [1226, "IG1A", "D2", 2, false, true, true, true, "IG1A (HE D2)"],
    [1279, "IG1A", "D3", 3, false, true, true, true, "IG1A (HE D3)"],
    [1279, "IGHC", "E1", 1, false, true, true, true, "IGHCA (HE E1)"],
    [1329, "IGHC", "E2", 2, false, true, true, true, "IGHCA (HE E2)"],
    [1378, "IGCE", "F", 0, false, true, true, true, "IGCEA (HE F)"],

]


const formatDate = (date) => {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);

    var today = date.getFullYear() + "-" + (month) + "-" + (day);

    return today
}


var ligne_grade_echelon = 0;
var zone = 0;
var nbi = 0;
var corps_tech = false;
var abonnement_dom_travail = 0;
var categorie_familiale = 0;
var niveau_poste = 0;
var part_variable = 0;
var lieu_garnison = 0; // 0 : IDF, 1: Bruz/Bisca, 2: le reste
var type_logement = 0; // 0 : Gratuit, 1: SNI, 2: loc privé, 3: proprio
var loyer_mensuel = 0;
var date_emmenagement = formatDate(new Date());
var compensation_CSG = 0;
var participation_PSC = false;


var vue_mois = 0;

window.onload = function () {
    remplissageMenuGrades();

    loadParameters();

    updateData();
};

function remplissageMenuGrades() {
    var grade = document.getElementById("grade");
    var contents;

    for (let i in table_correspondance_indice) {
        var tuple = table_correspondance_indice[i];
        contents += "<option>" + table_correspondance_indice[i][8] + "</option>";
    }

    grade.innerHTML = contents;
}

const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
}

const round_inf = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.floor(number * factorOfTen) / factorOfTen
}

function updateData() {
    ligne_grade_echelon = document.getElementById("grade").selectedIndex;

    var nbi_elt = document.getElementById("nbi");
    nbi = nbi_elt.options[nbi_elt.selectedIndex].value;


    var zone_elt = document.getElementById("zone");
    zone = zone_elt.options[zone_elt.selectedIndex].value;

    categorie_familiale = document.getElementById("situation_familiale").selectedIndex;

    corps_tech = document.getElementById("corps_tech").checked;

    abonnement_dom_travail = parseFloat("0" + document.getElementById("domicile_travail").value);

    niveau_poste = document.getElementById("niveau_poste").selectedIndex;

    var part_var_elt = document.getElementById("part_variable");
    part_variable = part_var_elt.options[part_var_elt.selectedIndex].value;


    var garnison_elt = document.getElementById("garnison");
    lieu_garnison = garnison_elt.options[garnison_elt.selectedIndex].value;

    var logement_elt = document.getElementById("logement");
    type_logement = logement_elt.options[logement_elt.selectedIndex].value;

    loyer_mensuel = document.getElementById("loyer").value;
    date_emmenagement = document.getElementById("date-emmenagement").value;

    compensation_CSG = parseFloat("0" + document.getElementById("compensation_CSG").value);


    participation_PSC = document.getElementById("participation_PSC").checked;


    showMontants();
    showValeursFDS();
}

function setSelectOptionValue(select_id, value) {
    var elt = document.getElementById(select_id);
    const options = elt.options;

    for (let i in options) {
        if (options[i].value == value) {
            elt.selectedIndex = i;
            break;
        }
    }
}

function dictionnaireParametre() {
    return {
        "ligne_grade_echelon": ligne_grade_echelon,
        "zone": zone,
        "nbi": nbi,
        "corps_tech": corps_tech,
        "abonnement_dom_travail": abonnement_dom_travail,
        "categorie_familiale": categorie_familiale,
        "niveau_poste": niveau_poste,
        "part_variable": part_variable,
        "lieu_garnison": lieu_garnison,
        "type_logement": type_logement,
        "loyer_mensuel": loyer_mensuel,
        "date_emmenagement": date_emmenagement,
        "compensation_CSG": compensation_CSG,
        "participation_PSC": participation_PSC,
    }
}

function saveParameters() {
    localStorage.setItem("isiMoney_IA", JSON.stringify(dictionnaireParametre()));
}

function loadParameters() {
    let json_dict = localStorage.getItem("isiMoney_IA");
    if (json_dict) {
        dict = JSON.parse(json_dict);
        ligne_grade_echelon = dict["ligne_grade_echelon"];
        zone = dict["zone"];
        nbi = dict["nbi"];
        corps_tech = dict["corps_tech"];
        abonnement_dom_travail = dict["abonnement_dom_travail"];
        categorie_familiale = dict["categorie_familiale"];
        niveau_poste = dict["niveau_poste"];
        part_variable = dict["part_variable"];
        lieu_garnison = dict["lieu_garnison"];
        type_logement = dict["type_logement"];
        loyer_mensuel = dict["loyer_mensuel"];
        date_emmenagement = dict["date_emmenagement"];
        compensation_CSG = dict["compensation_CSG"];
        participation_PSC = dict["participation_PSC"];

        setUIParameters();
        updateData();
        showMontants()
        showValeursFDS();
    }
}

function resetParameters() {
    ligne_grade_echelon = 0;
    zone = 0;
    nbi = 0;
    corps_tech = false;
    abonnement_dom_travail = 0;
    categorie_familiale = 0;
    niveau_poste = 0;
    part_variable = 0;
    lieu_garnison = 0; // 0 : IDF, 1: Bruz/Bisca, 2: le reste
    type_logement = 0; // 0 : Gratuit, 1: SNI, 2: loc privé, 3: proprio
    loyer_mensuel = 0;
    date_emmenagement = formatDate(new Date());
    compensation_CSG = 0;
    participation_PSC = false;

    setUIParameters();
    updateData();
    showMontants()
    showValeursFDS();
}

function setUIParameters() {
    document.getElementById("grade").selectedIndex = ligne_grade_echelon;

    var nbi_elt = document.getElementById("nbi");
    nbi_elt.options[nbi_elt.selectedIndex].value = nbi;

    setSelectOptionValue("zone", zone);

    document.getElementById("situation_familiale").selectedIndex = categorie_familiale;

    document.getElementById("corps_tech").checked = corps_tech;

    document.getElementById("domicile_travail").value = abonnement_dom_travail;

    document.getElementById("niveau_poste").selectedIndex = niveau_poste;

    setSelectOptionValue("part_variable", part_variable);
    setSelectOptionValue("garnison", lieu_garnison);
    setSelectOptionValue("logement", type_logement);


    document.getElementById("loyer").value = loyer_mensuel;
    document.getElementById("date-emmenagement").value = date_emmenagement;

    document.getElementById("compensation_CSG").value = compensation_CSG;


    document.getElementById("participation_PSC").checked = participation_PSC;
}

function updateVue() {
    vue_mois = document.getElementById("vue").selectedIndex;

    if (vue_mois == 0) {
        document.getElementById("montants").className = "visible"
        document.getElementById("fds").className = "invisible d-none"
    } else {
        document.getElementById("fds").className = "visible"
        document.getElementById("montants").className = "invisible d-none"
    }
    showValeursFDS();
}

function showMontants() {
    document.getElementById("val_indice").value = calculIndice();

    document.getElementById("val_solde").innerHTML = texteMontant(round(calculSolde(), 2));
    document.getElementById("val_nbi").innerHTML = texteMontant(round(calculNbi(), 2));
    document.getElementById("val_residence").innerHTML = texteMontant(round(calculResidence(), 2));
    document.getElementById("val_supplement_familial").innerHTML = texteMontant(round(calculSupplementFamilial(), 2));
    document.getElementById("val_corps_tech").innerHTML = texteMontant(round(calculCorpsTechnique(), 2));
    document.getElementById("val_domicile_travail").innerHTML = texteMontant(round(calculRemboursementDomTravail(), 2));

    document.getElementById("val_perf_fixe").innerHTML = texteMontant(round(calculPerfFixe(), 2));
    document.getElementById("val_perf_variable").innerHTML = textePerfVariable();

    document.getElementById("val_icm").innerHTML = texteMontant(round(calculICM(), 2));

    document.getElementById("val_micm").innerHTML = texteMontant(round(calculMICM(), 2));

    document.getElementById("val_compensatrice_CSG").innerHTML = texteMontant(compensation_CSG);
    document.getElementById("val_participation_PSC").innerHTML = texteMontant(calculParticipationPSC());

    document.getElementById("val_IAOP").innerHTML = texteMontant(calculIAOP());

    document.getElementById("val_retenue_pc").innerHTML = texteMontant(calculRetenuePension());
    document.getElementById("val_csg_non_deductible").innerHTML = texteTableauCotisation(calculCSGNonDeductible());
    document.getElementById("val_csg_deductible").innerHTML = texteTableauCotisation(calculCSGDeductible());
    document.getElementById("val_crds").innerHTML = texteTableauCotisation(calculCRDS());
    document.getElementById("val_contrib_RAFP").innerHTML = texteRAFP();
    document.getElementById("val_fond_aero").innerHTML = texteMontant(calculPrevoyanceAero());
    document.getElementById("val_fond_militaire").innerHTML = texteMontant(calculPrevoyanceMilitaire());
    document.getElementById("val_transfert_primes_points").innerHTML = texteMontant(calculTransfertPrimePoint());


    if (eligibleMICM()) {
        document.getElementById("input-loyer").className = "visible";
        document.getElementById("input-date-emmenagement").className = "visible";
    } else {
        document.getElementById("input-loyer").className = "invisible d-none";
        document.getElementById("input-date-emmenagement").className = "invisible d-none";
    }
}

function showValeursFDS() {
    document.getElementById("fds_solde").innerHTML = calculSolde();

    document.getElementById("fds_nbi").innerHTML = calculNbi();
    if (nbi == 0) {
        document.getElementById("row_nbi").className = "invisible d-none";

    } else {
        document.getElementById("row_nbi").className = "visible";
    }

    var ind_residence = calculResidence()
    if (ind_residence == 0) {
        document.getElementById("row_residence").className = "invisible d-none";
    } else {
        document.getElementById("row_residence").className = "visible";
    }
    document.getElementById("fds_residence").innerHTML = ind_residence;

    var supplement_familial = calculSupplementFamilial();
    if (supplement_familial == 0) {
        document.getElementById("row_supplement_familial").className = "invisible d-none";
    } else {
        document.getElementById("row_supplement_familial").className = "visible";
    }
    document.getElementById("fds_supplement_familial").innerHTML = supplement_familial;


    if (corps_tech) {
        document.getElementById("row_corps_tech").className = "visible";
        document.getElementById("row_fond_aero").className = "visible";
        document.getElementById("row_fond_militaire").className = "invisible d-none";
    } else {
        document.getElementById("row_corps_tech").className = "invisible d-none";
        document.getElementById("row_fond_aero").className = "invisible d-none";
        document.getElementById("row_fond_militaire").className = "visible";
    }
    document.getElementById("fds_corps_tech").innerHTML = calculCorpsTechnique();
    document.getElementById("fds_fond_aero").innerHTML = calculPrevoyanceAero();
    document.getElementById("fds_fond_militaire").innerHTML = calculPrevoyanceMilitaire();


    var rbt_dom_trav = calculRemboursementDomTravail();
    if (rbt_dom_trav == 0) {
        document.getElementById("row_domicile_travail").className = "invisible d-none";
    } else {
        document.getElementById("row_domicile_travail").className = "visible";
    }
    document.getElementById("fds_domicile_travail").innerHTML = rbt_dom_trav;


    document.getElementById("fds_perf_fixe").innerHTML = calculPerfFixe();

    var fds_perf_elt = document.getElementById("fds_perf_variable");
    var fds_perf_row = document.getElementById("row_perf_variable");
    if (vue_mois == 6) { // Juin
        fds_perf_elt.innerHTML = calculPerfVariable()[1];
        fds_perf_row.className = "visible";
    } else if (vue_mois == 12) { // Juin
        fds_perf_elt.innerHTML = calculPerfVariable()[2];
        fds_perf_row.className = "visible";
    } else {
        fds_perf_elt.innerHTML = 0.0;
        fds_perf_row.className = "invisible d-none";
    }

    document.getElementById("fds_icm").innerHTML = calculICM();

    var micm = calculMICM();

    if (micm == 0) {
        document.getElementById("row_micm").className = "invisible d-none";
    } else {
        document.getElementById("row_micm").className = "visible";
    }
    document.getElementById("fds_micm").innerHTML = micm;



    if (compensation_CSG == 0) {
        document.getElementById("row_compensatrice_CSG").className = "invisible d-none";
    } else {
        document.getElementById("row_compensatrice_CSG").className = "visible";
    }
    document.getElementById("fds_compensatrice_CSG").innerHTML = compensation_CSG;


    if (participation_PSC) {
        document.getElementById("row_participation_PSC").className = "visible";
    } else {
        document.getElementById("row_participation_PSC").className = "invisible d-none";
    }
    document.getElementById("fds_participation_PSC").innerHTML = calculParticipationPSC();

    if (vue_mois == 3 || vue_mois == 9) {
        document.getElementById("fds_csg_non_deductible").innerHTML = calculCSGNonDeductible()[1];
        document.getElementById("fds_csg_deductible").innerHTML = calculCSGDeductible()[1];
        document.getElementById("fds_crds").innerHTML = calculCRDS()[1];
        document.getElementById("fds_contrib_RAFP").innerHTML = calculCotisationRAFP()[1][0];
    } else if (vue_mois == 6) {
        document.getElementById("fds_csg_non_deductible").innerHTML = calculCSGNonDeductible()[2];
        document.getElementById("fds_csg_deductible").innerHTML = calculCSGDeductible()[2];
        document.getElementById("fds_crds").innerHTML = calculCRDS()[2];
        document.getElementById("fds_contrib_RAFP").innerHTML = calculCotisationRAFP()[1][1];
    } else if (vue_mois == 12) {
        document.getElementById("fds_csg_non_deductible").innerHTML = calculCSGNonDeductible()[3];
        document.getElementById("fds_csg_deductible").innerHTML = calculCSGDeductible()[3];
        document.getElementById("fds_crds").innerHTML = calculCRDS()[3];
        document.getElementById("fds_contrib_RAFP").innerHTML = calculCotisationRAFP()[1][1];
    } else {
        document.getElementById("fds_csg_non_deductible").innerHTML = calculCSGNonDeductible()[0];
        document.getElementById("fds_csg_deductible").innerHTML = calculCSGDeductible()[0];
        document.getElementById("fds_crds").innerHTML = calculCRDS()[0];
        document.getElementById("fds_contrib_RAFP").innerHTML = calculCotisationRAFP()[1][0];
    }

    document.getElementById("fds_IAOP").innerHTML = calculIAOP();
    if (vue_mois == 3 || vue_mois == 6 || vue_mois == 9 || vue_mois == 12) {
        document.getElementById("row_IAOP").className = "visible";
    } else {
        document.getElementById("row_IAOP").className = "invisible d-none";
    }

    document.getElementById("fds_retenue_pc").innerHTML = calculRetenuePension();
    document.getElementById("fds_transfert_primes_points").innerHTML = calculTransfertPrimePoint();

    document.getElementById("fds_net_a_payer").innerHTML = round(calculTotal(), 2);

}

function calculTotal() {
    var tot = calculSolde() + calculNbi() + calculResidence() + calculSupplementFamilial() + calculCorpsTechnique();

    tot += calculRemboursementDomTravail() + calculPerfFixe();

    var perf_var = 0;
    if (vue_mois == 6) { // Juin
        perf_var = calculPerfVariable()[1];
    } else if (vue_mois == 12) { // Juin
        perf_var = calculPerfVariable()[2];
    }

    tot += perf_var + calculICM() + calculMICM() + compensation_CSG + calculParticipationPSC();

    if (vue_mois == 3 || vue_mois == 6 || vue_mois == 9 || vue_mois == 12) {
        tot += calculIAOP();
    }

    tot -= calculPrevoyanceAero() + calculPrevoyanceMilitaire();

    var cotisation = 0;
    if (vue_mois == 3 || vue_mois == 9) {
        cotisation = calculCSGNonDeductible()[1] + calculCSGDeductible()[1] + calculCRDS()[1] + calculCotisationRAFP()[1][0];
    } else if (vue_mois == 6) {
        cotisation = calculCSGNonDeductible()[2] + calculCSGDeductible()[2] + calculCRDS()[2] + calculCotisationRAFP()[1][1];
    } else if (vue_mois == 12) {
        cotisation = calculCSGNonDeductible()[3] + calculCSGDeductible()[3] + calculCRDS()[3] + calculCotisationRAFP()[1][1];
    } else {
        cotisation = calculCSGNonDeductible()[0] + calculCSGDeductible()[0] + calculCRDS()[0] + calculCotisationRAFP()[1][0];
    }
    tot -= cotisation + calculRetenuePension() + calculTransfertPrimePoint();

    return tot;
}

function calculIndice() {
    return table_correspondance_indice[ligne_grade_echelon][0]
}

function estOfficierSuperieurOuGeneral() {
    return estOfficierSuperieur() || estOfficierGeneral();
}

function estOfficierSuperieur() {
    return table_correspondance_indice[ligne_grade_echelon][4]
}

function estOfficierGeneral() {
    return table_correspondance_indice[ligne_grade_echelon][5]
}

function estHorsEchelle() {
    return table_correspondance_indice[ligne_grade_echelon][6]
}



function calculSolde() {
    var solde = calculIndice() * val_point / 12;

    return round_inf(solde, 2);
}

function calculNbi() {
    var valeur_nbi = nbi * val_point / 12;
    return round(valeur_nbi, 2);
}


function calculResidence() {
    const facteurs_abattement_residence = [
        0.03,   // Zone 1
        0.01,   // Zone 2
        0.0,    // Zone 3
    ]

    const min_residence = [
        51.21,   // Zone 1
        17.07,   // Zone 2
        0.0,    // Zone 3
    ]

    var solde = calculSolde() + calculNbi();
    var val_residence = solde * facteurs_abattement_residence[zone];

    return Math.max(round_inf(val_residence, 2), min_residence[zone]);
}

function calculCorpsTechnique() {
    if (corps_tech)
        return round(Math.min(calculIndice(), 454) * 0.25 * val_point / 12, 2);
    else
        return 0;
}

function calculSupplementFamilial() {
    const supplement_familial = [
        0,          // Célibataire
        0,          // Marié
        0,          // 1 enfant
        3 / 100,    // 2 enfants
        8 / 100,    // 3 enfants
        14 / 100,   // 4 enfants
        20 / 100,   // 5 enfants
        26 / 100,   // 6 enfants
        32 / 100,   // 7 enfants
        38 / 100,   // 8 enfants
        44 / 100,   // 9 enfants
        50 / 100,   // 10 enfants
    ]

    const offset_supplement_familial = [
        0.00, // Célibataire
        0.00, // Marié
        2.29, // 1 enfant
        10.67, // 2 enfants
        15.24, // 3 enfants
        19.81, // 4 enfants
        24.38, // 5 enfants
        28.95, // 6 enfants
        33.52, // 7 enfants
        38.09, // 8 enfants
        42.66, // 9 enfants
        47.23, // 10 enfants
    ]


    var indice = calculIndice();
    var indice_retenu = Math.min(Math.max(indice, 449), 717);
    var supp = offset_supplement_familial[categorie_familiale] + supplement_familial[categorie_familiale] * indice_retenu * val_point / 12;


    return round(supp, 2)
}

function calculRemboursementDomTravail() {
    return round(abonnement_dom_travail / 2, 2)
}

function calculPerfFixe() {
    const val_part_fixe = [
        21_710,
        20_040,
        18_370,
        17_118,
    ]
    return round(val_part_fixe[niveau_poste] / 12, 2)
}

function calculPerfVariable() {
    const val_part_variable_max = [
        22_664,
        19_086,
        16_700,
        13_718,
    ]
    var perf_var = val_part_variable_max[niveau_poste] * part_variable;
    var perf_dec = round(5 * perf_var / 12, 2)
    var perf_juin = round(7 * perf_var / 12, 2)

    return [perf_dec + perf_juin, perf_juin, perf_dec];
}

const ICM_logement_gratuit = [
    [[3_187.42, 3_187.42], [2_592.26, 2_592.26]],
    [[1_613.48, 3_468.64], [1_492.01, 3_061.04]],
    [[1_360.68, 1_918.21], [1_430.51, 1_991.95]],
];

const ICM_logement_payant_paris = [
    [[5_954.13, 5_954.13], [4_777.49, 4_777.49]],
    [[4_049.99, 7_961.61], [3_789.15, 7_134.92]],
    [[3_770.52, 5_286.49], [3_553.90, 4_982.81]],
];

const ICM_logement_payant_province = [
    [[5_419.10, 5_419.10], [4_348.19, 4_348.19]],
    [[3_686.08, 7_246.21], [3_448.66, 6_493.77]],
    [[3_431.70, 4_811.48], [3_234.51, 4_535.09]],
]

function calculCatFamilialeICM() {
    var cat_familiale_ICM = 0; // Célibataire par défaut

    if (categorie_familiale > 0) {
        // enfants ou non célibataires
        cat_familiale_ICM = 1;
        if (categorie_familiale > 3) {
            // plus de 2 enfants à charge
            cat_familiale_ICM = 2;
        }
    }

    return cat_familiale_ICM;
}
function calculICM() {

    var cat_familiale_ICM = calculCatFamilialeICM()

    var table_ICM;

    if (type_logement == 0) {
        table_ICM = ICM_logement_gratuit;
    } else {
        // logement payant
        if (lieu_garnison == 0) {
            // IDF
            table_ICM = ICM_logement_payant_paris
        } else {
            table_ICM = ICM_logement_payant_province
        }
    }

    var taux = 0;
    if (lieu_garnison == 1) {
        // Garnison isolé, taux 2
        taux = 1;
    }

    var type_off = 1;

    if (estOfficierSuperieurOuGeneral()) {
        type_off = 0;
    }

    var ICM = 0;

    for (let i = 0; i <= cat_familiale_ICM; i++) {
        ICM += table_ICM[i][type_off][taux];
    }

    return round_inf(ICM / 12, 2)
}

function eligibleMICM() {
    return type_logement != 3 && categorie_familiale != 0; // propriétaire ou célibataire ? Pas de MICM
}


Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};


function calculMICM() {
    if (type_logement == 3) { // propriétaire, pas de MICM
        return 0;
    }

    const K_tab = [[0.9, 0.1], [0.7, 0.3]];
    var z = Math.min(1, zone); // retourne 0 si Zone 1 (zone = 0), 1 sinon
    var K = K_tab[z][0];
    var K1 = K_tab[z][1];

    var P0 = calculMICMLoyerPlancher();
    var P1 = calculMICMLoyerPlafond();
    // var K, K1 = calculICMIndex();

    var MICM;
    if (P1 == P0) {
        MICM = 0;
    } else {
        var L = Math.min(Math.max(loyer_mensuel, P0), P1);
        MICM = (K + K1 * (P1 - L) / (P1 - P0)) * (L - P0);
    }

    // application de la dégressivité
    const date_emm = new Date(date_emmenagement);
    const now = new Date();

    var palier = new Date(date_emmenagement);
    palier.addMonths(12 * 7);

    var i = 0;
    for (; i <= 4; i++) {
        if (now <= palier) {
            break;
        }
        palier.addMonths(12);
    }

    if (i >= 5) {
        // plus droit à la MICM
        MICM = 0;
    } else {
        MICM = MICM * (1.0 - i / 4.0);
    }

    return round(MICM, 2);
}

function calculMICMLoyerPlancher() {
    const table_loyer_plancher = [
        [0.00, 0.00, 0.00],
        [0.11, 0.10, 0.09],
        [0.13, 0.12, 0.11],
        [0.15, 0.14, 0.13],
        [0.17, 0.16, 0.15],
        [0.17, 0.16, 0.15],
        [0.19, 0.18, 0.17],
        [0.19, 0.18, 0.17],
        [0.21, 0.20, 0.19],
        [0.21, 0.20, 0.19],
    ];
    var type_grade = 2; // subalterne par défaut
    // attention, l'ordre des tests important ici
    if (estOfficierSuperieur()) type_grade = 1;
    if (estHorsEchelle()) type_grade = 0;

    var cat_familiale_MICM = categorie_familiale;
    cat_familiale_MICM = Math.min(cat_familiale_MICM, 9);

    var pourcentage = table_loyer_plancher[cat_familiale_MICM][type_grade];

    return calculSolde() * pourcentage;
}

function calculMICMLoyerPlafond() {
    const table_loyer_plafond = [
        [2.62, 2.06, 1.63],
        [2.62, 2.06, 1.63],
        [3.07, 2.50, 1.95],
    ];

    var loyer_plancher = calculMICMLoyerPlancher();

    var type_grade = 2; // subalterne par défaut
    if (estOfficierGeneral()) type_grade = 0;
    if (estOfficierSuperieur()) type_grade = 1;

    var loyer_plafond = loyer_plancher * table_loyer_plafond[type_grade][zone];

    return loyer_plafond;
}

function calculMICMIndex() {
    const K_ = [0.9, 0.7];
    const K1 = [0.1, 0.3];

    var z = Math.min(1, zone); // retourne 0 si Zone 1 (zone = 0), 1 sinon
    return (K[z], K1[z]);
}

function calculIAOP() {
    return 255.0;
}

function calculParticipationPSC() {
    if (participation_PSC) {
        return 15.0;
    } else {
        return 0.0;
    }
}

function calculRetenuePension() {
    const taux_cotisation_pension = 11.1 / 100;
    return round(taux_cotisation_pension * calculSolde(), 2);
}

function estEligibleTransfertPrimePoint() {
    return table_correspondance_indice[ligne_grade_echelon][7]
}
function calculTransfertPrimePoint() {
    if (estEligibleTransfertPrimePoint()) {
        const montantAnnuelTransfertPP = 389.0;
        return round(montantAnnuelTransfertPP / 12, 2);
    } else { return 0.0; }
}


function totalAssietteCSG() {
    var base = calculSolde() + calculNbi() + calculResidence() + calculSupplementFamilial() + calculPerfFixe() + calculCorpsTechnique() + calculMICM() + compensation_CSG + calculParticipationPSC() - calculTransfertPrimePoint();


    var base_IAOP = base + calculIAOP();

    var perf_var = calculPerfVariable();

    var base_IAOP_perf_juin = base_IAOP + perf_var[1];
    var base_IAOP_perf_dec = base_IAOP + perf_var[2];

    var tab = [base, base_IAOP, base_IAOP_perf_juin, base_IAOP_perf_dec];

    return tab;
}

function totalAssietteCRDS() {
    var assiettes = totalAssietteCSG();
    for (i in assiettes) {
        assiettes[i] += calculICM();
    }

    return assiettes;
}

function calculCotisationRAFP() {
    var v1 = 0.20 * calculSolde();
    var v_base = calculResidence() + calculSupplementFamilial() + calculPerfFixe() + calculIAOP() + calculCorpsTechnique() + calculMICM() + compensation_CSG + calculParticipationPSC();

    var v2_tab = calculPerfVariable();
    v2_tab[0] = 0.0;
    for (i in v2_tab) {
        v2_tab[i] += v_base;
    }


    var t = v2_tab.map(function (v2) { return round(Math.min(v1, v2) * 0.05, 2) });

    var egalite = (t[0] == t[1]) && (t[1] == t[2]);

    return [egalite, t];
}

function calculPrevoyanceAero() {
    return round(0.015 * calculCorpsTechnique(), 2);
}

function calculPrevoyanceMilitaire() {

    if (corps_tech) {
        return 0.0;
    } else {

        var table_ICM;

        var cat_familiale_ICM = calculCatFamilialeICM()

        if (lieu_garnison == 0) {
            // IDF
            table_ICM = ICM_logement_payant_paris
        } else {
            table_ICM = ICM_logement_payant_province
        }



        var taux = 0; // pour le calcul de prevoyance, seul le taux normal est utilisé

        var type_off = 1;

        if (estOfficierSuperieurOuGeneral()) {
            type_off = 0;
        }

        var ICM_prev = 0;

        for (let i = 0; i <= cat_familiale_ICM; i++) {
            ICM_prev += table_ICM[i][type_off][taux];
        }

        return round_inf((0.02 * ICM_prev / 12), 2);
    }
}

const taux_assiette_CSG_CRDS = 98.25 / 100;
const taux_CSG_deductible = 6.8 / 100;
const taux_CSG_non_deductible = 2.4 / 100;
const taux_CRDS = 0.5 / 100;

function calculCSGDeductible() {
    var t = totalAssietteCSG().map(function (v) { return round(v * taux_assiette_CSG_CRDS * taux_CSG_deductible, 2) });
    return t;
}

function calculCSGNonDeductible() {

    return totalAssietteCSG().map(function (v) { return round(v * taux_assiette_CSG_CRDS * taux_CSG_non_deductible + taux_assiette_CSG_CRDS * (taux_CSG_non_deductible + taux_CSG_deductible) * calculICM(), 2) });
}

function calculCRDS() {
    return totalAssietteCRDS().map(function (v) { return round(v * taux_assiette_CSG_CRDS * taux_CRDS, 2) });
}

function textePerfVariable() {
    var perf_var = calculPerfVariable();

    return `${texteMontant(perf_var[1], true)} - Juin<br/>${texteMontant(perf_var[2], true)} - Décembre<br/>${texteMontant(perf_var[0], true)} - Total`;
}

function texteTableauCotisation(v) {
    // ${v[0]} € - Jan., Fév., Avr., Mai, Jui., Aou., Oct., Nov.<br/>
    return `${texteMontant(v[1])} - Mars, Septembre<br/> ${texteMontant(v[2])} - Juin<br/>${texteMontant(v[3])} - Décembre<br/> ${texteMontant(v[0])} - Autres mois`;
}

function texteMontant(v, show_zero = false) {
    if (v == 0 && !show_zero) {
        return "-"
    } else {
        return v.toFixed(2) + " €"
    }
}

function texteRAFP() {
    var rafp = calculCotisationRAFP();

    if (rafp[0]) {
        // egalite
        return texteMontant(rafp[1][0]);
    } else {

        return `${texteMontant(rafp[1][1])} - Juin<br/> ${texteMontant(rafp[1][2])} - Décembre<br/>${texteMontant(rafp[1][0])} - Autres mois`;

        texteTableauCotisation(rafp[1]);
    }
}