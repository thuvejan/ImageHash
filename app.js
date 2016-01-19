function hashImage() {
    console.log("h");
    var fr = new FileReader();
    var imgFile = this.files[0];

    fr.addEventListener("load", function() {
        var img = new Image();
        img.src = fr.result;
        setHash(fr.result);
        alert(img.src);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
    }, false);

    if (imgFile) {
        fr.readAsDataURL(imgFile);
    }
}

function setHash(hash) {
    hash = hash.substring(5);
    window.location.replace(window.location.origin + window.location.pathname + "#" + hash);
}

function readHash() {
    // get hash
    var hash = "data:" + this.location.hash;
    var context = canvas.getContext("2d");

    var img = new Image();
    img.src = hash;

    context.drawImage(img, 0, 0);

}

var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var hashButton = document.getElementById("hash-btn");
var canvas = document.getElementById("img-view");

fileInput.addEventListener("change", hashImage, false);
hashButton.addEventListener("click", hashImage, false);

imgUploadLink.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(hashImage);
    fileInput.click();
}, false);

window.addEventListener("load", function() {
    if (window.location.hash) {
        readHash();
    }
}, false);
