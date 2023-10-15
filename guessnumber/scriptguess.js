let stratgame=document.querySelector(".start");
let GuessField=document.querySelector(".guessfield");
let GuessSubmit=document.querySelector(".guessSubmit");
let DIV=document.querySelector(".Div");
let resetgame=document.querySelector(".reset");
let Recordp=document.querySelector("#recordp");
let Respondp=document.querySelector("#respondp");
let Tellp=document.querySelector("#tellp");
let startcheck=0;
let numcheck=1;
let wincheck=0;

DIV.hidden=1;
let aimnum=Math.floor(Math.random()*100)+1;

stratgame.addEventListener("click",()=>{
    if (!startcheck) {
        alert("Let's start!");
        DIV.hidden=0;
        startcheck=1;
    }
});

resetgame.addEventListener("click",()=>{
    startcheck=0;
    numcheck=1;
    wincheck=0;
    aimnum=Math.floor(Math.random()*100)+1;
    alert("Reset the game!");
    Recordp.textContent="History guess:";
    Recordp.style.backgroundColor="aliceblue";
    resetgame.textContent="重来";
    GuessField.value="";
    Tellp.style.color="blue";
    Tellp.textContent="";
    Respondp.style.color="orange";
    Respondp.textContent="";
    DIV.hidden=1;
});

function checkguess(){
    let guessvalue=Number(GuessField.value);
    if (numcheck<=10&&!wincheck) {
        if (guessvalue===aimnum) {
            wincheck=1;
            GuessField.value="";
            Recordp.textContent=Recordp.textContent+guessvalue;
            Recordp.style.backgroundColor="green";
            Respondp.style.color="red";
            Tellp.style.color="red";
            Respondp.textContent="猜对了！";
            if(numcheck<5){
                Tellp.textContent="牛！";
            }
            else if(numcheck<8){
                Tellp.textContent="还成。";
            }
            else{
                Tellp.textContent="勉强吧。。。";
            }
        }else{
            GuessField.value="";
            Recordp.style.backgroundColor="red";
            if(numcheck===10){
                Recordp.textContent=Recordp.textContent+guessvalue;
            }
            else{
                Recordp.textContent=Recordp.textContent+guessvalue+" ";
            }
            if(guessvalue>aimnum){
                Respondp.textContent="大了！";
            }
            else{
                Respondp.textContent="小了！";
            }
            if(numcheck===6){
                Tellp.textContent="呃呃。。。";
            }else if(numcheck===7){
                Tellp.textContent="这都猜不对？？";
            }else if(numcheck===8){
                Tellp.textContent="兄弟你行不？";
            }else if(numcheck===9){
                Tellp.textContent="要寄了。。。";
            }else if(numcheck===10){
                Tellp.textContent="寄！";
                resetgame.textContent="再来一次";
            }
        }
    }
    else{
        alert("Let’s play the game again!");
        GuessField.value="";
    }
    numcheck++;
}

GuessSubmit.addEventListener("click",checkguess);




