// Déclaration d'une variable globale pour stocker le mot recherché
let searchWord;

// Fonction asynchrone pour obtenir un mot aléatoire depuis une API
async function getName() {
    // Utilisation de fetch pour récupérer les données de l'API
    return fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json()) // Conversion de la réponse en JSON
        .then((words) => {
            // Affichage des mots récupérés dans la console (commenté)
            // console.log(words);

            // Extraction du mot aléatoire et conversion en majuscules
            let worda = words[0].name.toUpperCase();
            // Division du mot en un tableau de lettres
            searchWord = worda.split('');

            // Affichage du tableau de lettres dans la console
            console.log(searchWord);
        });
}

// Fonction asynchrone pour afficher les lettres du mot recherché
async function getSearch() {
    // Appel de la fonction getName pour obtenir le mot recherché
    getName().then(() => {
        // Affichage du mot recherché dans la console 
        // console.log(searchWord)

        // Boucle pour parcourir chaque lettre du mot recherché
        for (let i = 0; i < searchWord.length; i++) {
            // Affichage du mot recherché dans la console 
            // console.log(searchWord)
            // Affichage de la structure de searchWord dans la console 
            // console.log('searchWord:', searchWord);

            // Extraction de la lettre actuelle
            let word = searchWord[i];

            // Affichage de la lettre actuelle dans la console 
            // console.log(word[i])

            // Création d'un message HTML pour afficher la lettre et un trait
            const newMessage = `
            <div class="lettres">
                <span class="lettre" id="${word}" style="display: flex;">${word}</span>
                <span class="${word}" id="lettre"><img src="./img/trait.png" alt="trait" class="trait"></span>
            </div>
            `;

            // Sélection de l'élément HTML avec l'ID 'tiret'
            let newLetter = document.querySelector('#tiret');
            // Sélection de l'élément HTML avec la classe 'lettre'
            let hide = document.querySelector('.lettre');

            // Affichage du message HTML dans la console (commenté)
            // console.log('newMessage:', newMessage);

            // Ajout du message HTML à l'élément avec l'ID 'tiret'
            newLetter.innerHTML += newMessage;
        }
    });
}

// Appel de la fonction getSearch pour afficher les lettres du mot recherché
getSearch();
