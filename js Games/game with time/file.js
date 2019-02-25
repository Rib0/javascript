class Game {
    constructor () {
        const cellsNumber = document.getElementById('cells');
        this.timerId = null;
        this.currentValue = 1;
        this.maxValue;
        this.started = false;

        this.generateField = this.generateField.bind(this);
        this.onClick = this.onClick.bind(this);

        cellsNumber.onkeydown = this.generateField;// вынести все навешивания обработчиков в отдельную функцию и снятия тоже
    }

    getRandomValue (max) {
        return Math.floor(Math.random() * max) + 1;
    }

    getRandomValueColor () {
        return [
            Math.floor(Math.random() * 210) + 1, 
            Math.floor(Math.random() * 210) + 1, 
            Math.floor(Math.random() * 210) + 1,
        ]
    }

    isLetter (keyCode) {
        var char = String.fromCharCode(keyCode);
        return !!char.search(/[a-z]|[а-я]/i);
    }

    generateField (e) {
        if (!this.isLetter(e.keyCode)) e.preventDefault();
        if (e.keyCode !== 13 || e.value === '') return;    

        const value = parseInt(e.target.value);
        const table = document.createElement('table');
        const gameWrapper = document.querySelector('.game');
        const tableValues = [];
        this.maxValue = Math.pow(value, 2);
        this.startGame = this.initTime(60);

        for (let i = 0; i < value; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < value; j++) {
                const cell = document.createElement('td');
                let randomValue = this.getRandomValue(Math.pow(value, 2));
                while (tableValues.includes(randomValue)) {
                    randomValue = this.getRandomValue(Math.pow(value, 2));
                }
                tableValues.push(randomValue);
                cell.textContent = randomValue;
                cell.style.color = `RGB(${this.getRandomValueColor()})`;
                row.appendChild(cell);
            }
            table.appendChild(row);
            table.onclick = this.onClick;
        }
        gameWrapper.appendChild(table);
        e.target.style.display = 'none';
    }

    onClick (e) {
        if (e.target.tagName !== 'TD') return;

        if (!this.started) 
            this.startGame();
        const { target } = e;
        const value = parseInt(target.textContent);
        if (value !== this.currentValue) return;
        target.style.backgroundColor = 'red';
        const currentValue = this.currentValue++;
        this.checkTheEndGame({currentValue});
    }

    initTime (defaultTime) {
        const timer = document.querySelector('.timer');
        let currentTime = timer.textContent = defaultTime;

        return () => {
            this.started = true;
            this.timerId = setInterval(()=> {
                timer.textContent = currentTime;
                this.checkTheEndGame({currentTime});
                currentTime--;
            }, 1000)
        }
    }

    checkTheEndGame ({currentTime, currentValue}) {
        const gameRes = document.getElementById('gameResult');
        const table = document.querySelector('table');
        if (currentTime === 0) {
            clearInterval(this.timerId);
            gameRes.textContent = 'Вы проиграли';
            table.onclick = null;
        }
        if (currentValue === this.maxValue) {
            clearInterval(this.timerId);
            gameRes.textContent = 'Вы выиграли';
            table.onclick = null;      
        }    
    }
}

const game = new Game();