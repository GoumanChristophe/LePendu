const input = document.querySelector('#mot')

let searchWord = [];

const word = fetch("https://trouve-mot.fr/api/random/1")
    .then((response) => response.json())
    .then((words) => console.log(words))

console.log(word);
word = word.split('');
searchWord.push(word);

console.log(searchWord);

/*for (i = 0; i < word.length; i++) {

    word = word[i];
    console.log(word)
    console.log("insertion")

    const newMessage = ` 
    <span class="lettre" id="L${i}></span>
    <span id=${i}>_</span>
    `;

    document.querySelector('#tiret').innerHTML += newMessage;
} */ 