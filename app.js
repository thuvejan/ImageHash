var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var img = document.getElementById("img-view");

function hashImage() {
    var fr = new FileReader();
    var imgFile = this.files[0];

    fr.addEventListener("load", function() {
        // set src and alt attribute for image
        img.setAttribute("src", fr.result);
        img.setAttribute("alt", imgFile.name);

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
    var hash = "data:" + this.location.hash.substring(1);

    img.setAttribute("src", hash);
}

fileInput.addEventListener("change", hashImage, false);

imgUploadLink.addEventListener("click", function(event) {
    event.preventDefault();
    fileInput.click();
}, false);

window.addEventListener("load", function() {
    if (window.location.hash) {
        readHash();
    }
}, false);

// change image width and height to original
img.addEventListener("load", function() {
    var x = img.naturalWidth;
    var y = img.naturalHeight;

    var imgRatio = x / y;
    // resize imgs if they are larger than screen
    if (x >= window.innerWidth) {
        x = (.85 * window.innerWidth);
        y = x / imgRatio; // keep img aspect ratio
    }
    if (y >= window.innerHeight) {
        y = (.85 * window.innerWidth);
        x = y * imgRatio; // maintain img aspect ratio
    }
    img.setAttribute("width", x);
    img.setAttribute("height", y);
}, false);
