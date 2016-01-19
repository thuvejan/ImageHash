function hashImage() {
    console.log("h");
    var fr = new FileReader();
    var imgFile = this.files[0];

    fr.addEventListener("load", function() {
        var img = new Image();
        img.src = fr.result;
        alert(img.src);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
    }, false);

if (imgFile) {
    fr.readAsDataURL(imgFile);
    }
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

