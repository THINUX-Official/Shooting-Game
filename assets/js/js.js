$(".area").on("click", function () {
    sound();

    gunAnimation();
});

function sound() {
    let audio = document.getElementById("audio");

    if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
        // Remove the "ended" event listener after the first play
        audio.removeEventListener("ended", loopAudio);
    } else {
        audio.pause();
    }
}

/*gun animation*/

let gunFire = ["assets/img/pistol/2.png", "assets/img/pistol/3.png",
    "assets/img/pistol/4.png", "assets/img/pistol/5.png", "assets/img/pistol/6.png"];

let currentIndex = 0;
const gunImage  = document.getElementById("gunImage");

function gunAnimation() {

    gunImage.src = gunFire[currentIndex];
    currentIndex =(currentIndex + 1) % gunFire.length;

}


function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let oneMinute = 60,
        display = document.getElementById("timer");
    startTimer(oneMinute, display);
};