var time = 0,
    scoreField = document.getElementById('score'),
    timeField = document.getElementById('time'),
    secondsTimer,
    pausedGame = false

function startTime () {
    secondsTimer = setInterval(() => {
        if (direction[0] !== 0 || direction[1] !== 0){
            time += 0.1
            timeField.innerHTML = 'Time: ' + time.toFixed(1)
        }
    },100)
}
function pauseGame (event) {
    var pausedModal = document.getElementById('pausedGame')
    if (event.keyCode === 27 && pausedGame === false && (direction[0] !== 0 || direction[1] !== 0)) {
        pausedGame = true
        window.removeEventListener('keypress',pressButton)
        clearInterval(timer)
        clearInterval(secondsTimer)
        pausedModal.style.display = 'block'
    } else if (event.keyCode === 27 && pausedGame === true){
        pausedGame = false
        window.addEventListener('keypress',pressButton)
        move()
        startTime()
        pausedModal.style.display = 'none'
    }
}
function generateCoin () {
    if (!coinsCond) {
        yCoin = Math.floor(Math.random() * (38 - 0)) + 0;
        xCoin = Math.floor(Math.random() * (86 - 0)) + 0;
        document.getElementById(yCoin + ',' + xCoin).classList.add('cellCoin')
        coinsCond = true
    }
}
function checkLoose () {
    if (document.getElementById(Number(head[0] + direction[0]) + ',' + Number(head[1] + direction[1])) !== null)
    if (document.getElementById(Number(head[0] + direction[0]) + ',' + Number(head[1] + direction[1])).classList.contains('snakeCells')){    
        document.getElementById('looseGame').style.display = 'block'
        document.getElementById('looseGame').innerHTML = 'You loose with Score:<b>' + coinsCount + '</b> and time:<b>' + time.toFixed(1) + 's</b>. ' + 'Press ENTER to replay.'
        window.removeEventListener('keypress',pressButton)
        window.removeEventListener('keydown',pauseGame)
        looseGame = true
        clearInterval(secondsTimer)
        clearInterval(timer)
        saveResult()
    }
}
function saveResult () {
    if (localStorage.getItem('result') === null) {
        localStorage.setItem('result', 0)
    }
    var result = localStorage.getItem('result')
    document.getElementById('total').innerHTML = 'Total: ' + result
    if (coinsCount > parseInt(result)) {
        localStorage.removeItem('result')
        localStorage.setItem('result', coinsCount)
        document.getElementById('total').innerHTML = 'Total: ' + result
    }
}
function replayGame (event) {
    if (looseGame && event.keyCode === 13) {
        document.getElementById('looseGame').style.display = 'none'
        window.addEventListener('keypress',pressButton)
        window.addEventListener('keydown',pauseGame)
        looseGame = false
        timeField.innerHTML = 'Time: 0'
        scoreField.innerHTML = 'Score: 0'
        startGame()
    } 
}
window.addEventListener('keydown',pauseGame)
window.addEventListener('keypress',replayGame)
document.getElementById('Tutorial').addEventListener('click', function () {
    document.getElementById('modalTutorial').classList.toggle('open')
})
window.addEventListener('load', saveResult)
window.addEventListener('keydown', function () {
    document.getElementById('modalTutorial').classList.remove('open')
})
