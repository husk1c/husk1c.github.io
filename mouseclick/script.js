const body = document.querySelector('#body');
const remove = document.querySelector('#remove');
const undo = document.getElementById('undo');
var positionArray = new Array;
var removedpositionsArray = new Array;

function createElement([a]){
    var newElement = document.createElement('div');
    body.appendChild(newElement);
    newElement.innerHTML = 'O';
    newElement.style.position = 'absolute';
    newElement.style.left = a[0] + "px";
    newElement.style.top = a[1] -20 + "px";
    newElement.style.userSelect = 'none';
}

body.addEventListener('pointerdown', (e)=>{
    var x = e.clientX;
    var y = e.clientY;
    positionArray.push([x,y]);
    createElement(positionArray.slice(-1));
})

remove.addEventListener('click', ()=>{
    var tempArray = new Array;
    tempArray = [...positionArray];
    removedpositionsArray.push(tempArray.pop());
    positionArray = [...tempArray];
    body.removeChild(body.lastChild);
})

undo.addEventListener('click', ()=>{
    createElement([removedpositionsArray.pop()]);
})