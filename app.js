const bankContainerDiv = document.getElementById('bank-container');
const cursor = document.getElementById('cursor');
const codeNumberDiv = document.getElementById('code-numberings');
const tabOptionsDiv = document.getElementById('tab-options');
const terminalDiv = document.getElementById('terminal');
const terminalResizingDiv = document.getElementById('terminal-resizing');
const wordBankDiv = document.getElementById('word-bank');
// Create a MutationObserver instance
const observer = new MutationObserver(handleMutation);
observer.observe(terminalDiv, { childList: true });
let cursorBlinkDelay = 0;
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

const arrayOfStrigObjects = createHighlightedObjects(inputString, currentLanguage);
const [TOTAL_LETTER_COUNT, TOTAL_WORD_COUNT] = createWordBoxDOM(arrayOfStrigObjects,wordBankDiv);
// Initialize starting height and cursor position
let terminalStartHeight = terminalDiv.clientHeight;
let terminalStartY = 0;
let isTerminalResizing = false;

// Second initializations after string loading
const FIRST_CHAR = inputString[0];
const LINE_HEIGHT = document.querySelector('.line').getBoundingClientRect().height;
const bankContainerDivRect = bankContainerDiv.getBoundingClientRect();
let currentLine = document.querySelector('.line');
let currentWord = currentLine.childNodes[1]; 
let currentLetter = currentWord.childNodes[0];
cursor.style.height = window.getComputedStyle(currentWord).height;

let TIME_LIMIT = 1060;
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;
  
// ~~~~~~ Event Listeners ~~~~~~~
document.addEventListener('keydown', startGame); 
// Showing shadow only if the div is scrolled
bankContainerDiv.addEventListener('scroll', function() {
  if (bankContainerDiv.scrollTop > 0) {
    tabOptionsDiv.classList.add('bottom-shadow');
  } else {
    tabOptionsDiv.classList.remove('bottom-shadow');
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
  console.log('showing scrollbar')
});
terminalDiv.addEventListener('mouseleave', () => {
  terminalDiv.classList.remove('show-scrollbar');
  console.log('hiding scrollbar')
});

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
    document.addEventListener('keydown', letterInputEvent);
    document.removeEventListener(FIRST_CHAR, startGame);
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
    }
    else if (key == " ") {
        moveToNextWord();
    }
    else if (key == "Backspace") {
        if (currentLetter.classList.contains('excess')) {
            currentLetter = currentLetter.previousElementSibling;
            currentLetter.nextElementSibling.remove();
        }
        else if (currentLetter.classList.contains('unfilled')) {
            if (currentLetter.previousElementSibling == null) {
                moveToPreviousWord();
            }
            else {
                currentLetter = currentLetter.previousElementSibling;
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
            if (currentLetter.nextElementSibling == null) {
                let newletter = document.createElement('letter');
                newletter.classList.add('excess');
                newletter.textContent = key;
                currentWord.appendChild(newletter);
                currentLetter = currentLetter.nextElementSibling;
            }
            else {
                currentLetter = currentLetter.nextElementSibling;
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
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  document.removeEventListener('keydown', letterInputEvent);
  
//   accuracy_text.textContent = 100;
//   timer_text.textContent = timeLeft + 's';
//   error_text.textContent = 0;
//   restart_btn.style.display = "none";
//   cpm_group.style.display = "none";
//   wpm_group.style.display = "none";
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;
    // increase the time elapsed
    timeElapsed++;
    // update the timer text
    // timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
    // stop the timer
    clearInterval(timer);
    console.log('60 seconds has passed');
    // disable the input area
    document.removeEventListener('keydown', letterInputEvent);
    // show finishing text
    // quote_text.textContent = "Click on restart to start a new game.";
    // display restart button
    // restart_btn.style.display = "block";
    
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    
    // update cpm and wpm text
    // cpm_text.textContent = cpm;
    // wpm_text.textContent = wpm;
    
    // display the cpm and wpm
    // cpm_group.style.display = "block";
    // wpm_group.style.display = "block";
}

// Function to scroll the container to the bottom
function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
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