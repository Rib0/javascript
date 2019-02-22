var time = 0,
    scoreField = document.getElementById('score'),
    timeField = document.getElementById('time'),
    input = document.getElementsByClassName("input-name")[0],
    accept = document.getElementsByClassName("okey")[0],
    alert = document.getElementsByClassName("name")[0],
    secondsTimer,
    pausedGame = false,
    writeRes = false

function startTime () {
    secondsTimer = setInterval(() => {
        if (direction[0] !== 0 || direction[1] !== 0){
            time += 0.1
            timeField.textContent = 'Time: ' + time.toFixed(1)
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
        document.getElementById("data").style.display = "block"
        document.getElementById('looseGame').innerHTML = 'You loose with Score:<b>' + coinsCount + '</b> and time:<b>' + time.toFixed(1) + 's</b>. ' + 'Press ENTER to replay.'
        window.removeEventListener('keypress',pressButton)
        window.removeEventListener('keydown',pauseGame)
        clearInterval(secondsTimer)
        clearInterval(timer)
    }
}

function saveResult () {
    accept.addEventListener("click", function () {
        if (input.value == "") {
            alert.style.color = "red"
            return
        }
        var recordsObj = JSON.parse(localStorage.getItem("records"))
        if (recordsObj == null) {
            recordsObj = {}
            recordsObj.result = []
            recordsObj.result.push({
                name: input.value,
                result: coinsCount
            })           
            localStorage.setItem("records", JSON.stringify(recordsObj))
            alert.style.color = "black"
            input.value = ""
            document.getElementById("data").style.display = "none"
            looseGame = true
            showRecords()
            return
        }
        else {
            recordsObj.result.push({
                name: input.value,
                result: coinsCount
            })
            localStorage.setItem("records", JSON.stringify(recordsObj))
            showRecords()
        }
        alert.style.color = "black"
        input.value = ""
        document.getElementById("data").style.display = "none"
        looseGame = true
    })
}

function showRecords () {
   var recordsObj = JSON.parse(localStorage.getItem("records"))
   recordsObj.result.sort((a, b)=>{
       return b.result - a.result
   })
   document.getElementById("total").textContent = "Total: " + recordsObj.result[0].result
   document.getElementById("modal-leader-board").innerHTML = ""
   for (var i = 0; i < recordsObj.result.length; i++) {
    var div = document.createElement("div")
    div.textContent = recordsObj.result[i].name + " - " + recordsObj.result[i].result
    div.classList.add("tutor")
    document.getElementById("modal-leader-board").appendChild(div)
    console.log(recordsObj.result.length)
   }
}

function replayGame (event) {
    if (looseGame && event.keyCode === 13) {
        document.getElementById('looseGame').style.display = 'none'
        window.addEventListener('keypress',pressButton)
        window.addEventListener('keydown',pauseGame)
        looseGame = false
        timeField.textContent = 'Time: 0'
        scoreField.textContent = 'Score: 0'
        startGame()
    }
}


window.addEventListener('keydown',pauseGame)
window.addEventListener('keypress',replayGame)
window.addEventListener("load", showRecords)
document.getElementById('Tutorial').addEventListener('click', function () {
    document.getElementById('modalTutorial').classList.toggle('open')
})
document.getElementById('leader-board').addEventListener('click', function () {
    document.getElementById('modal-leader-board').classList.toggle('open')
})
window.addEventListener('keydown', function () {
    document.getElementById('modalTutorial').classList.remove('open')
})
