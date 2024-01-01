// Start button

/*all the function control through here*/
$(".area").on("click", function () {
    faceSpawns();
    gunAnimation();
    sound();
});

/*sound animation*/

function sound() {
    let audio = document.getElementById("audio");
    let gunImage = document.getElementById("gunImage");


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

let gunFire = ["assets/img/pistol/1.png", "assets/img/pistol/2.png", "assets/img/pistol/3.png", "assets/img/pistol/4.png", "assets/img/pistol/5.png"];

let currentIndex = 0;
let gunImage = document.getElementById("gunImage");

function gunAnimation() {
    let interval = setInterval(() => {
        gunImage.src = gunFire[currentIndex];
        currentIndex = (currentIndex + 1) % gunFire.length;
    }, 100); // Time interval between each image change (adjust as needed)

    // After some time, stop the animation and show the default image
    setTimeout(() => {
        clearInterval(interval);
        gunImage.src = "assets/img/pistol/1.png"; // Set the default image
    }, 500); // Total animation time (adjust as needed)
}


/*face spawns*/

let start = new Date().getTime();
let end = new Date().getTime();
let time = ((end - start) / 1000); // execution time

function faceSpawns() {
    function shapeAppear() {
        // random appearing location
        let top = Math.random() * 400;
        let left = Math.random() * 1400;

        document.getElementById("faces").style.display = "block";

        start = new Date().getTime();

        document.getElementById("faces").style.top = top + "px";
        document.getElementById("faces").style.left = left + "px";

        // change the shape of the element
        document.getElementById("faces").style.borderRadius = "50%";

        // face change with the time get
        let time = 1;

        let face1 = "assets/img/faces/1.png";
        let face2 = "assets/img/faces/2.png";
        let face3 = "assets/img/faces/3.png";
        let face4 = "assets/img/faces/4.png";

        if (time < 1) {
            document.getElementById("faces").src = face1;
        } else if (time >= 1 && time < 2) {
            document.getElementById("faces").src = face2;
        } else if (time >= 2 && time < 3) {
            document.getElementById("faces").src = face3;
        } else if (time >= 3) {
            document.getElementById("faces").src = face4;
        }
    }

    function shapeAppearDelay() {
        setTimeout(shapeAppear, Math.random() * 1000);
    }

    shapeAppearDelay();

    document.getElementById("faces").onclick = function () {
        document.getElementById("faces").style.display = "none";

        end = new Date().getTime();
        time = ((end - start) / 1000); // execution time

        // set the time
        // document.getElementById("time").innerHTML = time + "s";

        shapeAppearDelay();
    }
}


/*one-minute timer*/
$(document).ready(function () { // ensure, code that inside this function will load, when the HTML document fully loaded.

    $("#timer").text("00:00"); // display timer before start.

    let timeInterval;
    let isTimeRunning = false; // whether the timer is currently running or paused.
    let remainingTime = 0;

    function startTimer(duration, display) { // countdown and update the display.

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
                isTimeRunning = false;
                $("#start").text("START");
            }
        }, 1000); // 1000 milliseconds (1 second).

        isTimeRunning = true;
        $("#start").text("PAUSE"); // display timer after pause.
    }

    let oneMinute = 60; // set the duration of the timer to one minute.
    let display = $("#timer"); // select the element with the id "timer".

    $("#start").click(function () {
        if (!isTimeRunning) {
            $("#timer").text("00:00"); // display timer before start.
            timeInterval = startTimer(oneMinute, display); // start the timer.
        } else {
            clearInterval(timeInterval);
            isTimeRunning = false;
            remainingTime = oneMinute - ($("#timer").text().split(':')[0] * 60 + parseInt($("#timer").text().split(':')[1]));
            $("#start").text("RESUME"); // display timer after resume.
        }
    });
});

