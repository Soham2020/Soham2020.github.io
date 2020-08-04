var input = document.getElementById("input");
var h1 = document.querySelector(".display-4")
var p = document.querySelector(".lead");
var trivia = document.querySelector(".trivia");
var year = document.querySelector(".year");
var number = document.querySelector(".number");
var date = document.querySelector(".date");

trivia.addEventListener("click",fetchTrivia);
year.addEventListener("click",fetchYear);
number.addEventListener("click",fetchNum);
date.addEventListener("click",fetchDate);

function fetchTrivia(){
    input.addEventListener("input",fetchTrivia);

    try{
        fetch("http://numberapi.com/"+input.value+"/trivia")
        .then(response => response.text())
        .then(data => {
            h1.innerHTML = input.value;
            p.innerHTML = data;
        })
    }catch{
        console.log("error");
    }
}

function fetchYear(){
    input.addEventListener("input",fetchYear);

    try{
        fetch("http://numberapi.com/"+input.value+"/year")
        .then(response => response.text())
        .then(data => {
            h1.innerHTML = input.value;
            p.innerHTML = data;
        })
    }catch{
        console.log("error");
    }
}

function fetchNum(){
    input.addEventListener("input",fetchNum);

    try{
        fetch("http://numberapi.com/"+input.value+"/math")
        .then(response => response.text())
        .then(data => {
            h1.innerHTML = input.value;
            p.innerHTML = data;
        })
    }catch{
        console.log("error");
    }
}

function fetchDate(){
    input.addEventListener("input",fetchDate);

    try{
        fetch("http://numberapi.com/"+input.value+"/date")
        .then(response => response.text())
        .then(data => {
            h1.innerHTML = input.value;
            p.innerHTML = data;
        })
    }catch{
        console.log("error");
    }
}