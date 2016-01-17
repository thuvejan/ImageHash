function hashImage() {}

var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var hashButton = document.getElementById("hash-btn");
var canvas = document.getElementById("img-canvas");

imgUploadLink.addEventListener("click", function() {fileInput.click()}, false);

fileInput.addEventListener("change", function() {
var img = new Image();
img.src = "datauri";

img.addEventListener("load", function() {
canvas.drawImage(this);
}, false);
}, false);

hashButton.addEventListener("click", hashImage, false);