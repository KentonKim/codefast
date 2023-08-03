const wordBank = document.getElementById('words');
const wordInput = document.getElementById('wordsInput');
let characterPointer = 0;
let currentLanguage = "python";
let inputString = `class Solution: def twoSum(self, nums: List[int], target: int) -> List[int]:
    d = {}
    for index, value in enumerate(nums):
        if target-value in d:
            return [d[target-value], index]
        d[value] = index`;

// Takes in a string of code and selected language as a string
// Returns an array of objects {string, class} 
function createHighlightedObjects(stringCode, language) {
    if (stringCode.length === 0) {
        console.log('String code is empty. Try another string.');
        return;
    }
    // Takes in array that may have string or objects as elements
    // If string, creates an object with that string and parent class
    // Else, makes a recursive call to the children of the elements
    function returnBaseObject(arrayOfObjects, parentClass) {
        let array = [];
        for (object of arrayOfObjects) {
            if (typeof(object) == "string") {
                if (parentClass != '' && !parentClass.startsWith('hljs-')) {
                    parentClass = "hljs-".concat(parentClass);
                }
                array.push({string:object, scope:parentClass.replace(/\./g, " ")});
            }
            else {
                array.push(...returnBaseObject(object.children, object.scope));
            }
        }
        return array;
    }
    const rawArray = hljs.highlight(stringCode, {language: language})._emitter.rootNode.children;
    return returnBaseObject(rawArray, "");
}

// Takes in an array of objects {string, class}
// Returns nothing
function createWordBoxDOM(objects, lineHolder) {
    function createAndAppendNewLetter(character, wordNode, letterClass) {
        const newLetter = document.createElement('letter');
        newLetter.className = letterClass;
        newLetter.classList.add('unfilled');
        if (character == "\n") {
            newLetter.textContent = "↩";
        }
        else {
            newLetter.textContent = character;
        }
        wordNode.appendChild(newLetter);
        return;
    }
    function createNewWord() {
        const newWord = document.createElement('div');
        newWord.classList.add('word');
        return newWord;
    }
    function createNewLine() {
        const newLine = document.createElement('div');
        newLine.classList.add('line');
        return newLine;
    }


    regexTestForNonSpace = /[^\s]/;
    regexTestForSpace = / /;
    regexTestForEnter = /|\n|/;
    // For each Object
    let word = createNewWord(objects[0].scope);
    let line = createNewLine();

    for (let i = 0; i < objects.length; i++) {
        scope = objects[i].scope;
        for (let j = 0; j < objects[i].string.length; j++) {
            char = objects[i].string[j];

            if (regexTestForNonSpace.test(char)) {
                createAndAppendNewLetter(char,word,scope);
            }
            else if (regexTestForSpace.test(char)) {
                line.appendChild(word);
                word = createNewWord();
            }
            else if (regexTestForEnter.test(char)) {
                word = createNewWord();
                createAndAppendNewLetter(char,word);
                line.appendChild(word);
                lineHolder.appendChild(line);
                line = createNewLine();
                word = createNewWord();
            }
        }
    }
    return;
}


function letterInputEvent(e) {
    const key = e.key;
    const regexAllowableKeys = /^(?!(?:Shift|Tab|CapsLock|Meta|Alt|F[1-9]|F1[0-2]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Control|Ctrl|Alt|Option|Cmd|Command)\b)[ -~\b\r\n]+$/;
    if (!regexAllowableKeys.test(key)) {
        return;
    }

//     function determineWordCorrect() {
//         currentWord.classList = 'word';
//         for (let i = currentWord.childNodes.length - 1; i >= 0; i--) {
//             if (currentWord.childNodes[i].classList.length == 0
//             || currentWord.childNodes[i].classList.contains('excess') 
//             || currentWord.childNodes[i].classList.contains('incorrect')) {
//                 currentWord.classList.add('misspelled');
//                 return -1;
//             }
//             else if (currentWord.childNodes[i].classList.contains('style')) {
//                 currentWord.classList.add('partial');
//                 return 0;
//             }
//         }
//         return 1;
//     }

//     function moveToNextLine() {
//         if (currentLine.nextSibling == null) {
//             return;
//         }
//         currentLine.classList.remove('activeLine');
//         currentWord.classList.remove('activeWord');
//         while (currentWord.nextSibling!= null) {
//             determineWordCorrect();
//             currentWord = currentWord.nextSibling;
//         }
//         currentLine = currentLine.nextSibling;
//         currentLine.classList.add('activeLine');
//         currentWord = currentLine.childNodes[0];
//         while (currentWord.childNodes[0].textContent == "    ") {
//             currentWord = currentWord.nextSibling;
//         }
//         currentWord.classList.add('activeWord');
//         currentLetter = currentWord.childNodes[0];
//         return;
//     }

//     function moveToNextWord() {
//         if (currentWord.nextSibling.childNodes[0].textContent == "↩") {
//             addExcessLetter();
//             return;
//         }
//         determineWordCorrect();
//         currentWord.classList.remove('activeWord');
//         currentWord = currentWord.nextSibling;
//         currentWord.classList.add('activeWord');
//         currentLetter = currentWord.childNodes[0];
//     }

//     function moveToPreviousWord() {
//         if (currentWord.previousSibling == null 
//             || (!currentWord.previousSibling.classList.contains('misspelled') 
//             && !currentWord.previousSibling.classList.contains('partial'))) {
//             return;
//         }
//         currentWord.classList = 'word';
//         currentWord = currentWord.previousSibling;
//         currentWord.classList.add('activeWord');
//         for (let i = currentWord.childNodes.length - 1; i >= 0; i--) {
//             if (currentWord.childNodes[i].classList.length > 0) {
//                 currentLetter = currentWord.childNodes[i];
//                 return;
//             }
//         }
//         currentLetter = currentWord.childNodes[0];
//         return;
//     }

//     if (key == "Enter") {
//         moveToNextLine();
//         return;
//     }
//     else if (key == " ") {
//         if ((currentLetter.previousSibling == null 
//             || currentLetter.previousSibling.classList.contains('style')) 
//             && currentLetter.classList.length == 0) {
//             let newletter = document.createElement('letter');
//             newletter.classList.add('style');
//             newletter.textContent = " ";
//             currentWord.insertBefore(newletter, currentLetter);
//             return;
//         }
//         moveToNextWord();
//         return;
//     }

//     else if (key == "Backspace") {
//         if (currentLetter.classList.length != 0) {
//             if (currentLetter.classList.contains('excess')
//             || currentLetter.classList.contains('style')) {
//                 currentLetter = currentLetter.previousSibling;
//                 currentLetter.nextSibling.remove();
//                 return;
//             }
//             currentLetter.classList = '';
//             return;
//         }
//         if (currentLetter.previousSibling == null) {
//             moveToPreviousWord();
//             return;
//         }
//         if (currentLetter.previousSibling.classList.contains('style')) {
//             currentLetter.previousSibling.remove();
//             return;
//         }
//         currentLetter = currentLetter.previousSibling;
//         currentLetter.classList = '';
//         return;
//     }

//     else { 
//         if (currentLetter.classList.length != 0) {
//             if (currentLetter.nextSibling == null) {
//                 let newletter = document.createElement('letter');
//                 newletter.classList.add('excess');
//                 newletter.textContent = key;
//                 currentWord.appendChild(newletter);
//                 currentLetter = currentLetter.nextSibling;
//                 return;
//             }
//             currentLetter = currentLetter.nextSibling;
//         }
//         if (key == currentLetter.textContent) {
//             currentLetter.classList.add('correct');
//         }
//         else {
//             currentLetter.classList.add('incorrect');
//         }
//     }
    return;
}

// // Start typing
//     // Event listener for the right letter

//     // If there is a timer, inititate timer
//     // startTimer()
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





// Initialize shit
let arr = createHighlightedObjects(inputString, currentLanguage);
createWordBoxDOM(arr,wordBank);
document.addEventListener('keydown', letterInputEvent);