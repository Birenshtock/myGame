'use script'


var gCanvas;
var gCtx;
var gCurrText
var gFillColor
var gStrokeColor
var gX = 50
var gY = 100
var gNewY = 100
var gTextNum = 0
var gCurrFont
var gFocusIdx = -1
var gIsSelected //ה-value של הkey שיש בו focus:true
var gCurrImageId
var gMappingTexts = {}
const STORAGE_KEY = 'imgDB'
    // var vanvas = document.getElementById('#my-canvas')
    // vanvas.width = 100 %

var gImgs = [{ id: '01', url: 'img/1.jpg' },

    { id: '02', url: 'img/2.jpg' },
    { id: '03', url: 'img/3.jpg' },
    { id: '04', url: 'img/4.jpg' },
    { id: '05', url: 'img/5.jpg' },
    { id: '06', url: 'img/6.jpg' },
    { id: '07', url: 'img/7.jpg' },
    { id: '08', url: 'img/8.jpg' },
    { id: '09', url: 'img/9.jpg' },
    { id: 10, url: 'img/10.jpg' },
    { id: 11, url: 'img/11.jpg' },
    { id: 12, url: 'img/12.jpg' },
    { id: 13, url: 'img/13.jpg' },
    { id: 14, url: 'img/14.jpg' },
    { id: 15, url: 'img/15.jpg' },
    { id: 16, url: 'img/16.jpg' },
    { id: 17, url: 'img/17.jpg' },
    { id: 18, url: 'img/18.jpg' },
];

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMappingTexts)
}

function onMemeClick() {
    var meme = loadFromStorage(STORAGE_KEY)
}


function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    // drawImgFromlocal()
}


var enterEvent = document.querySelector('.item0')
enterEvent.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enterEvent.value = ''
        gTextNum++
        enterEvent.blur() //עושה שלא אוכל לכתוב שוב באינפוט אחרי הפעם הראשונה
    }
})

var selectedPhoto = document.querySelectorAll('.img')
selectedPhoto.forEach(image => {
    image.addEventListener('click', function() {
        var strImageId = image.outerHTML
        gCurrImageId = strImageId.substring(9, 11)
        console.log('mmmmmm', gCurrImageId)
        drawImgFromlocal()
        document.querySelector('.hi').style.display = 'block'
        document.querySelector('main').style.display = 'none'

    })
})



function drawImgFromlocal() {
    var img = new Image()
        // img.src = 'img/3.jpg'
    img.src = gImgs[`${gCurrImageId}` - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        render(); //רק פה הרנדר מופעל כל פעם אחרי התמונה מופעלת
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImgFromlocal()
        // render()
}

function render() {
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {

        gCtx.lineWidth = 2;
        gCtx.strokeStyle = gMappingTexts[xy].strokeColor;
        gCtx.fillStyle = gMappingTexts[xy].fillColor;

        gCtx.font = `40px ${gMappingTexts[xy].fontFamily}`
        gCtx.font = gCtx.font.replace(/\d+px/, `${gMappingTexts[xy].fonSize}px`);

        var [x, y] = xy.split(',')
            // x = gX
            // y = gY
            // y = gMappingTexts[xy].yPos

        gCtx.textAlign = gMappingTexts[xy].textAlign
        if (gMappingTexts[xy].textAlign === 'end') {
            x = 350
        } else if (gMappingTexts[xy].textAlign === 'center') {
            x = gCanvas.width / 2
        } else { x = 50 }
        gCtx.fillText(textObj.text, parseInt(x), parseInt(y));
        gCtx.strokeText(textObj.text, parseInt(x), parseInt(y));


        if (gMappingTexts[xy].focus === true) {
            drawRect(x, y - 35)
        }
    }
}

function drawText(text) {
    gCurrText = text
        // console.log(gCurrText)
    gMappingTexts[`
            ${gX}, ${gY}
            `] = {
        x: 100,
        yPos: 100,
        text,
        focus: false,
        fillColor: 'black',
        strokeColor: 'black',
        fontSizeAndFamily: '40px Impact',
        fontFamily: 'Impact',
        fonSize: 40,
        textAlign: 'start',

    }
    console.log('gMappingTexts', gMappingTexts)
    clearCanvas()
}

function onDownText() {

    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        gCtx.strokeStyle = 'black'

        if (gMappingTexts[xy].focus === true) {
            // var [x, y] = xy.split(',')
            gMappingTexts[xy].yPos = gY + 5
                // gNewY += 5

            clearCanvas()
        }
    }
}

function onUpText() {
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        gCtx.strokeStyle = 'black'

        if (gMappingTexts[xy].focus === true) {
            gY = gY - 5
            clearCanvas()
        }
    }
}

function onPlusAnotherText() {

    if (gTextNum === 1) {
        // gMappingTexts[xy].yPos = 400
        gY = 400
    } else if (gTextNum >= 2) {
        gY = 220
            // gMappingTexts[xy].yPos = 220
    }
}

function OnSetFillColor(FillColor) {

    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        gCtx.strokeStyle = 'black'

        if (gMappingTexts[xy].focus === true) {

            // gIsSelected.fillColor = FillColor
            gMappingTexts[xy].fillColor = FillColor
            console.log(gMappingTexts)
            clearCanvas()
        }
    }
}

function OnSetStrokeColor(StrokeColor) {

    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        gCtx.strokeStyle = 'black'

        if (gMappingTexts[xy].focus === true) {

            // gIsSelected.fillColor = FillColor
            gMappingTexts[xy].strokeColor = StrokeColor
            clearCanvas()
        }
    }
}

function onDeleteText() {
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {

        if (gMappingTexts[xy].focus === true) {

            // gIsSelected.fillColor = FillColor
            gMappingTexts[xy].focus === false
            delete gMappingTexts[xy]
            console.log(gMappingTexts)
            clearCanvas()
        }
    }
}

function onSetFont(font) {
    // gCurrFont = font
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        // gCtx.font = '40px Impact'

        if (gMappingTexts[xy].focus === true) {

            // gIsSelected.fillColor = FillColor
            gMappingTexts[xy].fontFamily = font
            clearCanvas()
        }
    }
}

function onBiggerFont() {

    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        // gCtx.font = '40px Impact'

        if (gMappingTexts[xy].focus === true) {
            gMappingTexts[xy].fonSize = gMappingTexts[xy].fonSize + 2
                // gMappingTexts[xy].fontBiggerSize = currSelectedSize + 2
                // console.log(gMappingTexts)
            clearCanvas()
        }
    }
}

function onSmallerFont() {
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        // gCtx.font = '40px Impact'

        if (gMappingTexts[xy].focus === true) {
            gMappingTexts[xy].fonSize = gMappingTexts[xy].fonSize - 2
                // gMappingTexts[xy].fontBiggerSize = currSelectedSize + 2
                // console.log(gMappingTexts)
            clearCanvas()
        }
    }

}



function onTextRight() {
    // gCtx.textAlign = "end"
    // gX = 550
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        // gCtx.font = '40px Impact'

        if (gMappingTexts[xy].focus === true) {
            gMappingTexts[xy].textAlign = 'end'
                // gX = 550
            clearCanvas()
        }
    }
}

function onTextLeft() {
    // gCtx.textAlign = "start"
    // gX = 100
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        if (gMappingTexts[xy].focus === true) {
            gMappingTexts[xy].textAlign = "start"
                // gX = 100
            clearCanvas()
        }
    }

}

function onTextCenter() {
    // gCtx.textAlign = "center";
    // gX = gCanvas.width / 2
    for (var [xy, textObj] of Object.entries(gMappingTexts)) {
        if (gMappingTexts[xy].focus === true) {
            gMappingTexts[xy].textAlign = "center"
                // gX = gCanvas.width / 2
            clearCanvas()
        }
    }
}



function onSelectText() {
    gFocusIdx++
    const keys = Object.keys(gMappingTexts) //מחזיר מערך של המפתחות של gmapping
    if (gFocusIdx === keys.length) gFocusIdx = 0
    for (var xy of keys) {
        gMappingTexts[xy].focus = keys[gFocusIdx] === xy
        if (gMappingTexts[xy].focus === true) {
            gIsSelected = gMappingTexts[xy]
        }
    }
    console.log('isselected:', gIsSelected)
    clearCanvas()
}


function drawRect(x = 100, y) {
    gCtx.beginPath();
    gCtx.rect(40, y, 320, 40);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onGalleryClick() {

    document.querySelector('.hi').style.display = 'none'
    document.querySelector('main').style.display = 'block'

}

function downloadCanvas(elLink) {

    // for (var [xy, textObj] of Object.entries(gMappingTexts)) {
    //     if (gMappingTexts[xy].focus === true) {
    //         gMappingTexts[xy].focus = false
    //         clearCanvas()
    //     }
    // }


    const data = gCanvas.toDataURL() // for 
    elLink.href = data
    console.log(data)
    elLink.download = 'my-img.jpg'
    console.log('jjjj')

}





// var elNav = document.querySelector('ul')
// var elOpacityBg = document.querySelector('.opacity-bg')

// function toggleMenu(elBtn) {
//     document.body.classList.toggle('menu-open');
//     if (document.body.classList.contains('menu-open')) {
//         elBtn.innerText = 'X'
//             // elNav.style.display = "block"
//     } else {
//         elBtn.innerText = '☰'
//             // elNav.style.display = "none"
//     }
// }

function toggleMenu(elBtn) {
    document.body.classList.toggle('menu-open');
    document.body.classList.contains('menu-open') ? elBtn.innerText = 'X' : elBtn.innerText = '☰';
}


// }

// function openModal() {
//     // elOpacityBg.style.display = "block"
//     elModal.style.display = "block"

// }

// function closeModal() {
//     elModal.style.display = "none"
//         // elOpacityBg.style.display = "none"

// }