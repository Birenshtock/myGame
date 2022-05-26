'use strict'

const EMPTY = ''
const MINE = '💣'
const LIFE = '💗'
const FLAG = '🚩'
const SAD = '😫'
const HAPPY = '😃'
const WIN = '😎'
var gBoard
var updatedBoard
var noNeighbors = false
var livesCount
var clickNum = 0




var gLevel = {
    size: 4,
    mines: 2
}



function init() {
    reset()

    start()
    livesCount = 3
    console.log(' init')
    gBoard = buildBoard()
    updatedBoard = setMinesNegsCount(gBoard)
    renderBoard(updatedBoard)
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = `Life: ${LIFE}${LIFE}${LIFE}`
    rightClick()

    var happy = document.querySelector('.face')
    happy.innerText = `${HAPPY}`

    document.querySelector(`.board`).classList.add('easy')


}



function rightClick() {


    const noContext = document.querySelectorAll('.hidden');
    for (var el of noContext) {
        el.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (e.target.classList.contains('hidden')) {
                console.log(e.target.innerText)
                console.log('ffffffffffuck')
                if (!e.target.originalText) {
                    e.target.originalText = e.target.innerText
                }
                if (e.target.innerText === FLAG) {
                    e.target.innerHTML = `<span> ${e.target.originalText} </span>`
                    win()
                } else { e.target.innerText = FLAG }

            }
        });
    }
}

const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());





function win() {
    // rightClick()
    for (var currCell of document.querySelectorAll(`.cell`)) {
        // console.log(currCell.innerText)
        if (currCell.innerText === MINE) return
    }
    console.log('win')
    var winningFace = document.querySelector('.face')
    winningFace.innerText = `${WIN}`
    stopWatch()

}



function addMines(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        board[randomNum(gLevel.size)][randomNum(gLevel.size)] = MINE

    }
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = EMPTY
        }
    }

    addMines(board)


    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            strHTML += ` <td  class="hidden cell" onclick="cellClicked(this,${i},${j})" > <span >${cell} </span></td>`
        }
        strHTML += '<tr>'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}









function setMinesNegsCount(board) { // מחזיר לוח עדכני עם מספרים
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfMineNeighbors = countMineNeighbors(i, j, board)
            if (board[i][j] === MINE) {
                continue
            } else {
                board[i][j] = numOfMineNeighbors
                if (numOfMineNeighbors === 0) board[i][j] = EMPTY
                    // console.log('cellContent:', board[i][j])

            }
        }
    }


    console.table(board) //לוח עם המספרים
    return board
}



function countMineNeighbors(cellI, cellJ, board) {
    var mineNeighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j] === MINE) mineNeighborsCount++
        }
    }
    return mineNeighborsCount
}





function showMine(elCell) {
    for (var currCell of document.querySelectorAll(`.cell`)) {
        if (currCell.innerText === MINE) currCell.classList.remove('hidden')
    }
}


function expandShown(elCell, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gLevel.size) continue
            var mult = (i * gLevel.size) + j

            // console.log('mult', (i * gLevel.size) + j)
            var newCell = document.querySelectorAll(`.cell`)[mult]
            newCell.classList.remove('hidden')
        }
    }
}






function sadFace() {
    var sad = document.querySelector('.face')
    sad.innerText = `${SAD}`
    setTimeout(function() {
        sad.innerText = `${HAPPY}`
    }, 500)
}

function cellClicked(elCell, i, j) {
    clickNum++
    console.log('click num:', clickNum)
    if (elCell.innerText === FLAG) return


    if (livesCount <= 0) {
        gameOver()
    } else if (elCell.innerText === MINE) {
        elCell.classList.remove('hidden')
        loseLife(elCell)
        sadFace()
        document.querySelector('span').classList.remove('hidden')
    } else if (elCell.innerText === EMPTY) {
        console.log('empty')
        expandShown(elCell, i, j)
        elCell.classList.remove('hidden')
        loseLife(elCell)
    } else {
        elCell.classList.remove('hidden')
    }
    if (livesCount <= 0) {
        gameOver()
    }
}


function loseLife(elCell) {
    --livesCount
    console.log('Lives:', livesCount)
    var elLives = document.querySelector('.lives')
    if (livesCount === 2) elLives.innerHTML = `Life: ${LIFE}${LIFE}`
    if (livesCount === 1) elLives.innerHTML = `Life: ${LIFE}`
    if (livesCount === 0) elLives.innerHTML = `Life:`
        // if (livesCount < 0) return
}


function gameOver(elCell) {
    console.log('game over')
    showMine(elCell)
    var sad = document.querySelector('.face')
    sad.innerText = `${SAD}`
    stopWatch()

}



function levelEasy() {
    document.querySelector(`.board`).classList.add('easy')
    document.querySelector(`.board`).classList.remove('medium', 'hard')


    gLevel.size = 4
    gLevel.mines = 2
    init()

}

function levelMedium() {
    document.querySelector(`.board`).classList.add('medium')
    document.querySelector(`.board`).classList.remove('easy', 'hard')
    gLevel.size = 8
    gLevel.mines = 12
    init()


}

function levelHard() {
    document.querySelector(`.board`).classList.add('hard')
    document.querySelector(`.board`).classList.remove('easy', 'medium')
    gLevel.size = 12
    gLevel.mines = 30
    init()


}