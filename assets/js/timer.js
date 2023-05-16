var TotalSecFractions = 0
var timerInterval = null;
var timerStarted = false;

// In the starting position of the timer 00:00.0, the first two 00 denote minutes, the next two 00 denote seconds, and the last 0 (after the ".") denotes a 10th of a second.
//The function makeTimerText(secFractions) bellow takes as an argument the total number of 10ths of a second that have elapsed and returns the number of minutes, seconds and 10ths of a second as string in the format MM:SS.F
// For example 6561 10ths of a second is 656.1 seconds or 1 minute 56 seconds and 1 10th of a second, so  makeTimerText(6561) will return 01:56.1 for you in a string.
//We call a 10th of a second "a fraction of a second", and in the code we call them secFractions.

function makeTimerText(secFractions) {
    minutes = Math.floor(secFractions / 600);
    seconds = ((secFractions % 600) / 10).toFixed(1);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return (minutes + ":" + seconds);
}

function incrementTimeByOneFraction() {
    //Increment the total number of secFractions by one
    //Display Time
    TotalSecFractions++;
    document.getElementById("timer").innerHTML = makeTimerText(TotalSecFractions);
}

function mouseOnInstructions () {
    document.getElementsByClassName("instructions")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
}

function mouseOutInstructions () {
    document.getElementsByClassName("instructions")[0].style.animation = "fade-out-game-elements 1s ease-in-out forwards";
}

function mouseOnStatistics () {
    document.getElementsByClassName("statistics")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
}

function mouseOutStatistics () {
    document.getElementsByClassName("statistics")[0].style.animation = "fade-out-game-elements 1s ease-in-out forwards";
}


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







function timerStop() {
    clearInterval(timerInterval);
    timerStarted = false;
    document.getElementsByClassName("instructions")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
    document.getElementsByClassName("statistics")[0].style.animation = "fade-in-game-elements 1s ease-in-out forwards";
    
    
    document.getElementsByClassName("instructions")[0].style.opacity=1;
    document.getElementsByClassName("statistics")[0].style.opacity=1;


    document.getElementsByClassName("instructions")[0].removeEventListener("mouseenter", mouseOnInstructions);
    document.getElementsByClassName("instructions")[0].removeEventListener("mouseleave", mouseOutInstructions);

    document.getElementsByClassName("statistics")[0].removeEventListener("mouseenter", mouseOnStatistics);
    document.getElementsByClassName("statistics")[0].removeEventListener("mouseleave", mouseOutStatistics);




}

function reset() {
    //...
    TotalSecFractions = 0;
    document.getElementById("timer").innerHTML = makeTimerText(TotalSecFractions);
}
