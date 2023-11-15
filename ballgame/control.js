let gameBg=document.querySelector(".gamebg");
let canvas=document.querySelector("canvas");
let scoresText=document.querySelector("span");
let startButton=document.querySelector("button");
let ctx=canvas.getContext("2d");
let stdWidth=gameBg.clientWidth;
let stdHeight=gameBg.clientHeight;
let stdX=0.5*(innerWidth-stdWidth);
let stdY=0.5*(innerHeight-stdHeight);
canvas.setAttribute("width",String(stdWidth));
canvas.setAttribute("height",String(stdHeight));
let brickWidth=0.1*stdWidth;
let brickHeight=0.09*stdHeight;
let padWidth=1.5*brickWidth;
let padHeight=0.3*brickHeight;
let radius=0.1*brickWidth;
let ballSpeed=2;
let angle=-Math.PI/2;

let gamecheck=4;
let scores=0;
let ballX;
let ballY;
let padX;
let bricks=[];
for(let i=0;i<10;i++){
    bricks[i]=[];
}
for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        if(j===0||j===9||i>=5){
            bricks[i][j]=0
        }
        else{
            bricks[i][j]=1;
        }
    }
}

canvas.focus();

//load images
let brickImg=new Image();
brickImg.src="image/brick.png";
let padImg=new Image();
padImg.src="image/pad.png";
let ballImg=new Image();
ballImg.src="image/blueball.png";
let overImg=new Image();
overImg.src="image/gameover.png";
let imgCheck=[0,0,0,0,0];
let WinnerImg=new Image();
WinnerImg.src="image/congratulations.png";

padImg.onload=function(){
    imgCheck[0]=1;
}
brickImg.onload=function(){
    imgCheck[1]=1;
}
ballImg.onload=function(){
    imgCheck[2]=1;
}
overImg.onload=function(){
    imgCheck[3]=1;
}
WinnerImg.onload=function(){
    imgCheck[4]=1;
}


//保证angle在[-Pi/2,3Pi/2)之间
function transAngle(){
    if((angle>(Math.PI/2))&&(angle<(Math.PI*3/2))){
        angle=-angle+2*Math.PI;
    }else{
        angle*=-1;
    }
}

function drawBricks(){
    for(let i=0;i<5;i++){
        for(let j=0;j<10;j++){
            if(bricks[i][j]){
                let brickY=i*brickHeight;
                let brickX=j*brickWidth;
                ctx.drawImage(brickImg,brickX,brickY,brickWidth,brickHeight);
            }
        }
    }
}

function drawBall(){
    ctx.drawImage(ballImg,ballX-radius,ballY-radius,2*radius,2*radius);
}

function drawPad(){
    ctx.clearRect(0,stdHeight-padHeight,stdWidth,padHeight);
    ctx.drawImage(padImg,padX-0.5*padWidth,stdHeight-padHeight,padWidth,padHeight);
}

function drawScores(){
    scoresText.innerHTML="得分："+scores;
}

function wallCollision(){
    if(ballX<radius||ballX>stdWidth-radius){
        angle=Math.PI-angle;
    }
    if(ballY<radius){
        transAngle();
    }
    if(ballY>stdHeight-padHeight-0.75*radius){
        if((ballX>padX-0.5*padWidth)&&(ballX<padX+0.5*padWidth)){
            transAngle();
        }
        else{
            gamecheck=3;
        }
    }
}

function Judge(judge){
    let colCheck=Math.floor(ballX/brickWidth);
    let rowCheck=Math.floor(ballY/brickHeight);
    let upCheck=1;
    let downCheck=1;
    let leftCheck=1;
    let rightCheck=1;

    if((colCheck>=1)&&(colCheck<=9)&&(rowCheck<=5)&&(ballX<=colCheck*brickWidth+judge)&&(ballX>=colCheck*brickWidth)&&(bricks[rowCheck][colCheck-1]===1)){
        if((angle>Math.PI/2)&&(angle<Math.PI*3/2)){
            leftCheck=0;
            bricks[rowCheck][colCheck-1]=0;
            angle=Math.PI-angle;
            scores++;
        }else{
            //优化
            leftCheck=0;
            bricks[rowCheck][colCheck-1]=0;
            transAngle();
            scores++;
        }
    }else if((ballX>=(colCheck+1)*brickWidth-judge)&&(ballX<=(colCheck+1)*brickWidth)&&(colCheck>=0)&&(colCheck<=8)&&(rowCheck<=5)&&(bricks[rowCheck][colCheck+1]===1)){
        if(!((angle>Math.PI/2)&&(angle<Math.PI*3/2))){
            rightCheck=0;
            bricks[rowCheck][colCheck+1]=0;
            angle=Math.PI-angle;
            scores++;
        }else{
            //优化
            rightCheck=0;
            bricks[rowCheck][colCheck+1]=0;
            transAngle();
            scores++;
        }
    }else if((rowCheck>=1)&&(rowCheck<=5)&&(ballY<=rowCheck*brickHeight+judge)&&(ballY>=rowCheck*brickHeight)&&(bricks[rowCheck-1][colCheck]===1)){
        if(!(angle>=0&&angle<=Math.PI)){
            upCheck=0;
            bricks[rowCheck-1][colCheck]=0;
            transAngle();
            scores++;
        }else{
            //优化
            upCheck=0;
            bricks[rowCheck-1][colCheck]=0;
            angle=Math.PI-angle;
            scores++;
        }
    }else if((rowCheck>=0)&&(rowCheck<=4)&&(ballY>=(rowCheck+1)*brickHeight-judge)&&(ballY<=(rowCheck+1)*brickHeight)&&(bricks[rowCheck+1][colCheck]===1)){
        if(angle>0&&angle<Math.PI){
            downCheck=0;
            bricks[rowCheck+1][colCheck]=0;
            transAngle();
            scores++;
        }else{
            //优化
            downCheck=0;
            bricks[rowCheck+1][colCheck]=0;
            angle=Math.PI-angle;
            scores++;
        }
    }
    return upCheck*downCheck*leftCheck*rightCheck;
}

function bricksCollision(){
    //边缘未判定成功再保中心
    if(ballY<=5*brickHeight+radius){
        if(Judge(radius)){
            let colCheck=Math.floor(ballX/brickWidth);
            let rowCheck=Math.floor(ballY/brickHeight);
            if(rowCheck<=4){
                if(bricks[rowCheck][colCheck]===1){
                    bricks[rowCheck][colCheck]=0;
                    angle=Math.PI-angle;
                    scores++;
                }
            }
        }
    }
}

function draw(){
    if(imgCheck[0]*imgCheck[1]*imgCheck[2]*imgCheck[3]*imgCheck[4]){
        if(gamecheck!=3&&gamecheck!=4){
            ctx.clearRect(0,0,stdWidth,stdHeight-padHeight);
            drawBricks();
            drawPad();
            drawBall();
            drawScores();
            if(gamecheck===2){
                if(scores===20){
                    ballSpeed=3;
                }
                ballX+=ballSpeed*Math.cos(angle);
                ballY+=ballSpeed*Math.sin(angle);
                wallCollision();
                bricksCollision();
                if(scores===40){
                    gamecheck=3;
                }
            }
        }
        else if(gamecheck===3){
            if(scores===40){
                drawScores();
                let text="最终得分："+scores;
                ctx.clearRect(0,0,stdWidth,stdHeight);
                ctx.drawImage(WinnerImg,0,0,stdWidth,stdHeight);
                ctx.fillstyle="black";
                ctx.font="50px sans-serif";
                ctx.fillText(text,0.5*stdWidth-175,0.1*stdHeight);
                startButton.innerHTML="再来一次";
            }
            else{
                let text="最终得分："+scores;
                ctx.clearRect(0,0,stdWidth,stdHeight);
                ctx.drawImage(overImg,0,0,stdWidth,stdHeight);
                ctx.fillstyle="black";
                ctx.font="50px sans-serif";
                ctx.fillText(text,0.5*stdWidth-175,0.1*stdHeight);
                startButton.innerHTML="重新开始";
            }
        }
    }
}

function start(){
    if(gamecheck===3||gamecheck===4){
        canvas.focus();
        startButton.innerHTML="结束";
        padX=0.5*stdWidth;
        ballX=padX;
        ballY=0.9*stdHeight;
        gamecheck=0;
        scores=0;
        ballSpeed=2;
        for(let i=0;i<5;i++){
            for(let j=1;j<9;j++){
                bricks[i][j]=1;
            }
        }
        draw();
    }else{
        gamecheck=3;
    }
}

function movePad(event){
    let x;
    if(gamecheck===0){
        x=event.clientX-stdX;
        padX=x;
        ballX=padX;
    }else if(gamecheck===2){
        x=event.clientX-stdX;
        padX=x;
    }
}

function controlGame(event){
    if(gamecheck===0){
        gamecheck++;
    }else if(gamecheck===1){
        let x=event.clientX-stdX;
        let y=event.clientY-stdY;
        if(x===ballX){
            if(y<=ballY){
                angle=-Math.PI/2;
            }else{
                angle=Math.PI/2;
            }
        }else if(x>ballX){
            angle=Math.atan((y-ballY)/(x-ballX));
        }else{
            angle=Math.PI+Math.atan((y-ballY)/(x-ballX));
        }
        gamecheck++;
    }
}

startButton.addEventListener("click",start);
canvas.addEventListener("mousemove",movePad);
canvas.addEventListener("click",controlGame);
let Interval=setInterval(draw,3);
