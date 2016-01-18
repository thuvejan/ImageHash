function hashImage() {}

var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var hashButton = document.getElementById("hash-btn");
var canvas = document.getElementById("img-canvas");

imgUploadLink.addEventListener("click", function() {fileInput.click()}, false);

fileInput.addEventListener("change", function() {
var imgFile = fileInput.files[0];
var img = new Image();
img.src = new FileReader().readAsDataUrl(fileInput.files[0]);

canvas.drawImage(img);
}, false);

hashButton.addEventListener("click", hashImage, false);