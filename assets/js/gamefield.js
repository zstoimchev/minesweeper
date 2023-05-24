let bombLocations = []; //global variable because we use it in multiple functions

// ===================================================================================================================
function createTable() {
    document.write("<table>");
    var queryParams = new URLSearchParams(window.location.search);  //the difficulty value is
    var difficulty = queryParams.get('difficulty');                 //saved in the url, so we extract it
    bombLocations = generateBombLocations(difficulty);              //call the function to generate the bomb locations

    for (let i = 1; i <= 9; i++) {
        document.write("<tr>");
        for (let j = 1; j <= 9; j++) {
            let stringID = i * 10 + j;
            let isBomb = bombLocations.includes(stringID) ? 'bomb' : '';    //if the id is included in the locations, place bomb class
            document.write('<td id="' + stringID + '" onclick="revealTile(event, ' + stringID + ')" oncontextmenu="flagTile(event, ' + stringID + ')" class="' + isBomb + '"><a href="#"><img src="assets/img/SVGs/unoppened.svg" alt="one"></a></td>');
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

// ===================================================================================================================
function generateBombLocations(diff) {  //this function was done with some help from chatGPT
    var bombLocationsInFunction = [];
    var locationNumber = 0;
    while (locationNumber < diff) {
        let randomLocation = Math.floor(Math.random() * 88) + 11; // Generate random number between 11 and 99
        if (randomLocation % 10 == 0) {     //check if the number ends, with 0, we do not use them
            continue;
        }
        if (!bombLocationsInFunction.includes(randomLocation)) {    //if th enew location is not included, include it
            bombLocationsInFunction.push(randomLocation);
            locationNumber = locationNumber + 1;
        }
    }
    return bombLocationsInFunction;
}

// ===================================================================================================================
function generateDifficulty(difficulty) {
    window.location.href = 'play-game.html?difficulty=' + difficulty;   //open the game with the selected fifficulty
}

// ===================================================================================================================
function countFlaggedTiles() {
    var tiles = 0;
    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 9; j++) {
            let id = i * 10 + j;
            if (document.getElementById(id).classList.contains("questionable") || document.getElementById(id).classList.contains("flagged")) {
                tiles++;
            }
        }
    }
    return tiles;
}

// ===================================================================================================================
function checkGameOverWithFlaggedTiles() {
    var correctlyFlaggedTiles = 0;
    var locations = bombLocations.join(",").split(",").length;  //get the length of the list of locations

    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 9; j++) {
            let id = i * 10 + j;
            if (document.getElementById(id).classList.contains("bomb") && (document.getElementById(id).classList.contains("questionable") || document.getElementById(id).classList.contains("flagged"))) {
                correctlyFlaggedTiles++;    //increase how many flags we put
            }
        }
    }

    var actualFlaggedTiles = countFlaggedTiles();   //how many actually there are
    if (actualFlaggedTiles == locations) {  //if out number of flags is correct with the correct number of flags, proceed
        if (correctlyFlaggedTiles == locations) {
            setScore();     //set the score and stop the time
            drawGameOver("victory");    //show game over message
        }
    }
}

// ===================================================================================================================
function checkGameOverWithOppenedTiles() {
    var oppenedTilesCount = 0;     //how many we have oppened
    var locations = bombLocations.join(",").split(",").length;  //the length of the array

    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 9; j++) {
            let id = i * 10 + j;
            if (document.getElementById(id).classList.contains("oppenedTile")) {
                oppenedTilesCount++;
            }
        }
    }
    if (oppenedTilesCount == 81 - locations) {
        setScore();
        drawGameOver("victory");
    }
}

// ===================================================================================================================
function removeListeners(whatToDo) {
    if (whatToDo == "lost") {
        for (var ai = 1; ai <= 9; ai++) {
            for (var aj = 1; aj <= 9; aj++) {
                var IDD = ai * 10 + aj;
                document.getElementById(IDD).removeAttribute("onclick");
                document.getElementById(IDD).removeAttribute('oncontextmenu');
                if (document.getElementById(IDD).classList.contains('bomb'))
                    document.getElementById(IDD).querySelector('img').src = 'assets/img/SVGs/bomb.svg';
            }//endinnerfor
        }//endouterfor
    }
    else {
        for (var ai = 1; ai <= 9; ai++) {
            for (var aj = 1; aj <= 9; aj++) {
                var IDD = ai * 10 + aj;
                document.getElementById(IDD).removeAttribute("onclick");
                document.getElementById(IDD).removeAttribute('oncontextmenu');
            }//endinnerfor
        }//endouterfor
    }
}


const audio = new Audio('../assets/audio/tic-tac-timer.wav');   //these are global,
audio.loop = true;      //because are used in multiple functions
// ===================================================================================================================
function revealTile(event, id) {
    timerStart();       //we start the timer

    if (audio.paused) { //we play the music
        audio.play();
    }

    event.preventDefault();     //prevent default right click
    var element = document.getElementById(id);
    element.removeAttribute('oncontextmenu');
    var image = element.querySelector('img');

    if (element.classList.contains('bomb')) {
        drawGameOver("lost");
        image.src = 'assets/img/SVGs/bombFill.svg'
        return;
    }
    else
        checkMines(id);

    checkGameOverWithOppenedTiles();
}

// ===================================================================================================================
function checkMines(id) {       //this sort of searching algorithm was done by me
    var bombCount = 0;
    var idAsInt = parseInt(id);

    var row = Math.floor(idAsInt / 10);
    var col = idAsInt % 10;

    if (idAsInt == 11) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 19) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 91) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 99) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (row == 1) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        for (var l = (row + 1) * 10 + col - 1; l <= ((row + 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++
    }
    else if (row == 9) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        for (var l = (row - 1) * 10 + col - 1; l <= ((row - 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
    }
    else if (col == 1) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (col == 9) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
    }
    else {
        for (var l = (row - 1) * 10 + col - 1; l <= ((row - 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
        for (var l = (row + 1) * 10 + col - 1; l <= ((row + 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
    }
    printBombNumberImg(bombCount, idAsInt);
}

// ===================================================================================================================
function printBombNumberImg(bombCount, tileID) {
    var element = document.getElementById(tileID);
    var image = element.querySelector('img');
    image.src = 'assets/img/SVGs/' + bombCount + 's.svg';
    element.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent the default right-click context menu
    });
    element.classList.add("oppenedTile");
    if (bombCount == 0) {
        floodFillTile(tileID);
    }
}

// ===================================================================================================================
function floodFillTile(id) {    //this function was done with help of chatGPT
    const element = document.getElementById(id);

    if (!element || element.classList.contains('bomb') || element.classList.contains('revealed')) {
        return; //if the tile has a bomb, already revealed, or not found
    }
    element.classList.add('revealed'); //mark as visited

    const row = Math.floor(id / 10); //row number
    const col = id % 10; //column number

    const directions = [    //the 8 neighboors of the current tile
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];

    let bombCount = 0;  //variable that counts the bombs

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const newRow = row + direction.row;
        const newCol = col + direction.col;
        const newId = newRow * 10 + newCol;

        const adjacentTile = document.getElementById(newId);
        if (adjacentTile && adjacentTile.classList.contains('bomb')) {
            bombCount++;
        }
    }

    if (bombCount === 0) {
        for (const direction of directions) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;
            const newId = newRow * 10 + newCol;

            floodFillTile(newId); // Recursively call floodFillTile on neighboring tiles
        }
    }
    // Update the image source
    const image = element.querySelector('img');
    image.src = 'assets/img/SVGs/' + bombCount + 's.svg';
    element.removeAttribute("onclick");
    element.removeAttribute('oncontextmenu');
    element.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent the default right-click context menu
    });
    element.classList.add("oppenedTile");   //this is for checking game over
}

// ===================================================================================================================
function flagTile(event, id) {
    timerStart();
    event.preventDefault(); // Prevent the default context menu from appearing

    var element = document.getElementById(id);
    var image = element.querySelector('img');

    if (element.classList.contains("flagged")) {
        element.classList.remove("flagged");
        element.classList.add("questionable");
        image.src = 'assets/img/SVGs/questionMark.svg'
        document.getElementById(id).setAttribute('onclick', 'revealTile(event, ' + id + ')');
    }
    else if (element.classList.contains("questionable")) {
        element.classList.remove("questionable");
        document.getElementById(id).setAttribute('onclick', 'revealTile(event, ' + id + ')');
        image.src = 'assets/img/SVGs/unoppened.svg'
    }
    else {
        element.classList.add('flagged');
        document.getElementById(id).removeAttribute("onclick");
        image.src = 'assets/img/SVGs/flag.svg';
    }
    var locations = bombLocations.join(",").split(",").length;
    checkGameOverWithFlaggedTiles();
}

// ===================================================================================================================
function createCookie() {
    // check if there is a cookie for saving the timer value
    if (!document.cookie.includes("bestCookieTime=")) {
        var currentYear = new Date().getFullYear();
        var expirationDate = new Date(currentYear, 11, 31);
        var expires = "expires=" + expirationDate.toUTCString();
        document.cookie = "bestCookieTime=999;" + expires + ";path=/";
    }
    var cookies = document.cookie.split("; ");
    var cookieTime = "";
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === "bestCookieTime") {
            cookieTime = cookie[1];
            break;
        }
    }
    document.getElementById("besttimescore").innerHTML = "" + cookieTime;
}

// ===================================================================================================================
function drawGameOver(condId) {
    document.getElementById(condId).style.display = "block";
    timerStop();
    audio.pause();
    removeListeners(condId);
    audioEnd.src = '../assets/audio/' + condId + '.mp3';
    audioEnd.play();
}

let audioEnd = new Audio();     //this function is not working so..
// ===================================================================================================================
function toggleAudioOnOff(someParamether) {
    if (audioEnd) {
        audioEnd.volume = someParamether;
    }
    if (audio) {
        audio.volume = someParamether;
    }
    console.log(someParamether);
    window.location.href = 'next-page.html?volume=' + someParamether;
}
