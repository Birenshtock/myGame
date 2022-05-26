'use strict'





function randomNum(size) {
    var idx = getRandomInt(0, size)
    return idx
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

var seconds = 0
var minutes = 0
var hours = 0
var displaySeconds = 0
var displayMinutes = 0
var displayHours = 0
var statuss = 'stopped'
var interval = ''

function startWatch() {
    seconds++
    if (seconds / 60 === 1) {
        seconds = 0
        minutes++
        if (minutes / 60 === 1) {
            minutes = 0
            hours++
        }
    }

    if (seconds < 10) {
        displaySeconds = '0' + seconds.toString()
    } else {
        displaySeconds = seconds
    }

    if (minutes < 10) {
        displayMinutes = '0' + minutes.toString()
    } else {
        displayMinutes = minutes
    }

    if (hours < 10) {
        displayHours = '0' + hours.toString()
    } else {
        displayHours = hours
    }

    document.getElementById('display').innerHTML = displayHours + ':' + displayMinutes + ':' + displaySeconds
}







function start() {
    interval = window.setInterval(startWatch, 1000)

    statuss = 'started'
}

function stopWatch() {
    window.clearInterval(interval)

    statuss = 'stopped'

}



function reset() {
    seconds = 0
    hours = 0
    minutes = 0
    window.clearInterval(interval)
    statuss = 'stopped'
}