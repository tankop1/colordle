currentRow = 1; // Out of 6
currentColumn = 1; // Out of 5
correctColor = Math.floor(Math.random()*16777215).toString(16);
placeColor = Math.floor(Math.random()*16777215).toString(16);
wrongColor = Math.floor(Math.random()*16777215).toString(16);

wordList = ['rupee', 'vivid', 'flour', 'twerp'];
keyList = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
dailyWord = wordList[3].toUpperCase();

function keyPressed(event) {
    key = $(event.target).text();

    if (currentColumn <= 5 && ($(event.target).attr('id') != 'back' || $(event.target).attr('id') != 'enter')) {
        $('#' + currentRow + currentColumn).text(key);
        currentColumn++;
    }
}

function keyPressedManual(event)
{
    let keyCode = (event.keyCode ? event.keyCode : event.which);
    let keyChar = String.fromCharCode(event.which)

    // ENTER PRESSED
    if (keyCode == 13) {
        enterPressed();
    }

    // BACKSPACE PRESSED
    else if (keyCode == 8) {
        backspacePressed();
    }

    // KEY PRESSED
    else {
        if (keyList.includes(keyChar.toLowerCase())) {
            $('#' + currentRow + currentColumn).text(keyChar);
            currentColumn++;
        }

        else {
            console.log("INVALID KEY: " + keyChar);
        }
    }
}

function backspacePressed() {
    if (currentColumn != 1) {
        currentColumn--;
        $('#' + currentRow + currentColumn).text('');
    }
}

function getCurrentWord(row) {
    currentWord = '';

    for (let i = 1; i <= 5; i++) {
        currentWord += $('#' + row + i).text();
    }

    return currentWord;
}

function changeKeyColor(keyText, color) {
    $('.key').each((i, key) => {
        if ($(key).text() == keyText) {
            $(key).css({'background-color': color});
        }
    });
}

function applyColors(row) {
    for (let i = 1; i <= 5; i++) {
        currentLetter = $('#' + row + i).text();
        
        if (currentLetter == dailyWord[i - 1]) {
            color = "#" + correctColor;
            changeKeyColor(currentLetter, correctColor);
        }

        else if (dailyWord.includes(currentLetter)) {
            color = "#" + placeColor;
            changeKeyColor(currentLetter, placeColor);
        }

        else {
            color = "#" + wrongColor;
            changeKeyColor(currentLetter, wrongColor);
        }

        $('#' + row + i).parent().css({'background-color': color});
    }
}

function win() {
    $('#message').css({'animation': 'messageIn 0.5s 1'});
    setTimeout(() => {
        $('#message').css({'background-color': 'black'});
        $('#message').css({'color': 'white'});
    }, 0.5);

    setTimeout(() => {
        $('#message').css({'background-color': 'rgba(0, 0, 0, 0)'});
        $('#message').css({'color': 'rgba(255, 255, 255, 0)'});
    }, 1);
}

function enterPressed() {
    currentWord = getCurrentWord(currentRow);
    console.log(currentWord);

    applyColors(currentRow);

    if (currentWord.toUpperCase() == dailyWord) {
        win();
    }

    if (currentWord.length == 5) {
        currentRow++;
        currentColumn = 1;
    }

    else {
        console.log("NOT A FULL WORD");
    }
}

$('#exit').click(() => {$('#popup').css({'display': 'none'});});
$('#help').click(() => {
    $('#stats').css({'display': 'none'});
    $('#popup').css({'display': 'flex'});
});

$('#stats-exit').click(() => {$('#stats').css({'display': 'none'});});
$('#stats-button').click(() => {
    $('#popup').css({'display': 'none'});
    $('#stats').css({'display': 'flex'});
});

$('.key').each((i, key) => $(key).click(keyPressed));
$('#enter').click(enterPressed);
$('#back').click(backspacePressed);
$('html').keyup(keyPressedManual);