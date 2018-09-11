var screen = document.getElementById("screen");
var buttons = document.getElementsByClassName("button");
var numbers = document.getElementById("numbers");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", func);
}
var clear = document.getElementById("clear");
clear.onclick = clearFunc;
var ev = document.getElementById("ev");
ev.onclick = result;


function func() {
    numbers.innerHTML = numbers.innerHTML + this.innerHTML;
}

function clearFunc() {
    numbers.innerHTML = "";
}

function result() {
    numbers.innerHTML = eval(numbers.innerHTML);
}
