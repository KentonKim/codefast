const wordBank = document.getElementById('word__Bank');
const cursor = document.getElementById('cursor');
const centerDiv = document.getElementById('center__column');
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

            if (regexTestForSpace.test(char)) {
                if (objects[i].string.length >= j + 4 
                    && objects[i].string.substring(j,j+4) == "    ") {
                        if (word.children.length != 0) {
                            line.appendChild(word);
                        }
                        word = createNewWord();
                        word.className = "tab";
                        createAndAppendNewLetter("   ", word,scope);
                        j += 3;
                    }
                line.appendChild(word);
                word = createNewWord();
            }
            else if (regexTestForNonSpace.test(char)) {
                createAndAppendNewLetter(char,word,scope);
            }
            else if (regexTestForEnter.test(char)) {
                line.appendChild(word);
                word = createNewWord();
                word.className = "enter";
                createAndAppendNewLetter(char,word,scope);
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

    // Also applies misspelled if not correct spelling
    function isCorrectSpelling(word) {
        for (let i = word.childNodes.length - 1; i >= 0; i--) {
            if (word.childNodes[i].classList.contains('unfilled')
            || word.childNodes[i].classList.contains('excess') 
            || word.childNodes[i].classList.contains('incorrect')) {
                word.classList.add('misspelled');
                return false;
            }
        }
        for (let i = word.childNodes.length - 1; i >= 0; i--) {
            word.childNodes[i].classList.remove('delaySyntax');
        }
        return true;
    }

    function animateEnter(word) {
        word.childNodes[0].classList.remove('unfilled');
        word.childNodes[0].classList.add('delaySyntax');
        setTimeout(() => {
            word.childNodes[0].classList.remove('delaySyntax');
            word.classList.add('hidden');
        }, 200);
    }

    function resetEnter(word) {
        word.childNodes[0].classList.add('unfilled');
        word.classList.remove('hidden');
    }

    function moveToNextLine() {
        if (currentLine.nextSibling == null) {
            return;
        }
        currentLine.classList.remove('activeLine');
        while (currentWord.nextSibling!= null) {
            isCorrectSpelling(currentWord);
            currentWord = currentWord.nextSibling;
        }
        animateEnter(currentWord);
        currentLine = currentLine.nextSibling;
        currentLine.classList.add('activeLine');
        currentWord = currentLine.childNodes[0];
        while (currentWord.classList.contains('tab')) { // TODO
            currentWord = currentWord.nextSibling;
        }
        currentLetter = currentWord.childNodes[0];
        return;
    }

    function moveToNextWord() {
        isCorrectSpelling(currentWord);
        if (currentWord.nextSibling.childNodes[0].textContent == "↩") {
            moveToNextLine();
            return;
        }
        currentWord = currentWord.nextSibling;
        currentLetter = currentWord.childNodes[0];
    }

    function moveToPreviousWord() {
        function updateLetter() {
            for (let i = currentWord.childNodes.length - 1; i >= 0; i--) {
                if (!currentWord.childNodes[i].classList.contains('unfilled')) {
                    currentLetter = currentWord.childNodes[i];
                    return;
                }
            }
            currentLetter = currentWord.childNodes[0];
        }
        function movetoPreviousLine() {
            // check if you even can move to previous line or if the rightmost word of the previous line is misspelled
            if (currentLine.previousSibling == null 
                || !currentLine.previousSibling.childNodes[currentLine.previousSibling.childNodes.length - 2].classList.contains('misspelled')) {
                console.log('will not do anything');
                return;
            }
            currentLine.classList.remove('activeLine');
            currentLine = currentLine.previousSibling;
            currentLine.classList.add('activeLine');
            currentWord = currentLine.childNodes[currentLine.childNodes.length - 2];
            resetEnter(currentWord.nextSibling);
            currentWord.classList.remove('misspelled');
            while (currentWord.previousSibling 
                && currentWord.childNodes[0].classList.contains('unfilled')
                && currentWord.previousSibling.classList.contains('misspelled')) {
                currentWord = currentWord.previousSibling;
                currentWord.classList.remove('misspelled');
            }
            updateLetter();
        }

        if (currentWord.previousSibling == null
            || currentWord.previousSibling.classList.contains('tab')) {
            movetoPreviousLine();
            return;
        }
        if  (!currentWord.previousSibling.classList.contains('misspelled')) {
            return;
        }
        currentWord = currentWord.previousSibling;
        currentWord.classList.remove('misspelled');
        updateLetter();
    }

    if (key == "Enter") {
        moveToNextLine();
    }

    else if (key == " ") {
        moveToNextWord();
    }

    else if (key == "Backspace") {
        if (currentLetter.classList.contains('excess')) {
            currentLetter = currentLetter.previousSibling;
            currentLetter.nextSibling.remove();
        }
        else if (currentLetter.classList.contains('unfilled')) {
            if (currentLetter.previousSibling == null) {
                moveToPreviousWord();
            }
            else {
                currentLetter = currentLetter.previousSibling;
                currentLetter.classList.add('unfilled');
                currentLetter.classList.remove('incorrect');
                currentLetter.classList.remove('delaySyntax');
            }
        }
        else {
            currentLetter.classList.add('unfilled');
            currentLetter.classList.remove('incorrect');
            currentLetter.classList.remove('delaySyntax');
        }
    }
    else { 
        // current letter is filled
        if (!currentLetter.classList.contains('unfilled')) {
            // create excess letter
            if (currentLetter.nextSibling == null) {
                let newletter = document.createElement('letter');
                newletter.classList.add('excess');
                newletter.textContent = key;
                currentWord.appendChild(newletter);
                currentLetter = currentLetter.nextSibling;
            }
            else {
                currentLetter = currentLetter.nextSibling;
            }
        }
        if (key == currentLetter.textContent) {
            currentLetter.classList.remove('unfilled');
            currentLetter.classList.add('delaySyntax');
        }
        else {
            currentLetter.classList.remove('unfilled');
            currentLetter.classList.add('incorrect');
        }
    }
    updateCursor(currentLetter);
    return;
}

function updateCursor(letter) {
    const centerDivRect = centerDiv.getBoundingClientRect();
    const rect = letter.getBoundingClientRect();
    let x = rect.left + window.scrollX;
    let y = rect.top + window.scrollY;
    if (!currentLetter.classList.contains('unfilled')) {
        x += rect.width;
    }
    stringX = x - (centerDivRect.left + 2) + "px";
    stringY = y - (centerDivRect.top + 2) + "px";
    cursor.style.transform = `translate(${stringX}, ${stringY})`;
    // cursor.style.left = stringX;
    // cursor.style.top = stringY;
    return;
} 

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
const arr = createHighlightedObjects(inputString, currentLanguage);
createWordBoxDOM(arr,wordBank);
document.addEventListener('keydown', letterInputEvent);
let currentLine = document.querySelector('.line');
currentLine.classList.add('activeLine');
let currentWord = currentLine.childNodes[0]; 
let currentLetter = currentWord.childNodes[0];
cursor.style.height = window.getComputedStyle(currentWord).height;

updateCursor(currentLetter);