var turn = "x";
var win = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var winX = 0;
var win0 = 0;
var both = 0;
var stop = 0;
var fullCells = 0;

var field = document.getElementById("wrapper");
var turnEl = document.getElementById("turn");
var blocks = document.getElementsByClassName("block");
var scores = document.getElementsByClassName("scorePlayer");
var button = document.getElementById("new_game");

button.onclick = reset;
field.onclick = main;


function main(event) {
    var block = event.target;
    if (block.classList.item(0) == "block" && stop == 0) {
        block.innerHTML = turn;
        if (turn == "x")
            turn = "0";
        else
            turn = "x";

        turnEl.innerHTML = "Ходит: " + turn;
        check_result();
    }
}



function check_result() {
    var check_0 = [];
    var check_x = [];
    var count0 = 0;
    var countX = 0;

    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].innerHTML == "0") {
            check_0.push(blocks[i].getAttribute("data-numb"));
        }
        if (blocks[i].innerHTML == "x") {
            check_x.push(blocks[i].getAttribute("data-numb"));
        }
    }

    for (var i = 0; i < win.length; i++) {
        for (var j = 0; j < win[i].length; j++) {
            for (var k = 0; k < check_0.length; k++) {
                if (check_0[k] == win[i][j])
                    count0++;
            }
        }
        if (count0 == 3) {
            win0++;
            turnEl.innerHTML = "Выиграл: 0";
            scores[1].innerHTML = win0.toString();
            stop = 1;
            return 0;
        }
        count0 = 0;
    }

    for (var i = 0; i < win.length; i++) {
        for (var j = 0; j < win[i].length; j++) {
            for (var k = 0; k < check_x.length; k++) {
                if (check_x[k] == win[i][j])
                    countX++;
            }
        }
        if (countX == 3) {
            winX++;
            turnEl.innerHTML = "Выиграл: x";
            scores[0].innerHTML = winX.toString();
            stop = 1;
            return 0;
        }
        countX = 0;
    }

    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].innerHTML != "") {
            fullCells++;
            if (fullCells == 9 && stop == 0) {
                stop = 1;
                turnEl.innerHTML = "Ничья";
                both++;
                scores[2].innerHTML = both.toString();
                return 0;
            }
        }
    }
    fullCells = 0;
}



function reset() {
    stop = 0;
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].innerHTML = "";
        turn = "x";
        turnEl.innerHTML = "Ходит: " + turn;
        fullCells = 0;
    }
}
