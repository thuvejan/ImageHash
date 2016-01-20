function hashImage() {
    var fr = new FileReader();
    var imgFile = this.files[0];

    fr.addEventListener("load", function() {
        // set src and alt attribute for image
        img.setAttribute("src", fr.result);
	img.setAttribute("alt", imgFile.name);
    
    // change image width and height to original
    img.addEventListener("load", function() {
        img.setAttribute("width", img.naturalWidth);
        img.setAttribute("height", img.naturalHeight);
    }, false);

	// set the URL hash
        setHash(fr.result);
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
    var hash = "data:" + this.location.hash.substring[0];

    img.setAttribute("src", hash);
}

var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var hashButton = document.getElementById("hash-btn");
var img = document.getElementById("img-view");

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
