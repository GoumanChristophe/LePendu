// Déclaration d'une variable globale pour stocker le mot recherché
let searchWord;
let hide = document.querySelector('.lettre');
let img = document.querySelector('#img');

// Regex pour vérifier les caractères non autorisés
let regex = /[^a-zA-Z0-9\s]/;
let regex1 = /[^a-zA-Z]/;

// Liste des touches spéciales à ignorer
const specialKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape', 'Enter', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'CapsLock'];

// Déclaration des tableaux pour stocker les lettres incorrectes et correctes
let wrong = [];
let compare = [];

// Variables pour le calcul du score
let i = 0;
let maxScore = 100;
let correctAttempts = 0;
let totalAttempts = 0;
let maxIncorrectAttempts = 7;
let incorrectAttempts = 0;

// Fonction pour comparer les index de deux tableaux
function arraysEqual(a, b) {
    if (a.length !== b.length) return false; // Si les longueurs ne sont pas égales, les tableaux ne sont pas égaux
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false; // Si un élément à un index donné n'est pas égal, les tableaux ne sont pas égaux
    }
    return true; // Si tous les éléments sont égaux, les tableaux sont égaux
}

// Fonction asynchrone pour obtenir un mot aléatoire depuis une API
async function getName() {
    // Utilisation de fetch pour récupérer les données de l'API
    return fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json()) // Conversion de la réponse en JSON
        .then((words) => {
            // Extraction du mot aléatoire et conversion en majuscules
            let worda = words[0].name.toUpperCase();
            //console.log(worda);

            // Division du mot en un tableau de lettres
            searchWord = worda.split('');
            if (searchWord.some(letter => regex.test(letter))) {
                return getName(); // Si le mot contient des caractères non autorisés, réessayer
            }

            // Affichage du tableau de lettres dans la console
            //console.log(searchWord);
        });
}

// Fonction asynchrone pour afficher les lettres du mot recherché
async function getSearch() {
    // Appel de la fonction getName pour obtenir le mot recherché
    await getName();

    // Boucle pour parcourir chaque lettre du mot recherché
    for (let i = 0; i < searchWord.length; i++) {
        // Extraction de la lettre actuelle
        let word = searchWord[i];

        // Création d'un message HTML pour afficher la lettre et un trait
        const newMessage = `
        <div class="lettres">
            <span class="lettre" id="${word}" style="visibility: hidden;">${word}</span>
            <span class="${word}" id="lettre"><img src="./img/trait.png" alt="trait" class="trait"></span>
        </div>
        `;

        // Sélection de l'élément HTML avec l'ID 'tiret'
        let newLetter = document.querySelector('#tiret');

        // Ajout du message HTML à l'élément avec l'ID 'tiret'
        newLetter.innerHTML += newMessage;
    }
}

// Appel de la fonction getSearch pour afficher les lettres du mot recherché
getSearch();

document.addEventListener('keydown', function (event) {
    let overlay = document.querySelector(`#overlay`);
    let popup = document.querySelector(`#popup`);
    let input = event.key.toUpperCase();
    const upperCaseSpecialKeys = specialKeys.map(key => key.toUpperCase());

    // Vérifier si la touche appuyée est une lettre simple ou une touche spéciale
    if (regex1.test(input) || upperCaseSpecialKeys.includes(input)) {
        //console.log("Touche ignorée:", input);
        return; // Ignorer les touches non autorisées et les touches spéciales
    }

    let result = searchWord.includes(input);

    if (result) {
        // Augmenter le score pour une tentative correcte
        correctAttempts++;
        totalAttempts++;
        score = calculateScore();

        // Afficher la lettre correcte
        let vi = document.querySelectorAll(`#${input}`);
        vi.forEach(function (element) {
            element.style.visibility = 'visible';
        });

        // Ajouter la lettre correcte dans l'ordre correct
        let index = searchWord.indexOf(input);
        if (compare[index] === undefined) {
            compare[index] = input;
        }

        //console.log(compare);
        //console.log(searchWord);

        // Vérifier si le joueur a gagné
        if (arraysEqual(compare, searchWord)) {
            document.querySelector(`#title`).textContent = "BRAVO";
            document.querySelector(`#text`).innerHTML = `Tu as obtenu un score de ${score.toFixed()}/100`;
            overlay.style.visibility = 'visible';
            popup.style.visibility = 'visible';
            document.querySelector(`#croix`).style.visibility = 'hidden';
            i = 0;
            maxScore = 100;
            correctAttempts = 0;
            totalAttempts = 0;
            maxIncorrectAttempts = 7;
            incorrectAttempts = 0;
        }
    } else {
        // Augmenter le nombre total de tentatives pour une tentative incorrecte
        incorrectAttempts++;
        totalAttempts++;
        score = calculateScore();

        wrong.push(input);
        document.querySelector(`#croix`).style.visibility = 'visible';
        document.querySelector(`#wrongWord`).style.visibility = 'visible';

        wrongWord.textContent = wrong.join(', '); // Affiche les mots incorrects
        i++;
        img.src = `./img/phase${i}.png`;
        //console.log(i);
        if (i === 7) {
            document.querySelector(`#title`).textContent = "PERDU";
            document.querySelector(`#text`).innerHTML = `Dommage ! Le mot était "<strong>${searchWord.join('')}</strong>". La prochaine fois sera la bonne.`;
            overlay.style.visibility = 'visible';
            popup.style.visibility = 'visible';
            document.querySelector(`#croix`).style.visibility = 'hidden';
            //console.log("Perdu");
        }
    }

    //console.log("letter =" + input);
});

let reloadButton = document.querySelector('#replay');

reloadButton.addEventListener('click', function () {
    // Rechargez la page
    location.reload();
});

function calculateScore() {
    // Calculer le score en fonction du nombre de tentatives correctes
    let correctScore = (correctAttempts / searchWord.length) * maxScore;
    //console.log("Correct Score:", correctScore);

    // Calculer la pénalité en fonction du nombre de tentatives incorrectes
    let incorrectPenalty = (incorrectAttempts / maxIncorrectAttempts) * maxScore;
    //console.log("Incorrect Penalty:", incorrectPenalty);

    // Calculer le score final en soustrayant la pénalité du score basé sur les tentatives correctes
    score = correctScore - incorrectPenalty;

    // Assurez-vous que le score ne dépasse pas le score maximum et ne soit pas négatif
    score = Math.max(0, Math.min(score, maxScore));

    //console.log("Final Score:", score);
    return score;
}
