var months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
]

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
var day = now.getDate();
var mothsDays = document.getElementById("months");
var mothsDayses = document.getElementsByClassName("monthDay");
var text = document.getElementById("date");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var planses = document.getElementById("planses");
var DaysClick = document.getElementById("months");
var exit = document.getElementById("exit");
var add = document.getElementById("add");
var EnterText = document.getElementById("EnterText");
var arr = new Array();
var datePlan = document.getElementById("datePlan");
var PlansesField = document.getElementById("PlansesField");
var selectedDay;
DaysClick.onclick = func;
prev.onclick = getPrevMonth;
next.onclick = getNextMonth;
exit.onclick = exitTab;
add.onclick = AddPlan;
document.body.onload = start;


function AddPlan() {
    arr.push(now.getFullYear() + "-" + now.getMonth() + "-" + selectedDay + "-" + EnterText.value);
    ShowPlans();
    EnterText.value = "";
}

function ShowPlans() {
    var newArr;
    PlansesField.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        newArr = arr[i].split("-");
        if (newArr[0] == now.getFullYear() && newArr[1] == now.getMonth() && newArr[2] == selectedDay) {
            PlansesField.innerHTML = PlansesField.innerHTML +
                newArr[3] + "<br>";
        }
    }
}

function exitTab() {
    this.parentNode.classList.remove("secondPosition");
}

function func(event) {
    var target = event.target;
    for (var i = 0; i < mothsDayses.length; i++) {
        mothsDayses[i].classList.remove("active");
    }
    if (target.classList.contains("monthDay")) {
        planses.classList.add("secondPosition");
        if (target.classList.contains("now") == false)
            target.classList.add("active");
        datePlan.innerHTML = "Планы на  " + target.innerHTML + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
        selectedDay = target.innerHTML;
        ShowPlans();
    }
}

function start() {
    main(year, month, day);
}



function main(yearr, monthh, dayy) {
    var marg = new Date(now.getFullYear(), now.getMonth(), 1).getDay() - 1;
    if (marg == -1) {
        marg += 7;
    }

    for (var i = 0; i < marg; i++) {
        var span = document.createElement("span");
        span.innerHTML = "";
        span.classList.add("monthDay");
        span.classList.add("empty");
        mothsDays.appendChild(span);
    }

    for (var i = 1; i < 32; i++) {
        var span = document.createElement("span");
        span.innerHTML = new Date(yearr, monthh, i).getDate();
        if (day == span.innerHTML && year == yearr && month == monthh) {
            span.classList.add("now");
        }
        if (now.getMonth() == new Date(now.getFullYear(), now.getMonth(), i).getMonth())
            mothsDays.appendChild(span);
        span.classList.add("monthDay");
    }
    text.innerHTML = yearr + " " + months[monthh];
}



function getNextMonth() {
    mothsDays.innerHTML = "";
    now = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    main(now.getFullYear(), now.getMonth(), now.getDate());
}



function getPrevMonth() {
    mothsDays.innerHTML = "";
    now = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    main(now.getFullYear(), now.getMonth(), now.getDate());
}
