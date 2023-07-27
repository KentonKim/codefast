const wordBank = document.getElementById('words');
const wordInput = document.getElementById('wordsInput');
const testString = `class Solution: def twoSum(self, nums: List[int], target: int) -> List[int]:
    d = {}
    for index, value in enumerate(nums):
        if target-value in d:
            return [d[target-value], index]
        d[value] = index`;
let characterPointer = 0;
            
// On startup
    // function getString() 
        // get passage of code to be typed out
        // make into a string
        // return string

function parseStringToLetters(string) {
    let arrayOfLetters = [];
    const words = string.match(/[^\s]+|\n/g);
    for (let word of words) {
        arrayOfLetters.push(word.split(''));
    }
    return arrayOfLetters;
}

function displayWords(arrayOfArrays, wordBoxElement) {

    let lineElement = document.createElement('div');
    lineElement.classList.add("line","flexDisplay");

    for (let i = 0; i < arrayOfArrays.length; i++) {
        let wordElement = document.createElement('div');
        wordElement.classList.add('word');
        for (let j = 0; j < arrayOfArrays[i].length; j++) {
            let letterElement = document.createElement('letter');
            letterElement.textContent = arrayOfArrays[i][j];
            wordElement.appendChild(letterElement);
        }

        lineElement.appendChild(wordElement);

        if (wordElement.childNodes[0].textContent == "\n"){
            wordElement.childNodes[0].textContent = "↩";
            wordBoxElement.appendChild(lineElement);
            lineElement = document.createElement('div');
            lineElement.classList.add("line","flexDisplay");
        }
    }
    // Last Line
    wordBoxElement.appendChild(lineElement);
}

const attempt = parseStringToLetters(testString);
console.log(attempt);
displayWords(attempt,wordBank);

const wordsArray = document.querySelectorAll('.word');
const characterArray = document.querySelectorAll('letter');
document.addEventListener('keydown', (e) => {
    const key = e.key;
    wordInput.value += key;
    e.preventDefault();
});


document.addEventListener('keydown', letterInputEvent);

function letterInputEvent(e) {
    const key = e.key;
    const regexAllowableKeys = /^(?!Shift$)[\b\na-zA-Z0-9!@#$%^&*\`\~\(\)\-\_\=\+\[\]\{\}\;\:\'\"\,\<\.\>\/\?\\\|]/;
    if (!regexAllowableKeys.test(key)) {
        return;
    }
    if (key == "Backspace") {


    }
    // Case 1 (nonspace-char): correct
    if (key == characterArray[characterPointer].textContent || (key == "Enter" && characterArray[characterPointer].textContent == "↩")) {
        if (key == "Enter") {
            characterArray[characterPointer].classList.add('hidden');
        }
        characterArray[characterPointer].classList.add('correct')
        characterPointer++;
    // Case 2 (nonspace-char): incorrect
    }
    else if (key != characterArray[characterPointer].textContent) {
        characterArray[characterPointer].classList.add('incorrect')
        characterPointer++;
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
        // Case 3 (spacebar at end of word): correct
            // move onto next word (nothing happens)
        // Case 4 (excessive spacebar): technically correct
            // ex: def fxn(filename, start_depth=None): ---> def fxn( filename , start_depth = None ) :
        // Case 5 (not enough spacebar): technically correct
        // Case 6 (preemptive spacebar): incorrect

    // Backspace
        // Case 1 (At start of word)
            // Case 1.1 (Previous word was incorrect)
                // Put cursor right after most recent filled in letter (correct / incorrect / extra)
            // Case 1.2 (Previous word was correct)
                // Unable to backspace
        // Case 2 (At middle or end of work)
            // Backspace normally


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
