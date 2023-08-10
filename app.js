const wordBankDiv = document.getElementById('word__bank');
const cursor = document.getElementById('cursor');
const codeNumberDiv = document.getElementById('code__numberings');
let currentLanguage = "python";

let inputString = `# Time:  O(|V| + |E|)
# Space: O(|V|)

import threading
import Queue


# """
# This is HtmlParser's API interface.
# You should not implement it, or speculate about its implementation
# """
class HtmlParser(object):
   def getUrls(self, url):
       """
       :type url: str
       :rtype List[str]
       """
       pass


class Solution(object):
    NUMBER_OF_WORKERS = 8
    
    def __init__(self):
        self.__cv = threading.Condition()
        self.__q = Queue.Queue()

    def crawl(self, startUrl, htmlParser):
        """
        :type startUrl: str
        :type htmlParser: HtmlParser
        :rtype: List[str]
        """
        SCHEME = "http://"
        def hostname(url):
            pos = url.find('/', len(SCHEME))
            if pos == -1:
                return url
            return url[:pos]

        def worker(htmlParser, lookup):
            while True:
                from_url = self.__q.get()
                if from_url is None:
                    break
                name = hostname(from_url)
                for to_url in htmlParser.getUrls(from_url):
                    if name != hostname(to_url):
                        continue
                    with self.__cv:
                        if to_url not in lookup:
                           lookup.add(to_url)
                           self.__q.put(to_url)
                self.__q.task_done()

        workers = []
        self.__q = Queue.Queue()
        self.__q.put(startUrl)
        lookup = set([startUrl])
        for i in xrange(self.NUMBER_OF_WORKERS):
            t = threading.Thread(target=worker, args=(htmlParser, lookup))
            t.start()
            workers.append(t)
        self.__q.join()
        for t in workers:
            self.__q.put(None)
        for t in workers:
            t.join()
        return list(lookup)


# Time:  O(|V| + |E|)
# Space: O(|V|)
import threading
import collections


class Solution2(object):
    NUMBER_OF_WORKERS = 8
    
    def __init__(self):
        self.__cv = threading.Condition()
        self.__q = collections.deque()
        self.__working_count = 0

    def crawl(self, startUrl, htmlParser):
        """
        :type startUrl: str
        :type htmlParser: HtmlParser
        :rtype: List[str]
        """
        SCHEME = "http://"
        def hostname(url):
            pos = url.find('/', len(SCHEME))
            if pos == -1:
                return url
            return url[:pos]

        def worker(htmlParser, lookup):
            while True:
                with self.__cv:
                    while not self.__q:
                        self.__cv.wait()
                    from_url = self.__q.popleft()
                    if from_url is None:
                        break
                    self.__working_count += 1
                name = hostname(from_url)
                for to_url in htmlParser.getUrls(from_url):
                    if name != hostname(to_url):
                        continue
                    with self.__cv:
                        if to_url not in lookup:
                           lookup.add(to_url)
                           self.__q.append(to_url)
                           self.__cv.notifyAll()
                with self.__cv:
                    self.__working_count -= 1
                    if not self.__q and not self.__working_count:
                        self.__cv.notifyAll()

        workers = []
        self.__q = collections.deque([startUrl])
        lookup = set([startUrl])
        for i in xrange(self.NUMBER_OF_WORKERS):
            t = threading.Thread(target=worker, args=(htmlParser, lookup))
            t.start()
            workers.append(t)
        with self.__cv:
            while self.__q or self.__working_count:
                self.__cv.wait()
            for i in xrange(self.NUMBER_OF_WORKERS):
                self.__q.append(None)
            self.__cv.notifyAll()
        for t in workers:
            t.join()
        return list(lookup)`

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
        // newNumber.classList.add('hidden');
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

function startTypingEvent(e) {
    if (e.key != firstChar) {
        return;
    }
    startGame();
    letterInputEvent(e);
    document.addEventListener('keydown', letterInputEvent);
    document.removeEventListener(firstChar, startTypingEvent);
    return;
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
                console.log('will not do anything');
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
    const centerDivRect = wordBankDiv.getBoundingClientRect();
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

function animateCursorblink() {
    if (cursorBlinkDelay < 1) {
        cursorBlinkDelay++;
        return;
    }
    cursor.classList.toggle('hidden');
}

// Geeks for Geeks code
let TIME_LIMIT = 1060;
// selecting required elements
// let timer_text = document.querySelector(".curr_time");
// let accuracy_text = document.querySelector(".curr_accuracy");
// let error_text = document.querySelector(".curr_errors");
// let cpm_text = document.querySelector(".curr_cpm");
// let wpm_text = document.querySelector(".curr_wpm");
// let quote_text = document.querySelector(".quote");
// let input_area = document.querySelector(".input_area");
// let restart_btn = document.querySelector(".restart_btn");
// let cpm_group = document.querySelector(".cpm");
// let wpm_group = document.querySelector(".wpm");
// let error_group = document.querySelector(".errors");
// let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function startGame() {
    resetValues();
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
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

// Geeks for geeks code ends here

// Initialize shit
const arr = createHighlightedObjects(inputString, currentLanguage);
const firstChar = inputString[0];
const [TOTAL_LETTER_COUNT, TOTAL_WORD_COUNT] = createWordBoxDOM(arr,wordBankDiv);
let currentLine = document.querySelector('.line');
let currentWord = currentLine.childNodes[1]; 
let currentLetter = currentWord.childNodes[0];
currentLine.classList.add('activeLine');
document.addEventListener('keydown', startTypingEvent); 
cursor.style.height = window.getComputedStyle(currentWord).height;
let cursorBlinkDelay = 0;
updateCursor(currentLetter);
setInterval(() => {
    // animateCursorblink();
}, 530);



// script.js
const terminalDiv = document.getElementById('terminal');
// Initialize starting height and cursor position
let startHeight = terminalDiv.clientHeight;
let startY = 0;
const terminalResizingDiv = document.getElementById('terminal-resizing');
// Flag to track if resizing is active
let isResizing = false;
// Mouse down event on the pseudo-element to start resizing
terminalResizingDiv.addEventListener('mousedown', (e) => {
  isResizing = true;
  startY = e.clientY;
  startHeight = terminalDiv.clientHeight;
  terminalDiv.classList.add('resizing'); // Add the "resizing" class to the pseudo-element
});
// Mouse move event to handle resizing
document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const cursorY = e.clientY;
  const newHeight = startHeight - (cursorY - startY);
  if (newHeight >= 0) {
    terminalDiv.style.height = newHeight + 'px';
  }
});
// Mouse up event to stop resizing
document.addEventListener('mouseup', () => {
  isResizing = false;
  terminalDiv.classList.remove('resizing'); // Remove the "resizing" class from the pseudo-element
});
