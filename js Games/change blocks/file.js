class ChangeContent {
    constructor () {        
        this.triggers = document.getElementsByClassName('nav__text');
        this.texts = document.getElementsByClassName('content__paragraph');
        this.onClick = this.onClick.bind(this);

        [].forEach.call(this.triggers, trigger => {
            trigger.onclick = this.onClick;
        })

        this.triggers[0].classList.add('nav__text--selected');
        this.texts[0].classList.add('content__paragraph--opened');
    }

    onClick (e) {
        const { target } = e.target.dataset;
        const elem = document.getElementById(target);

        [].forEach.call(this.triggers, (trigger, index) => {
            trigger.classList.remove('nav__text--selected');
            this.texts[index].classList.remove('content__paragraph--opened');
        })
        e.target.classList.add('nav__text--selected');
        elem.classList.add('content__paragraph--opened');
    }
}

const changeContent = new ChangeContent();