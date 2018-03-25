var URL = window.URL || window.webkitURL;

(function init() {
    if (!URL) {
        displayMessage('Your browser is not ' +
            '<a href="http://caniuse.com/bloburls">supported</a>!', true);
        return;
    }

    var inputNode = document.querySelector('input');
    inputNode.addEventListener('change', playSelectedFile, false);
})();

function playSelectedFile(event) {
    var file = this.files[0];
    var type = file.type;
    var videoNode = document.querySelector('video');
    var canPlay = videoNode.canPlayType(type);
    canPlay = (canPlay === '' ? 'no' : canPlay);

    var message = 'Can play type "' + type + '": ' + canPlay;
    var isError = canPlay === 'no';

    displayMessage(message, isError);

    if (isError) {
        return;
    }

    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
}

function displayMessage(message, isError) {
    var messageOutput = document.querySelector('#message');
    messageOutput.innerHTML = message;
    messageOutput.className = isError ? 'bg-danger text-white mt-3 px-3' : 'bg-info text-white mt-3 px-3';
}