class HiddenText {
    constructor () {
        const triggers = document.querySelectorAll('.block .name');
        this.onclick = this.onClick.bind(this);

        [].forEach.call(triggers, trigger => {
            trigger.onclick = this.onClick;
        })
    }

    onClick (e) {
        const text = e.target.nextElementSibling;
        if (text.offsetHeight > 0) {
            text.style.height = '';
        }
        else {
            text.style.height = text.scrollHeight + 'px';
        }
    }
}

const hiddenText = new HiddenText();