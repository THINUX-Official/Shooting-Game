$(".area").click(function () { // when click the area, all the function control through here
    gunAnimation();
    // shootingSound();
    faceSpawns();
    // shootingSound(); // calling twice this method is fixed the issue.
});

// sounds ==============================================================================================================

function shootingSound() {
    let shootingSound = $("#shootingSound")[0];

    if (shootingSound.paused) {
        shootingSound.currentTime = 0;
        shootingSound.play();
        // Remove the "ended" event listener after the first play
        shootingSound.removeEventListener("ended");
    } else {
        shootingSound.pause();
    }
}

function startSound() {
    let startSound = $("#startSound")[0];
    startSound.play();
}

function pauseSound() {
    let pauseSound = $("#pauseSound")[0];
    pauseSound.play();
}

function unpauseSound() {
    let unpauseSound = $("#unpauseSound")[0];
    unpauseSound.play();
}

// gun animation =======================================================================================================

let gunFire = ["assets/img/pistol/1.png", "assets/img/pistol/2.png", "assets/img/pistol/3.png", "assets/img/pistol/4.png", "assets/img/pistol/5.png"];

let currentIndex = 0;
// let gunImage = document.getElementById("gunImage");
let gunImage = $("#gunImage")[0];

function gunAnimation() {

    let interval = setInterval(function () {
        gunImage.src = gunFire[currentIndex];
        currentIndex = (currentIndex + 1) % gunFire.length;
    }, 100); // Time interval between each image change (adjust as needed)

    // After some time, stop the animation and show the default image
    setTimeout(function () {
        clearInterval(interval);
        gunImage.src = "assets/img/pistol/1.png"; // Set the default image

    }, 500);
}

// face spawns =========================================================================================================

// let start = new Date().getTime();
// let end = new Date().getTime();
// let time = ((end - start) / 1000); // execution time

function faceSpawns() {
    function shapeAppear() {
        // generate random appearing locations.
        let top = Math.random() * 350;
        let left = Math.random() * 1450;

        $("#faces").css("display", "block"); // make the face visible.
        $("#faces").css("text", "center");
        $("#faces").css({"top": top + "px", "left": left + "px"}); // set the position of the face element.

        /*let face1 = "assets/img/faces/1.png";
        let face2 = "assets/img/faces/2.png";
        let face3 = "assets/img/faces/3.png";
        let face4 = "assets/img/faces/4.png";*/

        /*if (time < 1000) {
            $("#faces").attr("src", face1);
        } else if (time >= 1000 && time < 2000) {
            $("#faces").attr("src", face2);
        } else if (time >= 2000 && time < 3000) {
            $("#faces").attr("src", face3);
        } else if (time >= 3000) {
            $("#faces").attr("src", face4);
        }*/
    }

    let clickCount = 0;
    let score = 0;

    $("#faces").click(function () {
        clickCount++;
        score = clickCount;

        console.log("click count" + score);

        $("#score").text(score);

        $("#faces").css("display", "none");

        shapeAppear();
    });
}

// one-minute timer ====================================================================================================

$("#timer").text("00:00"); // display timer before start.

let timeInterval;
let remainingTime = 0;
let type = 'start'; // toggle variable(change values) for the button, and it will hold values such as start, pause and resume.

function startTimer(duration, display) { // countdown and update the display.

    clearInterval(timeInterval); // check if timeout is running, it will be closed first.

    let timer = duration;

    timeInterval = setInterval(function () {
        // pastInt function use to convert result to integer.
        // The second argument 10 specifies the radix or base (decimal in this case).
        let minutes = parseInt(timer / 60, 10); // if timer is 120 seconds, then minutes would be 2 (120 / 60 = 2).
        let seconds = parseInt(timer % 60, 10); // if timer is 120 seconds, then seconds would be 0 (120 % 60 = 0).

        minutes = minutes < 10 ? "0" + minutes : minutes; // if minutes is 5, then formattedMinutes would be "05". If minutes is 15, then formattedMinutes would be "15".
        seconds = seconds < 10 ? "0" + seconds : seconds; //  if seconds is 3, then formattedSeconds would be "03". If seconds is 25, then formattedSeconds would be "25".

        // updating text content of the display element with formatted minutes and seconds.
        display.text(minutes + ":" + seconds); // if formattedMinutes is "05" and formattedSeconds is "30", the result would be "05:30".

        if (--timer < 0) {
            clearInterval(timeInterval); //  stops the timer from counting down further.
            timer = duration; //  restarts the timer, allowing it to count down again from the specified duration.
            $("#start").text("START");
        }
    }, 1000); // 1000 milliseconds (1 second).
}

let oneMinute = 60; // set the duration of the timer to one minute.
let display = $("#timer"); // select the element with the id "timer".

// start button ========================================================================================================

$("#start").click(function () {

    $("#log").css("display", "none"); // make the face visible.

    faceSpawns();

    if (type === 'start') {
        startSound();
        // start timer
        startTimer(oneMinute, display);
        type = 'pause';
        $("#start").text("PAUSE");

    } else if (type === 'pause') {
        unpauseSound();
        type = 'resume';
        $("#start").text("RESUME");
        clearInterval(timeInterval);
        remainingTime = oneMinute - ($("#timer").text().split(':')[0] * 60 + parseInt($("#timer").text().split(':')[1]));

    } else if (type === 'resume') {
        pauseSound();
        type = 'pause';
        $("#start").text("PAUSE");
        startTimer(oneMinute - remainingTime, display);
    }
});