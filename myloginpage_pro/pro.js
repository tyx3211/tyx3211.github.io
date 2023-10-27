let sign_in_input=document.querySelectorAll(".form-box input");
let sign_up_input=document.querySelectorAll(".sign-box input");
let sign_up_text=document.querySelector(".tip");
let inButton=document.querySelector("#sign_in");
let upButton=document.querySelector("#sign_up");
let myDelete=document.querySelector("#delete");
let myIntro=document.querySelector(".myIntro");
let mySignIn=document.querySelector(".form-box");
let mySignUp=document.querySelector(".sign-box");
let backNext=document.querySelector(".backnext");
let toSignUp=document.querySelector(".search-btn");
let backSignIn=document.querySelector(".back-btn");
let accountNum=0;

sign_in_input[0].focus();

toSignUp.addEventListener("click",()=>{
    mySignIn.style.bottom="150%";
    mySignUp.style.top="50%";
});

backSignIn.addEventListener("click",()=>{
    mySignIn.style.bottom="50%";
    mySignUp.style.top="150%";
});

backNext.addEventListener("click",()=>{
    myIntro.style.bottom="150%";
    mySignIn.style.bottom="50%";
})

function clearSignIn(){
    sign_in_input[0].value="";
    sign_in_input[1].value="";
    sign_in_input[0].focus();
}

function clearSignUp(){
    sign_up_input[0].value="";
    sign_up_input[1].value="";
    sign_up_input[2].value="";
    sign_up_input[0].focus();    
}

function displayIntro(){
    mySignIn.style.bottom="-50%";
    myIntro.style.bottom="50%";
}

function signIn(){
    let account=sign_in_input[0].value;
    let password=sign_in_input[1].value;
    let accountCheck=0;
    if(!account){
        alert("账号不能为空！");
        clearSignIn();
        return;
    }else if(!password){
        alert("密码不能为空！");
        clearSignUp();
        return;
    }
    for(let i=1;i<=10;i++){
        if(account===localStorage.getItem("account"+i)){
            accountCheck=i;
            break;
        }
    }
    if(!accountCheck){
        alert("未注册该账号！");
        clearSignIn();
        return;
    }
    else{
        if(password!=localStorage.getItem("password"+accountCheck)){
            alert("密码不对！");
            clearSignIn();
            return;
        }
        else{
            alert("WELCOME:"+account+"!");
            clearSignIn();
            displayIntro();
        }
    }
}

function signUp(){
    let account=sign_up_input[0].value;
    let password=sign_up_input[1].value;
    let repeat=sign_up_input[2].value;
    if(!account){
        alert("账号不能为空！");
        clearSignUp();
        return;
    }
    else if(!password){
        alert("密码不能为空！");
        clearSignUp();
        return;
    }else if(!repeat){
        alert("请重复输入密码！");
        clearSignUp();
        return;
    }
    for(let i=1;i<=10;i++){
        if(account===localStorage.getItem("account"+i)){
            if(repeat!=password){
                alert("您已有该账号，但密码重复输入错误，密码不重置！");
                clearSignUp();
                return;
            }
            else{
                localStorage.setItem("password"+i,password);
                alert("您已有该账号,现在将密码重置为："+password);
                clearSignUp();
                return;
            }
        }
    }
    if(repeat===password){
        accountNum++;
        localStorage.setItem("account"+accountNum,account);
        localStorage.setItem("password"+accountNum,password);
        sign_up_text.innerHTML="WELCOME";
        alert("欢迎"+account+"！这是您的第"+accountNum+"个账号。您最多可以有10个账号");
        clearSignUp();
        mySignIn.style.bottom="50%";
        mySignUp.style.top="150%";
        return;
    }
    else{
        alert("密码重复输入错误！");
        clearSignUp();
        return;
    }
}

function accountDelete(){
    accountNum=0;
    for(let i=1;i<=10;i++){
        localStorage.setItem("account"+i,"");
        localStorage.setItem("password"+i,"");
    }
    alert("您已经注销所有账号！");
}

inButton.addEventListener("click",signIn);
upButton.addEventListener("click",signUp);
myDelete.addEventListener("click",accountDelete);
backNext.addEventListener("click",()=>{
    styleExtra.innerHTML+=" .form-box{bottom:50%;} .myIntro{bottom:150%;}";
});

function next1(event){
    if(event.key==="Enter"){
        sign_in_input[1].focus();
    }
}

function handIn1(event){
    if(event.key==="Enter"){
        signIn();
    }
}

function next2(event){
    if(event.key==="Enter"){
        sign_up_input[1].focus();
    }
}

function next3(event){
    if(event.key==="Enter"){
        sign_up_input[2].focus();
    }
}

function handIn2(event){
    if(event.key==="Enter"){
        signUp();
    }
}

