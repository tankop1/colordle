currentRow = 1; // Out of 6
currentColumn = 1; // Out of 5
correctColor = Math.floor(Math.random()*16777215).toString(16);
placeColor = Math.floor(Math.random()*16777215).toString(16);
wrongColor = Math.floor(Math.random()*16777215).toString(16);

wordList = ["cigar","rebut","sissy","humph","awake","blush","focal","evade","naval","serve","heath","dwarf","model","karma","stink","grade","quiet","bench","abate","feign","major","death","fresh","crust","stool","colon","abase","marry","react"];
keyList = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
dailyWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

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
        if ($(key).text().toLowerCase() == keyText.toLowerCase()) {
            $(key).css({'background-color': "#" + color});
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
    $('#message p').text('Great Job!');
    $('#message').css({'animation': 'messageIn 0.5s 1'});
    setTimeout(() => {
        $('#message').css({'background-color': 'black'});
        $('#message').css({'color': 'white'});
    }, 0.5);
}

function lose() {
    $('#message p').text('Maybe Next Time!');
    $('#message').css({'animation': 'messageIn 0.5s 1'});
    setTimeout(() => {
        $('#message').css({'background-color': 'black'});
        $('#message').css({'color': 'white'});
    }, 0.5);

    console.log('TODAYS WORD: ' + dailyWord);
}

function enterPressed() {
    currentWord = getCurrentWord(currentRow);

    applyColors(currentRow);

    if (currentWord.toUpperCase() == dailyWord) {
        win();
    }

    if (currentWord.length == 5) {
        if (currentRow == 6) {
            lose();
        }

        else {
            currentRow++;
            currentColumn = 1;
        }
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