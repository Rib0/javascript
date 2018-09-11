var button = document.getElementById("bt");
var button2 = document.getElementById("bt2");
button.onclick = func;
button2.onclick = next;
var trues = document.getElementsByClassName("true");
var name1 = document.getElementsByName("first_");
var name2 = document.getElementsByName("second_");
var name3 = document.getElementsByName("third_");
var show = document.getElementsByClassName("show");
show[1].style.display = "none";
show[2].style.display = "none";
bt.style.display = "none";
var current = 0;


function func() {
    var msg;
    var counter = 0;
    for (var i = 0; i < trues.length; i++) {
        if (trues[i].checked == true)
            counter++;
    }

    var proc = (counter / 3 * 100).toFixed(0) + "%";
    msg = "Правильных ответов: " + counter + " (" +
        proc + ")" + "\n" + "Неправильных ответов: " + ((3 - counter) / 3 * 100).toFixed(0) + "%" + "\n";
    alert(msg);
}

function next() {

    current++;
    if (current < 3) {
        for (var j = 0; j < show.length; j++) {
            show[j].style.display = "none";
        }
        show[current].style.display = "block";
    } else {
        if (current == 3) {
            show[2].style.display = "block";
            button2.style.display = "none";
            button.style.display = "block";
        }
    }
}
