const wordBank = document.getElementById('words');
const wordInput = document.getElementById('wordsInput').value;


// On startup
    // function getString() 
        // get passage of code to be typed out
        // make into a string
        // return string

    // function parseStringToWords( string ) {}
        // parse the string into words and symbols
        // "for i in range(len(str)):\n print(i)"  ---> ['for','i','in','range(len(str)):', '\n', '\t', 'print(i)']
        // perhaps '\n' can indicate for the rightmost word to have a margin-right:auto so that the next box will have to start on the next line


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



// spaces between words and between parentheses should not count as an error



// isMatching

// function 