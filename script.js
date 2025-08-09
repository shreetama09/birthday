const video = document.getElementById("video");
const message = document.getElementById("message");
let alreadyWished = false;  // So the message appears only once

// Load face detection model
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models")
]).then(startVideo).catch((err) => console.error("Model load error:", err));

// Start the webcam
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => console.error("Webcam error:", err));
}

// Once video is playing, start checking for faces
video.addEventListener("play", () => {
  const interval = setInterval(async () => {
    const detection = await faceapi.detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );

    console.log("Detection:", detection);

    if (detection && !alreadyWished) {
      message.style.display = "block";
      alreadyWished = true;

      // Speech: Say Happy Birthday
      const wish = new SpeechSynthesisUtterance("Happy Birthday!");
      speechSynthesis.speak(wish);
    }
  }, 800); // check every 800ms
});