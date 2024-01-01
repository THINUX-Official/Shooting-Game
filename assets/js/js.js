/*all the function control through here*/
$(".area").on("click", function () {
    faceSpawns();
    gunAnimation();
    sound();
});

/*sound animation*/
{
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
}

/*gun animation*/
{
    let gunFire = ["assets/img/pistol/1.png", "assets/img/pistol/2.png", "assets/img/pistol/3.png",
        "assets/img/pistol/4.png", "assets/img/pistol/5.png"];

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
}

/*face spawns*/
{
    var start = new Date().getTime();
    var end = new Date().getTime();
    var time = ((end - start) / 1000); // execution time

    function faceSpawns() {
        function shapeAppear() {
            // random appearing location
            var top = Math.random() * 400;
            var left = Math.random() * 1400;

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
}

/*one minute timer*/
{
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
    }
}