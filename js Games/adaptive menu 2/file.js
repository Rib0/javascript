var blocks = document.getElementsByClassName("block");
for (var i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener("click", show);
}

function show() {
    var target = this.nextElementSibling;
    if (target.offsetHeight == 0)
        target.style.height = target.scrollHeight + "px";
    else {
        target.style.height = 0;
    }

}
