//variare solo questi parametri
const cellNum=16;//numero di celle su una riga/colonna
const timeInterval=160;//in millisecondi
let currentLength=3;//lunghezza iniziale
let headX=Math.floor(cellNum/4);//posizione iniziale
let headY=Math.floor(cellNum/2);
let currentDirection="right";//direzione iniziale

let directionFlag=0;

const grid=document.querySelector(".grid");

for(let y=cellNum; y>0; y--){
    for(let x=1; x<=cellNum; x++){
        const cell=document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
    }
}
//riferimento a tutte le celle
const cells=document.querySelectorAll(".cell");
//piazzo prima mela
let appleX=Math.floor(Math.random()*cellNum)+1;
let appleY=Math.floor(Math.random()*cellNum)+1;
let appleIndex=(cellNum-appleY)*cellNum+appleX-1;

cells[appleIndex].classList.add("apple");




//activateCell(headX,headY,5);
const snakeMovement=setInterval(function(){
    moveHead(currentDirection, currentLength);
    
    if(headX==appleX && headY==appleY){
        currentLength++;
        document.querySelector(".apple").classList.remove("apple");
        placeApple();
        
    }
    document.getElementById("lunghezza").innerText=currentLength;
    directionFlag=0;
    
    
},timeInterval);
//ogni cella se fa parte dello snake deve avere un timer
//che la spegne quando serve

document.addEventListener("keydown",changeDirection);

//questa funzione prende una cella e la lunghezza dello snake
//e la tiene accesa per quel tot di tempo
function activateCell(cellX,cellY,snakeLength){
    const cellIndex=(cellNum-cellY)*cellNum+cellX-1;
    
    if(cells[cellIndex].classList.contains("activeCell")){
        console.log("game over");
        showAlert(`Game over! Lunghezza: ${currentLength}`);
        clearInterval(snakeMovement);
    }
    cells[cellIndex].classList.add("activeCell");
    // cells[cellIndex].classList.add("headCell");
    let maxLength=snakeLength;
    // const colorStep=Math.floor(255/snakeLength);
    // let color=255;
    // cells[cellIndex].setAttribute("style",`background-color:rgb(${color},${color},${color});`);
    const activeCell = setInterval(function(){  
        
        // if(snakeLength==maxLength){
        //     cells[cellIndex].classList.remove("headCell");
        // }
        snakeLength--;
        // color=color-colorStep;
        // if(color>=0){
        //     cells[cellIndex].setAttribute("style",`background-color:rgb(${color},${color},${color});`);
        // }
        
        if(snakeLength==0){
            cells[cellIndex].classList.remove("activeCell")
        }
    }, timeInterval);
}

//usare la seguente funzione per effetto pacman attivo
function moveHead(direction, length){
    switch(direction){
        case "up":
            headY++;
            if(headY==cellNum+1) {headY=1;}
            break;            
        case "down":
            headY--;
            if(headY==0) {headY=cellNum;}
            break;
        case "left":
            headX--;
            if(headX==0) {headX=cellNum;}
            break;
        case "right":
            headX++;
            if(headX==cellNum+1) {headX=1;}
            break;
    }
    activateCell(headX,headY,length);
}

//usare la seguente funzione per effetto pacman non attivo
// function moveHead(direction, length){
//     switch(direction){
//         case "up":
//             headY++;
//             break;            
//         case "down":
//             headY--;
//             break;
//         case "left":
//             headX--;
//             break;
//         case "right":
//             headX++;
//             break;
//     }
//     if(headY==cellNum+1 || headY==0 || headX==0 || headX==cellNum+1)
//     {
//         clearInterval(snakeMovement);
//         showAlert(`Game over!   Lunghezza: ${currentLength}`);
//         return;
//     }
//     activateCell(headX,headY,length);
// }

function changeDirection(event){
    if(directionFlag===0){
        directionFlag=1;
        switch(event.code){
            case "KeyW":
                if(currentDirection!="down"){
                    currentDirection="up";
                }
                break;
            case "KeyD":
                if(currentDirection!="left"){
                    currentDirection="right";
                }
                break;
            case "KeyS":
                if(currentDirection!="up"){
                    currentDirection="down";
                }
                break;
            case "KeyA":
                if(currentDirection!="right"){
                    currentDirection="left";
                }
                break;
            case "KeyP":
                clearInterval(snakeMovement);
                showAlert(`Game over!   Lunghezza: ${currentLength}`);
                break;
        }
    }
}

function placeApple(){
    //document.querySelector(".apple").classList.remove("apple");
    appleX=Math.floor(Math.random()*cellNum)+1;
    appleY=Math.floor(Math.random()*cellNum)+1;
    appleIndex=(cellNum-appleY)*cellNum+appleX-1;
    //console.log(appleX,appleY);
    if(!cells[appleIndex].classList.contains("activeCell")){
        cells[appleIndex].classList.add("apple");
    }else{
        placeApple();
        console.log("cambiato posto mela");
    }
}

function showAlert(message){
    const gameArea = document.querySelector('.gameArea');
    const alertMessage = `
    <div class="game-alert">
        <div class="game-alert-message">${message}</div>  
        <div class="rigioca">Rigioca</div>     
    </div>
    `;
    gameArea.innerHTML = gameArea.innerHTML + alertMessage;
    document.querySelector(".rigioca").addEventListener("click",reloadPage);
}

function reloadPage(){
    window.location.reload();
}