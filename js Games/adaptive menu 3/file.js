var nav = document.getElementById("nav");
var li = document.getElementsByTagName("li");
var p = document.getElementsByTagName("p");
nav.onclick = choose;
for (var i = 0; i < li.length; i++) {
    li[i].classList.add("nochosen");
}

function choose(event) {
    var target = event.target;
    if (target.tagName == "LI") {
        for (var i = 0; i < li.length; i++) {
            li[i].classList.remove("chosen");
        }
        target.classList.add("chosen");
    }
    for (var i = 0; i < p.length; i++) {
        p[i].classList.remove("show");
        p[i].classList.add("hidden");
    }
    p[target.getAttribute("data-item")].classList.add("show");
}
