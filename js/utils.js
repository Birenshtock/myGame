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