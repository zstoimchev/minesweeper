var TotalSecFractions = 0
var timerInterval = null;
var timerStarted = false;
var minutes = 0;
var seconds = 0;

// ===================================================================================================================
function makeTimerText(secFractions) {
    seconds = Math.floor(secFractions / 10);
    if (seconds < 10) {
        seconds = "00" + seconds;
    }
    else if (seconds < 100) {
        seconds = "0" + seconds;
    }
    else {
        seconds = "" + seconds;
    }
    return seconds;
}

// ===================================================================================================================
function incrementTimeByOneFraction() {
    TotalSecFractions++;
    document.getElementById("timer").innerHTML = makeTimerText(TotalSecFractions);
}

// ===================================================================================================================
function mouseOnInstructions() {
    document.getElementsByClassName("instructions")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
}
function mouseOutInstructions() {
    document.getElementsByClassName("instructions")[0].style.animation = "fade-out-game-elements 1s ease-in-out forwards";
}
function mouseOnStatistics() {
    document.getElementsByClassName("statistics")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
}
function mouseOutStatistics() {
    document.getElementsByClassName("statistics")[0].style.animation = "fade-out-game-elements 1s ease-in-out forwards";
}

// ===================================================================================================================
function timerStart() {
    if (timerStarted == true)
        return;

    timerInterval = stimerInterval = setInterval(incrementTimeByOneFraction, 100);
    timerStarted = true;

    document.getElementsByClassName("instructions")[0].style.animation = "fade-out-game-elements 1s ease-in-out forwards";
    document.getElementsByClassName("statistics")[0].style.animation = "fade-out-game-elements 2s ease-in-out forwards";

    document.getElementsByClassName("instructions")[0].addEventListener("mouseenter", mouseOnInstructions);
    document.getElementsByClassName("instructions")[0].addEventListener("mouseleave", mouseOutInstructions);

    document.getElementsByClassName("statistics")[0].addEventListener("mouseenter", mouseOnStatistics);
    document.getElementsByClassName("statistics")[0].addEventListener("mouseleave", mouseOutStatistics);
}

// ===================================================================================================================
function timerStop() {
    clearInterval(timerInterval);
    timerStarted = false;
    document.getElementsByClassName("instructions")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
    document.getElementsByClassName("statistics")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";

    document.getElementsByClassName("instructions")[0].style.opacity = 1;
    document.getElementsByClassName("statistics")[0].style.opacity = 1;

    document.getElementsByClassName("instructions")[0].removeEventListener("mouseenter", mouseOnInstructions);
    document.getElementsByClassName("instructions")[0].removeEventListener("mouseleave", mouseOutInstructions);

    document.getElementsByClassName("statistics")[0].removeEventListener("mouseenter", mouseOnStatistics);
    document.getElementsByClassName("statistics")[0].removeEventListener("mouseleave", mouseOutStatistics);
}

// ===================================================================================================================
function setScore() {
    var cookies = document.cookie.split("; ");  // first we get all the cookies
    var cookieTime = "";
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === "bestCookieTime") {
            cookieTime = cookie[1];
            break;
        }
    }
    if (seconds < cookieTime) {
        document.cookie = "bestCookieTime=" + seconds + "; expires=Thu, 28 Dec 2023 12:00:00 UTC";
        document.getElementById("besttimescore").innerHTML = "" + seconds;
    }
    else
        return;
}
