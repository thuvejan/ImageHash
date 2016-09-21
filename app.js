var fileInput = document.getElementById("input-img");
var imgUploadLink = document.getElementById("img-click-upload");
var img = document.getElementById("img-view");
var config = (function () {
    var obj = {}
    obj.MAX_URI_LENGTH = 32000;
    obj.URI_RANGE_ALLOWANCE = 250;
    return obj;
}());

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

/**
 * Reduce the quality, and subsequently, the size of the uploaded image.
 * 
 * @param {File} imgFile  - The image submitted by the user.
 * @returns {string} imgUri - The data URI of imgFile.
 */
function reduceQuality(imgFile) {
    debugger;
    var img = new Image();
    if (window.URL) {
        img.src = URL.createObjectURL(imgFile);
    } else if (window.webkitURL) {
        img.src = webkitURL.createObjectURL(imgFile);
    }

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    var min = 0, max = 1, mid = 0.5;
    var imgUri = canvas.toDataURL(imgFile.type, max);
    var doCompress = imgUri.length > config.MAX_URI_LENGTH ?
        inRange(imgUri.length, config.URI_RANGE_ALLOWANCE, config.MAX_URI_LENGTH) :
        false;

    while (doCompress) {
        if (Math.min(imgUri.length, config.MAX_URI_LENGTH) == imgUri.length) {
            min = mid;
        } else if (Math.max(imgUri.length, config.MAX_URI_LENGTH) == imgUri.length) {
            max = mid;
        }
        mid = (max + min) / 2;
        imgUri = canvas.toDataURL(imgFile.type, mid);
    }
    return imgUri;
}

/**
 * Checks whether a number num is within plus/minus k integers of x. i.e. Is
 * num within the range [x-k, x+k]?
 * 
 * @param {Number} num - The number to 
 * @param {Number} k - 
 * @param {Number} x - The 
 * @returns {boolean} - Is num in the range [x-k, x+k]?
 */
function inRange(num, k, x) {
    if ((num <= x - k) || (num > x + k)) {
        return true;
    }
    return false
}
