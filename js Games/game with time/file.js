var timer = document.getElementById("timer");
var time = document.getElementById("time");
var start = document.getElementById("start");
var wrapper = document.getElementById("wrapper");
var startGame = document.getElementById("start-game");
var restart = document.getElementById("restart");
var blocks = document.getElementsByClassName("block");
var current;

start.addEventListener("click", startGm);
restart.addEventListener("click", startGm);

function startGm() {
    var same;
    timer.innerHTML = "Времени осталось: 75";
    StopTm();
    startTm();
    current = 1;
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.background = "white";
    }
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener("click", blockClick);
    }
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].innerHTML = "";
    }
    wrapper.style.display = "none";
    startGame.style.display = "block";
    for (var i = 0; i < blocks.length;) {
        same = false;
        var numb = randomize();
        for (var j = 0; j < blocks.length; j++) {
            if (blocks[j].innerHTML == numb) {
                same = true;
                break;
            }
        }
        if (same == false) {
            blocks[i].style.fontSize = GetRandomSize() + "px";
            blocks[i].style.color = "rgb(" + GerRdClr() + "," + GerRdClr() + "," + GerRdClr() + ")";
            blocks[i].innerHTML = numb;
            i++
        }
    }
}

function blockClick() {
    if (this.innerHTML == current && this.className == "block") {
        this.style.background = "#c00";
        current++;
    }
    if (current == 26) {
        timer.innerHTML = "Вы выиграли";
        StopTm();
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].removeEventListener("click", blockClick);
        }
    }
}

function randomize() {
    return Math.floor(Math.random() * 25) + 1;
}

function GetRandomSize() {
    return Math.floor(Math.random() * (50 - 20 + 1)) + 20;
}

function GerRdClr() {
    return Math.floor(Math.random() * (200 - 50 + 1)) + 50;
}

function startTm() {
    window.timerId = window.setInterval(GoTime, 1000);
}

function GoTime() {
    var tm = timer.innerHTML.split(" ");
    timer.innerHTML = "Времени осталось: " +
        (tm[2] - 1);
    if (tm[2] == 1) {
        timer.innerHTML = "Вы проиграли";
        StopTm();
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].removeEventListener("click", blockClick);
        }
    }
}

function StopTm() {
    window.clearInterval(window.timerId);
}
