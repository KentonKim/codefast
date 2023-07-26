const wordBank = document.getElementById('words');
const wordInput = document.getElementById('wordsInput');

const testString = `class Solution: def twoSum(self, nums: List[int], target: int) -> List[int]:
d = {}
for index, value in enumerate(nums):
if target-value in d:
return [d[target-value],index]
d[value] = index`;
            
// On startup
    // function getString() 
        // get passage of code to be typed out
        // make into a string
        // return string

    // function parseStringToWords( string ) {}
        // parse the string into words and symbols
        // "for i in range(len(str)):\n print(i)"  ---> ['for','i','in','range(len(str)):', '\n', '\t', 'print(i)']
        // perhaps '\n' can indicate for the rightmost word to have a margin-right:auto so that the next box will have to start on the next line

const word = document.createElement('div');
word.textContent = testString;
word.classList.add('word')
wordBank.appendChild(word);

// Start typing
    // Event listener for the right letter

    // If there is a timer, inititate timer
    // startTimer()
        // Update DOM timer every second

// Typing
    // Event listener every keydown
        // Case 1 (nonspace-char): correct
            // add correct classlist to letter
        // Case 2 (nonspace-char): incorrect
            // add incorrect classlist to letter
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
