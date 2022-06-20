function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg"); // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`, '_blank');
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

var savedMeme = 0

// function onSave() {
//     savedMeme++
//     const imgDataUrl = gCanvas.toDataURL("image/jpeg");
//     localStorage.setItem("recent-image", imgDataUrl)

// }

// document.addEventListener("DOMContentLoaded", () => {
//     const recentImgDataUrl = localStorage.getItem("recent-image")
//     if (recentImgDataUrl) {
//         document.querySelector('.savedMemes').innerHTML += ` <img id="imgPreview${savedMeme}" src="" alt="">`
//         document.querySelector(`#imgPreview${savedMeme}`).setAttribute("src", recentImgDataUrl)
//     }
// })


function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
        //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        }) //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}