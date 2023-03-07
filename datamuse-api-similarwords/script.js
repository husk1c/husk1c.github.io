const form = document.querySelector('form');
const error = document.querySelector('.error');
const wordContainer = document.querySelector('.generatedWords-container');
const inputBox = document.getElementsByName('targetWord');

async function callApi(targetWord){
    let response = await fetch(`https://api.datamuse.com/words?ml=${targetWord}`);
    let data = await response.json();
    return data;
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const targetWord = data.get('targetWord');
    if(!targetWord){
        error.classList.remove('hidden');
    }else{
        error.classList.add('hidden');
        deleteCurrent();
        callApi(targetWord).then(words => {
            handleWords(words);
        })        
    }
})

function deleteCurrent(){
    const entries = document.querySelectorAll('li');
    entries.forEach(li => {
        li.remove();
    });
}

function handleWords(arr){
    arr.forEach(element =>{
        const li = document.createElement('li');
        li.textContent = element.word;
        wordContainer.appendChild(li);
        li.addEventListener('click', ()=>{
            targetWord = li.innerHTML;
            deleteCurrent();
            callApi(targetWord).then(words =>{
                handleWords(words);
            });
        })
    });
}


