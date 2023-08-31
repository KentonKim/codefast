// Tab divs
const headerDiv = document.getElementById('header');
const tabDiv = document.getElementById('tab');
const timerOptionsDiv = document.getElementById('timer-options');
const textOptionsDiv = document.getElementById('text-options');
const timerGameDiv = document.getElementById('timer-tab');
const textGameDiv = document.getElementById('text-tab');
const timer30Div = document.getElementById('timer30');
const timer60Div = document.getElementById('timer60');
const timer120Div = document.getElementById('timer120');
const textShortDiv = document.getElementById('textS');
const textMedDiv = document.getElementById('textM');
const textLongDiv = document.getElementById('textL');
const keyboardIcon = document.getElementById('keyboard-icon');
const retryIcon = document.getElementById('retry-icon');

// Terminal Divs
const terminalDiv = document.getElementById('terminal');
const terminalResizingDiv = document.getElementById('terminal-resizing');
// Results Div
const resultsDiv = document.getElementById('results');
const wpmDiv = document.getElementById('wpm');
const wpmRawDiv = document.getElementById('raw-wpm');
const cpmDiv = document.getElementById('cpm');
const cpmRawDiv = document.getElementById('raw-cpm');
const accuracyDiv = document.getElementById('accuracy');
// Word Bank divs
const bankContainerDiv = document.getElementById('bank-container');
const wordBankDiv = document.getElementById('word-bank');
const cursor = document.getElementById('cursor');
// Create a MutationObserver instance
const observer = new MutationObserver(handleMutation);
observer.observe(terminalDiv, { childList: true });
let currentLanguage = "python";
let inputString = `# Time:  O(nlogn), n is the number of total emails,
# and the max length of email is 320, p.s. {64}@{255}
# Space: O(n)

import collections

class UnionFind(object):
    def __init__(self):
        self.set = []

    def get_id(self):
        self.set.append(len(self.set))
        return len(self.set)-1

    def find_set(self, x):
        if self.set[x] != x:
            self.set[x] = self.find_set(self.set[x])  # path compression.
        return self.set[x]

    def union_set(self, x, y):
        x_root, y_root = map(self.find_set, (x, y))
        if x_root != y_root:
            self.set[min(x_root, y_root)] = max(x_root, y_root)


class Solution(object):
    def accountsMerge(self, accounts):
        """
        :type accounts: List[List[str]]
        :rtype: List[List[str]]
        """
        union_find = UnionFind()
        email_to_name = {}
        email_to_id = {}
        for account in accounts:
            name = account[0]
            for i in xrange(1, len(account)):
                if account[i] not in email_to_id:
                    email_to_name[account[i]] = name
                    email_to_id[account[i]] = union_find.get_id()
                union_find.union_set(email_to_id[account[1]],
                                     email_to_id[account[i]])

        result = collections.defaultdict(list)
        for email in email_to_name.keys():
            result[union_find.find_set(email_to_id[email])].append(email)
        for emails in result.values():
            emails.sort()
        return [[email_to_name[emails[0]]] + emails
                for emails in result.values()]`

// Initialize starting height 
let terminalStartHeight = terminalDiv.clientHeight;
let terminalStartY = 0;
let isTerminalResizing = false;
// Second initializations after string loading
implementString(inputString);
const LINE_HEIGHT = document.querySelector('.line').getBoundingClientRect().height;
const bankContainerDivRect = bankContainerDiv.getBoundingClientRect();
let FIRST_CHAR = inputString[0];
let currentLine = document.querySelector('.line');
let currentWord = currentLine.childNodes[1]; 
let currentLetter = currentWord.childNodes[0];
let cursorBlinkDelay = 0;
cursor.style.height = window.getComputedStyle(currentWord).height;

let gamemodeParamDiv = timer60Div;
let currentGamemodeDiv = timerGameDiv;

let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let timer = null;
let accuracy = 0;

let charactersCorrect = 0;
let charactersTyped = 0;
let charactersExcess = 0;
let charactersSkipped = 0;
let charactersCorrectArray = [];
let charactersTypedArray = [];

// ~~~~~~ Event Listeners ~~~~~~~
document.addEventListener('keydown', startGame); 
initializeUtilityEventListeners();
function initializeUtilityEventListeners() {
    // Showing shadow only if the div is scrolled
    bankContainerDiv.addEventListener('scroll', function() {
    if (bankContainerDiv.scrollTop > 0) {
        tab.classList.add('bottom-shadow');
    } else {
        tab.classList.remove('bottom-shadow');
    }
    cursor.classList.add('hidden');
    updateCursor(currentLetter);
    });
    // Mouse down event on the pseudo-element to start resizing
    terminalResizingDiv.addEventListener('mousedown', (e) => {
    isTerminalResizing = true;
    terminalStartY = e.clientY;
    terminalStartHeight = terminalDiv.clientHeight;
    terminalDiv.classList.add('resizing'); // Add the "resizing" class to the pseudo-element
    });
    // Mouse move event to handle terminal resizing
    document.addEventListener('mousemove', (e) => {
    if (!isTerminalResizing) return;
    const cursorY = e.clientY;
    const newHeight = terminalStartHeight - (cursorY - terminalStartY);
    if (newHeight >= 0) {
        terminalDiv.style.height = newHeight + 'px';
    }
    });
    // Mouse up event to stop terminal resizing
    document.addEventListener('mouseup', () => {
    isTerminalResizing = false;
    terminalDiv.classList.remove('resizing'); // Remove the "resizing" class from the pseudo-element
    });
    // Mouse enter event for showing scrollbar in terminal
    terminalDiv.addEventListener('mouseenter', () => {
    terminalDiv.classList.add('show-scrollbar');
    });
    terminalDiv.addEventListener('mouseleave', () => {
    terminalDiv.classList.remove('show-scrollbar');
    });
    enableSwitchGamemode();    
}

class Gamemode {
    constructor(gamemodeDiv, submodeDiv, timeLimitInSeconds) {
        this.gamemode = gamemodeDiv;
        this.submode = submodeDiv;
        this.time = timeLimitInSeconds;
    }
}

const timer30 = new Gamemode(timerGameDiv, timer30Div, 30);
const timer60 = new Gamemode(timerGameDiv, timer60Div, 60);
const timer120 = new Gamemode(timerGameDiv, timer120Div, 120);
const textShort = new Gamemode(textGameDiv, textShortDiv, 600);
const textMed = new Gamemode(textGameDiv, textMedDiv, 600);
const textLong = new Gamemode(textGameDiv, textLongDiv, 600);

function enableSwitchGamemode() {
    function switchGamemode(object, isTab = false) {
        if (isTab == true) {
            if (currentGamemodeDiv === object.gamemode) {
                return;
            }
        }
        gamemodeParamDiv.classList.remove('selected-subtab');
        currentGamemodeDiv.classList.remove('selected-tab');

        gamemodeParamDiv = object.submode;
        currentGamemodeDiv = object.gamemode;
        TIME_LIMIT = object.time 
        gamemodeParamDiv.classList.add('selected-subtab');
        currentGamemodeDiv.classList.add('selected-tab');
        return;
        // }
        // if (e.target == textGameDiv) {
        //     TIME_LIMIT = 600;
        //     gamemodeParamDiv = textMedDiv;
        //     currentGamemodeDiv = textGameDiv;
        //     gamemodeParamDiv.classList.add('selected-subtab');
        //     currentGamemodeDiv.classList.add('selected-tab');
        //     return;
        // }

        // gamemodeParamDiv= e.target;
        // gamemodeParamDiv.classList.add('selected-subtab');
        // currentGamemodeDiv.classList.remove('selected-tab');
        // switch (e.target) {
        //     case timer30Div:
        //         TIME_LIMIT = 30;
        //         currentGamemodeDiv = timerGameDiv;
        //         break;
        //     case timer60Div:
        //         TIME_LIMIT = 60;
        //         currentGamemodeDiv = timerGameDiv;
        //         break;
        //     case timer120Div:
        //         TIME_LIMIT = 120;
        //         currentGamemodeDiv = timerGameDiv;
        //         break;
        //     case textShortDiv:
        //         TIME_LIMIT = 600;
        //         currentGamemodeDiv = textGameDiv;
        //         break;
        //     case textMedDiv:
        //         TIME_LIMIT = 600;
        //         currentGamemodeDiv = textGameDiv;
        //         break;
        //     case textLongDiv:
        //         TIME_LIMIT = 600;
        //         currentGamemodeDiv = textGameDiv;
        //         break;
        // }

        // currentGamemodeDiv.classList.add('selected-tab');
    }
    timer30Div.addEventListener('mouseup', function() {switchGamemode(timer30)});
    timer60Div.addEventListener('mouseup', function() {switchGamemode(timer60)});
    timer120Div.addEventListener('mouseup', function() {switchGamemode(timer120)});
    textShortDiv.addEventListener('mouseup', function() {switchGamemode(textShort)});
    textMedDiv.addEventListener('mouseup', function() {switchGamemode(textMed)});
    textLongDiv.addEventListener('mouseup', function() {switchGamemode(textLong)});
    timerGameDiv.addEventListener('mouseup', function() {switchGamemode(timer60, true)});
    textGameDiv.addEventListener('mouseup', function() {switchGamemode(textMed, true)});
}

function implementString(string) {
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
    // Returns # of letters, # of words 
    function createWordBoxDOM(objects, lineHolder) {
        const regexTestForNonSpace = /[^\s]/;
        const regexTestForSpace = / /;
        const regexTestForEnter = /|\n|/;
        let lineCount = 1;
        let wordCount = 0;
        let letterCount = 0;

        function createAndAppendNewLetter(character, node, letterClass) {
            const newLetter = document.createElement('letter');
            newLetter.className = letterClass;
            newLetter.classList.add('unfilled');
            newLetter.textContent = character;
            node.appendChild(newLetter);
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
        function createAndAppendLineNumber(lineNumber, line) {
            const newNumber = document.createElement('div');
            const letter = document.createElement('letter');
            newNumber.classList.add('numbering');
            if (lineNumber > 1) {
                newNumber.classList.add('hidden');
            }
            letter.textContent = lineNumber.toString().padStart(3, ' ');
            newNumber.appendChild(letter);
            line.appendChild(newNumber);
            return lineNumber + 1;
        }

        // For each Object
        let word = createNewWord(objects[0].scope);
        let line = createNewLine();
        line.classList.add('activeLine');
        lineCount = createAndAppendLineNumber(lineCount, line);

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
                    else if (word.childElementCount == 0) {
                        continue;
                    }
                    line.appendChild(word);
                    word = createNewWord();
                    wordCount++;
                }
                else if (regexTestForNonSpace.test(char)) {
                    createAndAppendNewLetter(char,word,scope);
                    letterCount++;
                }
                else if (regexTestForEnter.test(char)) {
                    if (word.childElementCount == 0) {
                        continue;
                    }
                    line.appendChild(word);
                    lineHolder.appendChild(line);
                    line = createNewLine();
                    lineCount = createAndAppendLineNumber(lineCount,line);
                    word = createNewWord();
                    wordCount++;
                }
            }
        }
        return [letterCount, wordCount];
    }

    const arrayOfStrigObjects = createHighlightedObjects(inputString, currentLanguage);
    const [TOTAL_LETTER_COUNT, TOTAL_WORD_COUNT] = createWordBoxDOM(arrayOfStrigObjects,wordBankDiv);
    return arrayOfStrigObjects, TOTAL_LETTER_COUNT, TOTAL_WORD_COUNT
}
// Takes in a string of code and selected language as a string
// Returns an array of objects {string, class} 


function startGame(e) {
    if (e.key != FIRST_CHAR) {
        return;
    }

    resetValues();
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    setInterval(() => {
    animateCursorblink();
    }, 530);
    letterInputEvent(e);
    toggleKeyboard();
    document.addEventListener('keydown', letterInputEvent);
    document.removeEventListener('keydown', startGame);
    displayTerminal('Starting test')
    tabDiv.style.transform = "translateY(-100%)";
}

function letterInputEvent(e) {
    const key = e.key;
    const regexAllowableKeys = /^(?!(?:Shift|Tab|CapsLock|Meta|Alt|F[1-9]|F1[0-2]|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Control|Ctrl|Alt|Option|Cmd|Command)\b)[ -~\b\r\n]+$/;
    if (!regexAllowableKeys.test(key)) {
        return;
    }
    e.preventDefault();
    letterInput(key);
    return;
}

function letterInput(key) {
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

    function moveToNextLine() {
        if (currentLine.nextElementSibling == null) {
            return; // TODO REPLACE WITH END GAME
        }
        while (currentWord != null) {
            isCorrectSpelling(currentWord);
            currentWord = currentWord.nextElementSibling;
        }
        currentLine.classList.remove('activeLine');
        currentLine.firstElementChild.firstElementChild.classList.add('unfilled');

        // Next Line
        currentLine = currentLine.nextElementSibling;
        currentLine.classList.add('activeLine');
        currentWord = currentLine.firstElementChild;
        while (!currentWord.classList.contains('word')) { // TODO
            currentWord = currentWord.nextElementSibling;
        }
        currentLetter = currentWord.firstElementChild;

        // Display number for new line of code
        currentLine.firstElementChild.classList.remove('hidden');
        currentLine.firstElementChild.firstElementChild.classList.remove('unfilled');

        checkScroll(bankContainerDiv, bankContainerDivRect,currentLine, LINE_HEIGHT, 0.5, true);
        return;
    }

    function moveToNextWord() {
        isCorrectSpelling(currentWord);
        if (currentWord == currentLine.lastElementChild) {
            moveToNextLine();
            return;
        }
        currentWord = currentWord.nextElementSibling;
        currentLetter = currentWord.firstElementChild;
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
            if (currentLine.previousElementSibling == null 
                || !currentLine.previousElementSibling.lastElementChild.classList.contains('misspelled')) {
                return;
            }
            currentLine.classList.remove('activeLine');
            currentLine.firstElementChild.firstElementChild.classList.add('unfilled');

            // Move to previous line
            currentLine = currentLine.previousElementSibling;
            currentLine.firstElementChild.firstElementChild.classList.remove('unfilled');
            currentLine.classList.add('activeLine');
            currentWord = currentLine.lastElementChild;
            currentWord.classList.remove('misspelled');
            while (currentWord.previousElementSibling 
                && currentWord.firstElementChild.classList.contains('unfilled')
                && currentWord.previousElementSibling.classList.contains('misspelled')) {
                currentWord = currentWord.previousElementSibling;
                currentWord.classList.remove('misspelled');
            }
            updateLetter();
            checkScroll(bankContainerDiv, bankContainerDivRect,currentLine, LINE_HEIGHT, 0.2, false);

        }

        if (currentWord.previousElementSibling == null
            || !currentWord.previousElementSibling.classList.contains('word')) {
            movetoPreviousLine();
            return;
        }
        if  (!currentWord.previousElementSibling.classList.contains('misspelled')) {
            return;
        }
        currentWord = currentWord.previousElementSibling;
        currentWord.classList.remove('misspelled');
        updateLetter();
    }

    if (key == "Enter") {
        moveToNextLine();
        charactersTyped++;
        charactersCorrect++;
    }
    else if (key == " ") {
        moveToNextWord();
        charactersTyped++;
        charactersCorrect++;
    }
    else if (key == "Backspace") {
        if (currentLetter.classList.contains('excess')) {
            currentLetter = currentLetter.previousElementSibling;
            currentLetter.nextElementSibling.remove();
            charactersTyped--;
        }
        else if (currentLetter.classList.contains('unfilled') && (currentLetter.previousElementSibling == null)) {
                moveToPreviousWord();
            }
        else {
            if (currentLetter.classList.contains('unfilled')) {
                currentLetter = currentLetter.previousElementSibling;
            }
            if (!currentLetter.classList.contains('incorrect')) { // Backspacing a correct word
                charactersCorrect--;
            }
            currentLetter.classList.add('unfilled');
            currentLetter.classList.remove('incorrect');
            currentLetter.classList.remove('delaySyntax');
            charactersTyped--;
        }
    }
    else { 
        // Current letter is filled and is at the end of the word
        if (!currentLetter.classList.contains('unfilled')
        && (currentLetter.nextElementSibling == null)) {
            let newletter = document.createElement('letter');
            newletter.classList.add('excess');
            newletter.textContent = key;
            currentWord.appendChild(newletter);
            currentLetter = currentLetter.nextElementSibling;
        }
        else {
            if (!currentLetter.classList.contains('unfilled')) {
                currentLetter = currentLetter.nextElementSibling;
            }
            if (key == currentLetter.textContent) { // Correct character typed
                currentLetter.classList.remove('unfilled');
                currentLetter.classList.add('delaySyntax');
                charactersCorrect++;
            }
            else { // Incorrect character typed
                currentLetter.classList.remove('unfilled');
                currentLetter.classList.add('incorrect');
            }
        }
        charactersTyped++;
    }

    cursor.classList.remove('hidden');
    cursorBlinkDelay = 0;
    updateCursor(currentLetter);
    return;
}

function updateCursor(letter) {
    const centerDivRect = bankContainerDiv.getBoundingClientRect();
    const rect = letter.getBoundingClientRect();
    let x = rect.left; //+ window.scrollX;
    let y = rect.top; //+ window.scrollY;
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

function animateCursorblink() {
    if (cursorBlinkDelay < 2) {
        cursorBlinkDelay++;
        return;
    }
    cursor.classList.toggle('hidden');
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    timer = null;
    accuracy = 0;
    charactersCorrect = 0;
    charactersTyped = 0;
    charactersExcess = 0;
    charactersSkipped = 0;
    charactersCorrectArray = [];
    charactersTypedArray = [];

    displayTerminal("Resetting Values");
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;
    // increase the time elapsed
    timeElapsed++;
    // update the timer text
    // timer_text.textContent = timeLeft + "s";
    charactersCorrectArray.push(charactersCorrect);
    charactersTypedArray.push(charactersTyped);
    if (currentGamemodeDiv == timerGameDiv) {
        displayTerminal(timeLeft.toString());
    }
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
    function calculateWPM(word, time) {
        function isWord(div) {
            if (div == null || !div.classList.contains('word')) {
                return false;
            }
            return true;
        }

        let correct = 0;
        let currWordNum = 0;
        let currWordDenom = 0;

        for (node of word.childNodes) {
            currWordDenom++;
            if (!(node.classList.contains('incorrect')
            || node.classList.contains('unfilled'))) {
                currWordNum++;
            }
        }
        correct += currWordNum / currWordDenom;

        while (!(word.parentElement.previousElementSibling == null
            && !isWord(word.previousElementSibling))) {
                if (isWord(word.previousElementSibling)) {
                    word = word.previousElementSibling;
                }
                else {
                    word = word.parentNode.previousElementSibling.lastElementChild;
                }
                if (!word.classList.contains('misspelled')) {
                    correct++;
                }
            }
             
        return Math.round((correct / time) * 60);
    }

    // stop the timer
    clearInterval(timer);
    clearInterval(animateCursorblink);
    toggleKeyboard();
    // disable the input area
    FIRST_CHAR = null;
    document.removeEventListener('keydown', letterInputEvent);
    document.addEventListener('keydown', startGame);
    tabDiv.style.transform = "translateY(0)";
    // calculate cpm and wpm
    const charPerMin = Math.round(((charactersCorrect / timeElapsed) * 60));
    const charPerMinRaw = Math.round(((charactersTyped / timeElapsed) * 60));
    // const wordsPerMin = Math.round((((charactersCorrect / 5) / timeElapsed) * 60));
    const wordsPerMinRaw = Math.round((((charactersTyped / 5) / timeElapsed) * 60));
    const wordsPerMin = calculateWPM(currentWord, timeElapsed);
   
    displayResults(charPerMin, charPerMinRaw, wordsPerMin, wordsPerMinRaw);
    displayTerminal("Test has been completed");
}

function displayResults(cpm, cpmr, wpm, wpmr) {
    resultsDiv.classList.remove('invisible');
    cpmDiv.textContent = `Char Per Min: ${cpm}`;
    cpmRawDiv.textContent = `Raw Char Per Min: ${cpmr}`;
    wpmDiv.textContent = `Words Per Min ${wpm}`;
    wpmRawDiv.textContent = `Raw Words Per Min ${wpmr}`;
    accuracyDiv.textContent = `Accuracy: ${Math.round(10000*(wpm/wpmr))/100}`
    return;
}

// Callback function for the MutationObserver
function handleMutation(mutationsList, observer) {
    console.log(mutationsList);
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
        // New child element(s) were added, scroll to the bottom
        scrollToBottom(mutation.target);
        }
    }
}

// Example: Adding a new child div to the container
function addChildDiv(container) {
  const newDiv = document.createElement('div');
  newDiv.textContent = 'New Child Div';
  container.appendChild(newDiv);
}

// Function to scroll the container to the bottom
function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}
// Scroll up/down a line depending on if the current line exceeds a midrange of the containers 
function checkScroll(scrollDiv, scrollRect, lineElement,changeInPixels, limitInPercentage, isDown = true) {
    if ((!isDown && scrollDiv.scrollTop == 0) 
    || (isDown && Math.abs(scrollDiv.scrollHeight - scrollDiv.clientHeight - scrollDiv.scrollTop) < 1)){
        return;
    }
    const childRect = lineElement.getBoundingClientRect();

    if (isDown && (childRect.top - scrollRect.top) / scrollRect.height > limitInPercentage) {

        scrollDiv.scrollTop += changeInPixels;
    }
    else if (!isDown && (childRect.top - scrollRect.top) / scrollRect.height < limitInPercentage) {
        scrollDiv.scrollTop -= changeInPixels;
    }
}

function displayTerminal(string) {
    let newline = document.createElement('div');
    newline.classList.add('terminal-line');
    newline.textContent = "> " + string;
    terminalDiv.appendChild(newline);
    return;
}

function toggleKeyboard() {
    keyboardIcon.classList.toggle('invisible');
    retryIcon.classList.toggle('invisible');
}