var x = 3,
    y = 1,
    head = [y,x],
    snake = [[1,1],[1,2],head],
    timer,
    direction = [0,0],
    coinsCond = false,
    coinsCount = 0,
    xCoin,
    yCoin,
    prevHead = [],
    looseGame = false

function generateField () {
    var field = document.getElementById('main')
    field.innerHTML = ''
    for (var y = 0; y < 39; y++) {             
        for (var x = 0; x < 87; x++) {
            var div = document.createElement('div')
            div.classList.add('cell')
            div.id = y + ',' + x
            field.appendChild(div)
        }           
    }
}
function drowSnake () {
    for (var i = 0; i < snake.length; i++) {
        var id = snake[i].join(',')
        document.getElementById(id).classList.add('snakeCells')
    }
}
function move () {
    timer = setInterval(() => {
        if (direction[0] !== 0 || direction[1] !== 0){
            if (head[0] + direction[0] === yCoin && head[1] + direction[1] === xCoin) {
                document.getElementById(yCoin + ',' + xCoin).classList.remove('cellCoin')
                snake.push([yCoin,xCoin])
                head = [yCoin,xCoin]
                coinsCond = false                    
                coinsCount++
            }
            checkLoose()
            document.getElementById(snake[0].join(',')).classList.remove('snakeCells')
            for (var i = 0; i < snake.length - 1; i++) {
                snake[i][0] = snake[i + 1][0]
                snake[i][1] = snake[i + 1][1]
            }
            if (head[0] + direction[0] < 0) {
                head[0] = 39
            }
            if (head[0] + direction[0] > 38) {
                head[0] = -1
            }
            if (head[1] + direction[1] > 86) {
                head[1] = -1
            }
            if (head[1] + direction[1] < 0) {
                head[1] = 87
            }
            prevHead[0] = head[0]
            prevHead[1] = head[1]
            head[0] += direction[0]
            head[1] += direction[1]
            snake[snake.length - 1] = head
            for (var i = 0; i < snake.length; i++) {
                document.getElementById(snake[i].join(',')).classList.add('snakeCells')
            }
            drowSnake()
            generateCoin()
            scoreField.innerHTML = 'Score: ' + coinsCount           
        }
    },60)
} 
function pressButton (event) {
    switch (event.keyCode) {
        case 1099:
            if (direction[0] !== -1 && head[0] + 1 !== prevHead[0] && head[1] !== prevHead[1])
                direction = [1,0]                       
        break;
        case 1094:          
            if (direction[0] !== 1 && head[0] - 1 !== prevHead[0] && head[1] !== prevHead[1])                
                direction = [-1,0]             
        break;
        case 1092:        
            if (direction[1] !== 1 && head[0] !== prevHead[0] && head[1] - 1 !== prevHead[1])              
                direction = [0,-1]               
        break;
        case 1074:
            if (direction[1] !== -1 && head[0] !== prevHead[0] && head[1] + 1 !== prevHead[1])               
                direction = [0,1]                  
        break;
    }
    console.log(event.charCode)
}
function startGame () {
    direction[0] = 0
    direction[1] = 0
    coinsCond = false
    time = 0
    coinsCount = 0
    generateField()
    head = [y,x]
    snake = [[1,1],[1,2],head]
    drowSnake()
    window.addEventListener('keypress',pressButton)
    move()
    startTime()
    saveResult()
}
startGame()












