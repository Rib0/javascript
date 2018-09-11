var
    button = document.getElementById("block"),
    nav = document.getElementById("menu"),
    first = document.getElementById("first"),
    second = document.getElementById("second"),
    third = document.getElementById("third");

button.onclick = open;

function open() {
    nav.classList.add("open");
    nav.style.height = 120 + "px";
    first.classList.add("exitFirst");
    second.classList.add("exitSecond");
    third.classList.add("exitThird");
    button.onclick = close;
}

function close() {
    nav.style.height = 30 + "px";
    nav.classList.remove("open");
    first.classList.remove("exitFirst");
    second.classList.remove("exitSecond");
    third.classList.remove("exitThird");
    button.onclick = open;
}
