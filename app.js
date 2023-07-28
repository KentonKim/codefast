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
    lineElement.classList.add("line", "selectedLine");

    // For each word
    for (let i = 0; i < arrayOfWords.length; i++) {
        wordElement = document.createElement('div');
        wordElement.classList.add('word');

        if (i == 0) {
            wordElement.classList.add("active");
        }

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
            letterElement.textContent = '    ';
            wordElement.appendChild(letterElement);
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
}


const attempt = parseStringToLetters(testString);
displayWords(attempt,wordBank);

// Initialize shit
let currentLine = document.querySelector('.line');
let currentWord = document.querySelector('.word');
const wordsArray = document.querySelectorAll('.word');
const characterArray = document.querySelectorAll('letter');

document.addEventListener('keydown', letterInputEvent);

function letterInputEvent(e) {
    const key = e.key;
    const regexAllowableKeys = /^(?!Shift$)[ \t\b\na-zA-Z-9!@#$%^&*\`\~\(\)\-\_\=\+\[\]\{\}\;\:\'\"\,\<\.\>\/\?\\\|]/;

    function moveToNextLine() {
        // Check if its the last line
        if (currentLine.nextSibling == null) {
            return;
        }

        currentLine.classList.remove('selectedLine');
        currentWord.classList.remove('active');

        // Check if you're at the beginning of a new line (you haven't written anything at new line)
        if (currentLine.childNodes[0] == currentWord 
            && Array.from(currentLine.childNodes[0].childNodes).every((node) =>
                node.classList.length == 0
            )) {
            let newLine = document.createElement('div');
            newLine.classList.add('line');
            currentLine.parentNode.insertBefore(newLine,currentLine.nextSibling);
            currentLine = currentLine.nextSibling;
        }

        currentLine = currentLine.nextSibling;
        currentLine.classList.add('selectedLine');

        currentWord = currentLine.childNodes[0];
        currentWord.classList.add('active');
        return currentLine;
    }

    function moveToNextWord() {
        // Check if its the last word
        if (currentWord.nextSibling == null) {
            return;
        }
        currentWord.classList.remove('active');
        currentWord = currentWord.nextSibling
        currentWord.classList.add('active');
    }

    function moveToPreviousWord() {

    }


    if (!regexAllowableKeys.test(key)) {
        return;
    }
    console.log(key);
    if (key == "Enter") {
        moveToNextLine();
    }
    if (key == " ") {
        moveToNextWord();
    }
    // Is a 
    // Beginning of new word
    // Middle of word
    // End of word

    return;
}

function    letter()  {

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
