let searchWord;


async function getName(){
return fetch("https://trouve-mot.fr/api/random/1")
    .then((response) => response.json())
    .then((words) => {
        //console.log(words);
       
         let worda = words[0].name.toUpperCase();
        searchWord = worda.split('');   
        
            
        
        //console.log(word)
        console.log( searchWord)
    });
}



async function getSearch () {

     getName().then(() => {
    //console.log(searchWord)

    for (let i = 0; i < searchWord.length; i++) {
        //console.log(searchWord)
        //console.log('searchWord:', searchWord); // Affiche la structure de searchWord
        let word = searchWord[i];
      
       //console.log(word[i])
        

        const newMessage = ` 
        <div class="lettres">
        <span class="lettre" id="${word}" style="display: flex;">${word}</span>
        <span class="${word}" id="lettre"><img src="./img/trait.png" alt="trait" class="trait"></span>
        </div>
        `;
        let newLetter = document.querySelector('#tiret'); 
        let hide = document.querySelector('.lettre');
        //console.log('newMessage:', newMessage);
        
        
        
            newLetter.innerHTML += newMessage;
      
    }  
});
}

getSearch()