const wordBank = document.getElementById('words');
const wordInput = document.getElementById('wordsInput');
let characterPointer = 0;
const testString = `class Solution: def twoSum(self, nums: List[int], target: int) -> List[int]:
    d = {}
    for index, value in enumerate(nums):
        if target-value in d:
            return [d[target-value], index]
        d[value] = index`;
            
// On startup
    // function getString() 
        // get passage of code to be typed out
        // make into a string
        // return string

function parseStringToLetters(string) {
    return string.match(/[^\s]+|\n| {4}/g);
}

function displayWords(arrayOfWords, wordBoxElement) {
    let letterElement;
    let wordElement;
    let lineElement = document.createElement('div');
    lineElement.classList.add("line");

    // For each word
    for (let i = 0; i < arrayOfWords.length; i++) {
        wordElement = document.createElement('div');
        wordElement.classList.add('word');

        if (arrayOfWords[i] == "\n") {
            letterElement = document.createElement('letter');
            letterElement.textContent = "↩";
            wordElement.appendChild(letterElement);
            lineElement.appendChild(wordElement);
            wordBoxElement.appendChild(lineElement);
            lineElement = document.createElement('div');
            lineElement.classList.add("line");
            continue;
        }


        if (arrayOfWords[i] == "    ") {
            letterElement = document.createElement('letter');
            letterElement.classList.add('correct');
            letterElement.textContent = '    ';
            wordElement.appendChild(letterElement);
            wordElement.classList = 'tab';
        }
        else {
            for (let j = 0; j < arrayOfWords[i].length; j++) {
                letterElement = document.createElement('letter');
                letterElement.textContent = arrayOfWords[i][j];
                wordElement.appendChild(letterElement);
            }
        }
        lineElement.appendChild(wordElement);
    }
    // Last Line
    wordBoxElement.appendChild(lineElement);
    // TODO TAB SHOULD BE CORRECT
}


const attempt = parseStringToLetters(testString);
displayWords(attempt,wordBank);

// Initialize shit
let currentLine = document.querySelector('.line');
let currentWord = document.querySelector('.word');
let currentLetter = document.querySelector('letter');
currentLine.classList.add('activeLine');
currentWord.classList.add('activeWord');

document.addEventListener('keydown', letterInputEvent);

function letterInputEvent(e) {
    const key = e.key;
    const regexAllowableKeys = /^(?!Shift$)^(?!Tab$)[ \b\na-zA-Z-9!@#$%^&*\`\~\(\)\-\_\=\+\[\]\{\}\;\:\'\"\,\<\.\>\/\?\\\|]/;
    if (!regexAllowableKeys.test(key)) {
        return;
    }
    console.log(currentLetter.textContent);

    function determineWordCorrect() {
        currentWord.classList = 'word';
        for (let i = currentWord.childNodes.length - 1; i >= 0; i--) {
            if (currentWord.childNodes[i].classList.length == 0
            || currentWord.childNodes[i].classList.contains('excess') 
            || currentWord.childNodes[i].classList.contains('incorrect')) {
                currentWord.classList.add('misspelled');
                return -1;
            }
            else if (currentWord.childNodes[i].classList.contains('style')) {
                currentWord.classList.add('partial');
                return 0;
            }
        }
        return 1;
    }

    function moveToNextLine() {
        if (currentLine.nextSibling == null) {
            return;
        }
        currentLine.classList.remove('activeLine');
        currentWord.classList.remove('activeWord');
        while (currentWord.nextSibling!= null) {
            determineWordCorrect();
            currentWord = currentWord.nextSibling;
        }
        currentLine = currentLine.nextSibling;
        currentLine.classList.add('activeLine');
        currentWord = currentLine.childNodes[0];
        while (currentWord.childNodes[0].textContent == "    ") {
            currentWord = currentWord.nextSibling;
        }
        currentWord.classList.add('activeWord');
        currentLetter = currentWord.childNodes[0];
        return;
    }

    function moveToNextWord() {
        if (currentWord.nextSibling.childNodes[0].textContent == "↩") {
            addExcessLetter();
            return;
        }
        determineWordCorrect();
        currentWord.classList.remove('activeWord');
        currentWord = currentWord.nextSibling;
        currentWord.classList.add('activeWord');
        currentLetter = currentWord.childNodes[0];
    }

    function moveToPreviousWord() {
        if (currentWord.previousSibling == null 
            || (!currentWord.previousSibling.classList.contains('misspelled') 
            && !currentWord.previousSibling.classList.contains('partial'))) {
            return;
        }
        currentWord.classList = 'word';
        currentWord = currentWord.previousSibling;
        currentWord.classList.add('activeWord');
        for (let i = currentWord.childNodes.length - 1; i >= 0; i--) {
            if (currentWord.childNodes[i].classList.length > 0) {
                currentLetter = currentWord.childNodes[i];
                return;
            }
        }
        currentLetter = currentWord.childNodes[0];
        return;
    }

    if (key == "Enter") {
        moveToNextLine();
        return;
    }
    else if (key == " ") {
        if ((currentLetter.previousSibling == null 
            || currentLetter.previousSibling.classList.contains('style')) 
            && currentLetter.classList.length == 0) {
            let newletter = document.createElement('letter');
            newletter.classList.add('style');
            newletter.textContent = " ";
            currentWord.insertBefore(newletter, currentLetter);
            return;
        }
        moveToNextWord();
        return;
    }

    else if (key == "Backspace") {
        if (currentLetter.classList.length != 0) {
            if (currentLetter.classList.contains('excess')
            || currentLetter.classList.contains('style')) {
                currentLetter = currentLetter.previousSibling;
                currentLetter.nextSibling.remove();
                return;
            }
            currentLetter.classList = '';
            return;
        }
        if (currentLetter.previousSibling == null) {
            moveToPreviousWord();
            return;
        }
        if (currentLetter.previousSibling.classList.contains('style')) {
            currentLetter.previousSibling.remove();
            return;
        }
        currentLetter = currentLetter.previousSibling;
        currentLetter.classList = '';
        return;
    }

    else { 
        if (currentLetter.classList.length != 0) {
            if (currentLetter.nextSibling == null) {
                let newletter = document.createElement('letter');
                newletter.classList.add('excess');
                newletter.textContent = key;
                currentWord.appendChild(newletter);
                currentLetter = currentLetter.nextSibling;
                return;
            }
            currentLetter = currentLetter.nextSibling;
        }
        if (key == currentLetter.textContent) {
            currentLetter.classList.add('correct');
        }
        else {
            currentLetter.classList.add('incorrect');
        }
    }
    return;
}

// Start typing
    // Event listener for the right letter

    // If there is a timer, inititate timer
    // startTimer()
        // Update DOM timer every second

// Typing
    // Event listener every keydown
        // Case 1 (At start of word)
            // Case 1.1 (Previous word was incorrect)
                // Put cursor right after most recent filled in letter (correct / incorrect / extra)
            // Case 1.2 (Previous word was correct)
                // Unable to backspace
        // Case 2 (At middle or end of work)
            // Backspace normally

        // Case 3 (spacebar at end of word): correct
            // move onto next word (nothing happens)
        // Case 4 (excessive spacebar): technically correct
            // Case 4.1 (between words)
            // Case 4.2 (between variables and equal signs)
                // ex: def fxn(filename, start_depth=None): ---> def fxn( filename , start_depth = None ) :
        // Case 5 (not enough spacebar): technically correct
        // Case 6 (preemptive spacebar): incorrect
// spaces between words and between parentheses should not count as an error

// End condition
    // Identify end conditon
        // Timer
        // Passage
        // Manually end
    // Stop all Event listeners

// Results
    // WPM
    // Style points
    // Accuracy
    // Raw
    // Characters

// Replay feature
