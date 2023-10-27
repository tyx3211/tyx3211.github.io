let extraStyle=document.querySelector(".added-by-js");

let Mark=1;
let autoMark=[];
let autoFlag=0;

//设置向左动画
for(let i=1;i<=7;i++){
    extraStyle.innerHTML+=" .animation"+i+"{animation: item"+i+"_animation 1s;animation-fill-mode: forwards;}"
}

for(let i=2;i<=7;i++){
    let startBlock=document.getElementsByClassName("item"+String(i))[0];
    let endBlock=document.getElementsByClassName("item"+String(i-1))[0];
    let startHeight=String(startBlock.offsetHeight/innerHeight*100)+"%";
    let startWidth=String(startBlock.offsetWidth/innerWidth*100)+"%";
    let startLeft=String(startBlock.offsetLeft/innerWidth*100)+"%";
    let endHeight=String(endBlock.offsetHeight/innerHeight*100)+"%";
    let endWidth=String(endBlock.offsetWidth/innerWidth*100)+"%";
    let endLeft=String(endBlock.offsetLeft/innerWidth*100)+"%";
    extraStyle.innerHTML+=" @keyframes item"+i+"_animation {from{left:"+startLeft+";height:"+startHeight+";width:"+startWidth+";}to{left:"+endLeft+";height:"+endHeight+";width:"+endWidth+";}}";
}

//设置向右动画
for(let i=1;i<=7;i++){
    extraStyle.innerHTML+=" .animationR"+i+"{animation: r"+i+"_animation 1s;animation-fill-mode: forwards;}"
}

for(let i=1;i<=6;i++){
    let startBlock=document.getElementsByClassName("item"+String(i))[0];
    let endBlock=document.getElementsByClassName("item"+String(i+1))[0];
    let startHeight=String(startBlock.offsetHeight/innerHeight*100)+"%";
    let startWidth=String(startBlock.offsetWidth/innerWidth*100)+"%";
    let startLeft=String(startBlock.offsetLeft/innerWidth*100)+"%";
    let endHeight=String(endBlock.offsetHeight/innerHeight*100)+"%";
    let endWidth=String(endBlock.offsetWidth/innerWidth*100)+"%";
    let endLeft=String(endBlock.offsetLeft/innerWidth*100)+"%";
    extraStyle.innerHTML+=" @keyframes r"+i+"_animation {from{left:"+startLeft+";height:"+startHeight+";width:"+startWidth+";}to{left:"+endLeft+";height:"+endHeight+";width:"+endWidth+";}}";
}

//执行
function right(){
    if(!Mark){
        return;
    }
    Mark=0;
    for(let i=1;i<=7;i++){
        let photoBox=document.getElementsByClassName("item"+i)[0];
        photoBox.className+=" animation"+i;
        setTimeout(()=>{
            switch(i){
                case 1:
                    photoBox.style.zIndex=9;
                    break;
                case 2:
                    photoBox.style.zIndex=9;
                    break;
                case 3:
                    photoBox.style.zIndex=18;
                    break;
                case 4:
                    photoBox.style.zIndex=27;
                    break;
                case 5:
                    photoBox.style.zIndex=36;
                    break;
                case 6:
                    photoBox.style.zIndex=27;
                    break;
                case 7:
                    photoBox.style.zIndex=18;
                    break;
            }
        },500);
        setTimeout(()=>{
            if(i!=1){
                photoBox.className="item item"+String(i-1);
            }
            else{
                photoBox.className="item item7";
            }
            Mark=1;
        },1000);
    }
}

function left(){
    if(!Mark){
        return;
    }
    Mark=0;
    for(let i=1;i<=7;i++){
        let photoBox=document.getElementsByClassName("item"+i)[0];
        photoBox.className+=" animationR"+i;
        setTimeout(()=>{
            switch(i){
                case 1:
                    photoBox.style.zIndex=18;
                    break;
                case 2:
                    photoBox.style.zIndex=27;
                    break;
                case 3:
                    photoBox.style.zIndex=36;
                    break;
                case 4:
                    photoBox.style.zIndex=27;
                    break;
                case 5:
                    photoBox.style.zIndex=18;
                    break;
                case 6:
                    photoBox.style.zIndex=9;
                    break;
                case 7:
                    photoBox.style.zIndex=9;
                    break;
            }
        },500);
        setTimeout(()=>{
            if(i!=7){
                photoBox.className="item item"+String(i+1);
            }
            else{
                photoBox.className="item item1";
            }
            Mark=1;
        },1000);
    }
}

//添加自动播放或停止自动播放

for(let i=0;i<=9;i++){
    autoMark[i]=0;
}

for(let i=1;i<=7;i++){
    let checkBox=document.getElementsByClassName("item"+i)[0];
    checkBox.onmouseover=()=>{
        autoMark[i]=1;
    };
}

for(let i=1;i<=7;i++){
    let checkBox=document.getElementsByClassName("item"+i)[0];
    checkBox.onmouseout=()=>{
        autoMark[i]=0;
    };
}

for(let i=1;i<=2;i++){
    let checkButton=document.getElementsByClassName("button"+i)[0];
    checkButton.onmouseover=()=>{
        autoMark[i+7]=1;
    };
}

for(let i=1;i<=2;i++){
    let checkButton=document.getElementsByClassName("button"+i)[0];
    checkButton.onmouseout=()=>{
        autoMark[i+7]=0;
    };
}

setInterval(()=>{
    for(let i=1;i<=9;i++){
        if(i===1){
            autoFlag=0;
        }
        autoFlag+=autoMark[i];
    }
    if(!autoFlag){
        right();
    }
},2500);
