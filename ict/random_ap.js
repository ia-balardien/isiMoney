


var ligne_grade_echelon = 0;
var seum = 0;

window.onload = function () {
    document.getElementById("seum_range").value = 0;
    document.getElementById("seum_text").value = 0;
};


function resetTexteAP() {
    document.getElementById("resultat_AP").innerHTML = "";
    document.getElementById("block_result").className = "d-none invisible";
}

function updateSeumSlider() {
    seum = document.getElementById("seum_range").value;
    document.getElementById("seum_text").value = seum;

    resetTexteAP();
}

function updateSeumText() {
    seum = parseInt(document.getElementById("seum_text").value);
    seum = Math.min(Math.max(seum, 0), 100);
    document.getElementById("seum_text").value = seum;
    document.getElementById("seum_range").value = seum;

    resetTexteAP();
}

function updateGrade() {
    ligne_grade_echelon = document.getElementById("grade").selectedIndex;

    resetTexteAP();
}


const phrases_AP = [
    // ICT I
    [
        "Une A-quoi ?",
        "Vous êtes jeune, est-ce que vous avez vraiment besoin d'une augmentation ?",
        "Vous venez d'arriver, faites vos preuves. AP réduite pour vous encourager."
    ],
    // ICT II
    [
        "Dommage, vous n'atteindrez jamais le plancher ICT III A. J'en déduis donc que c'est inutile de vous augmenter.",
        "Bonne nouvelle, vous allez avoir une AP. Mauvaise nouvelle, elle sera de 15€ bruts",
        "Vous venez de passer ICT II ? Ah mais la baisse technique nous empêche de vous donner une AP bonifiée.",
        "Oui, c'est tombé sur vous, vous allez avoir l'AP exceptionnelle que vous méritez depuis 4 ans. Comment ca, vous démissionnez ?"
    ],
    // ICT III A
    [
        "Bien essayé, mais vous n'aurez pas d'AP cette année. Retentez votre chance l'année prochaine. Vous ne serez plus là l'an prochain ?",
        "Déso, les Ingénieurs de l'armement ont pris tout l'argent affecté au Minarm pour revaloriser les salaires des agents de la DGA. Vous aurez donc une AP de 22€"
    ],
    // ICT III B
    [
        "Bonne nouvelle, vous allez avoir une AP. Mauvaise nouvelle, elle sera de 15€ bruts",
        "Malheureusement, ICT III B rime rarement avec AP B.",
        "Bravo, une AP bonifié. Fun fact : en 2022, cela correspond à 2% de l'augmentation d'un Ingénieur de l'armement. "
    ],
    // ICT III B SUP
    [
        "ICT III B SUP, a priori pas besoin d'augmentation",
        "Depuis le temps que vous êtes là, est-ce que vous pensez vraiment que l'institution à quelque chose à faire de vous",
        "Bonne nouvelle, vous avez eu une AP bonifiée. Mais comme vous êtes III B SUP, vous êtes donc manager et cela en fait une de moins pour votre équipe. Remettez à 0 votre taux de seum et partagez le sur vos subordonnés."
        // "III B SUP, mais vous êtes donc manager ? Partagez donc, le sort de vos subordonnées."
    ],
    // ICT III C
    [
        "ICT III C, a priori pas besoin d'augmentation",
        "Vous avez beaucoup trop de seum pour un ICT III C. Est-ce bien raisonnable ?"
        // "Si vous êtes ICT III C, peut-être que vous êtes une partie du problème ?"
    ]
]

function calculAP() {
    const n_phrases = phrases_AP[ligne_grade_echelon].length;
    var index = Math.floor(n_phrases * seum / 101);
    document.getElementById("resultat_AP").innerHTML = phrases_AP[ligne_grade_echelon][index];
    document.getElementById("block_result").className = "visible";
}