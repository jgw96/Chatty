const peer = new Peer({ key: 'lwjd5qra8257b9' });
const video = document.querySelector('video');
const fabButton = document.querySelector("#fabButton");
const callDialog = document.querySelector("paper-dialog");
const callButton = document.querySelector("#callButton");
const callInput = document.querySelector("#callInput");
const callEndButton = document.querySelector("#callEndButton");
const idBlock = document.querySelector("#idBlock");
const smiley = document.querySelector("iron-image");

let caller;

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    const idSpan = document.querySelector("#myId");
    idSpan.innerHTML = id;
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', (call) => {

    callEndButton.style.display = "block";
    fabButton.style.display = "none";
    idBlock.style.display = "none";
    smiley.style.display = "none";
    

    callEndButton.addEventListener("click", () => {
        call.close();
    })

    call.on("close", () => {
        callEndButton.style.display = "none";
        fabButton.style.display = "block";
        idBlock.style.display = "block";
        smiley.style.display = "inline-block";
        video.src = "";
    })

    navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
            // Show stream in some video/canvas element.
            video.src = window.URL.createObjectURL(remoteStream);
        });
    }, (err) => {
        console.log('Failed to get local stream', err);
    });
});

fabButton.addEventListener("click", () => {
    callDialog.open();
});

callButton.addEventListener("click", () => {

    setTimeout(() => {
        callEndButton.style.display = "block";
        fabButton.style.display = "none";
        idBlock.style.display = "none";
        smiley.style.display = "none";
        

        callEndButton.addEventListener("click", () => {
            caller.close();
        })

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({ video: true, audio: true }, (stream) => {
            caller = peer.call(callInput.value, stream);
            caller.on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
                video.src = window.URL.createObjectURL(remoteStream)
            });
            caller.on("close", () => {
                callEndButton.style.display = "none";
                fabButton.style.display = "block";
                idBlock.style.display = "block";
                smiley.style.display = "inline-block";
                video.src = "";
            })
        }, (err) => {
            console.log('Failed to get local stream', err);
        });
    }, 500);

});
