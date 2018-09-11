var input = document.getElementById("input");
var wrap = document.getElementById("wrapper");
var inputs = document.getElementsByClassName("check");
document.body.addEventListener("click", Check_this);
document.body.addEventListener("click", Change);
document.body.addEventListener("click", close);
input.onkeydown = add;
var count = 0;
var text;


function add(event) {
    var key = event.keyCode;
    if (key == 13 && input.value != "") {
        var inputEl = document.createElement("input");
        inputEl.setAttribute("type", "checkbox");
        inputEl.classList.add("check");
        var block = document.createElement("div");
        block.classList.add("block");
        block.appendChild(inputEl);
        var text = document.createElement("span");
        text.classList.add("text");
        text.innerHTML = input.value;
        block.appendChild(text);
        var cansel = document.createElement("span");
        cansel.classList.add("cansel");
        cansel.innerHTML = "X";
        block.appendChild(cansel);
        input.value = "";
        document.body.insertBefore(block, document.body.firstChild.nextElementSibling.nextElementSibling);
    }
}

function Check_this(event) {
    var target = event.target;
    if (target.classList.contains("check")) {
        var elem = target.nextElementSibling;
        text = elem.innerHTML;
        if (elem.tagName == "SPAN" && count == 1) {
            text = elem.firstChild.value;
            elem.removeChild(elem.firstChild);
        }
        elem.innerHTML = text;
        count = 0;
        elem.style.textDecoration = "line-through";
        target.style.visibility = "hidden";
    }
}

function Change(event) {
    var target = event.target;
    if (target.classList.contains("text") && count == 0) {
        count = 1;
        text = target.innerHTML;
        target.innerHTML = "";
        var input = document.createElement("input");
        target.appendChild(input);
        input.value = text;
        input.classList.add("newInp");
        input.onkeydown = accept;
    }
}

function accept(event) {
    if (event.keyCode == 13) {
        this.parentNode.innerHTML = this.value;
        count = 0;
    }
}

function close(event) {
    var target = event.target;
    if (target.classList.contains("cansel")) {
        target.parentElement.parentElement.removeChild(target.parentElement);
        count = 0;
    }
}
