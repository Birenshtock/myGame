'use strict'

const EMPTY = ''
const MINE = '💣'
const LIFE = '💗'
var gBoard
var updatedBoard
var noNeighbors = false

var gLevel = {
    size: 4,
    mines: 2
}


function init() {
    console.log(' init')
    gBoard = buildBoard()
    updatedBoard = setMinesNegsCount(gBoard)
    renderBoard(updatedBoard)
    var lives = document.querySelector(h3)
    lives.innerHTML += `${ LIFE }`
}

// connsole.log('ggggggggggg', gLevel.SIZE)

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = EMPTY
        }
    }

    // board[1][1] = board[3][2] = MINE
    addMines(board)

    // console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            strHTML += ` <td class="hidden" onclick="cellClicked(this,${i},${j})"> <span>${cell} </span></td>`
        }
        strHTML += '<tr>'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function addMines(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        board[randomNum(gLevel.size)][randomNum(gLevel.size)] = MINE

    }
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
    // board[randomNum(gLevel.size - 1)][randomNum(gLevel.size - 1)] = SAD

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

function cellClicked(elCell, i, j) {
    // console.log('cell I, cell J:', i, j)
    elCell.classList.remove('hidden')
    if (elCell.innerText === MINE) {
        gameOver()
    } else if (elCell.innerText === EMPTY) {
        console.log('empty')
            // expandShown(gBoard, elCell, i, j)
    } else {}
}



// function expandShown(board, elCell, cellI, cellJ) {
//     console.log('no neighbors')
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= 4) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue
//             if (j < 0 || j >= 4) continue
//             console.log(board[i][j])
//             document.querySelector(board[i][j]).classList.remove('hidden')
//         }
//     }
// }

function gameOver() {
    console.log('game over')
}



function levelEasy() {
    gLevel.size = 4
    gLevel.mines = 2
    init()
}

function levelMedium() {
    gLevel.size = 6
    gLevel.mines = 4
    init()

}

function levelHard() {
    gLevel.size = 8
    gLevel.mines = 6
    init()

}