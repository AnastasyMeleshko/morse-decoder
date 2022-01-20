const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    if (expr.length === 0) {
        return "";
    }

    let arr = expr.split("**********");
    let resultWords = [];
    let dataOfQuantaty = [];
    for (let i = 0; i < arr.length; i++) {
        let word = arr[i];
        let letter;
        let startIndex = 0;
        let endIndex = 10;
        let quantatyOfLetters = word.length / 10;
        dataOfQuantaty.push(quantatyOfLetters);
        let result;
        for (let i=1; i<=quantatyOfLetters; i++) {
            letter = word.slice(startIndex,endIndex);
            result = getPureLetter(letter);
            startIndex += 10;
            endIndex += 10;
            resultWords.push(result);
        }

        function getPureLetter(letter) {
            let resultLetter = [];
            for (let j=9; j>-1; j--) {
                resultLetter.push(letter[j]);
                if ((letter[j] === "0") && (letter[j-1] === "0")) {
                    resultLetter.splice(-1);
                    break;
                }
            }
            return resultLetter.reverse();
        }
    }

    let str = "";
    let arr2 = [...resultWords];
    let re = /11/gi;
    let re2 = /10/gi;

    for (let j=0; j<dataOfQuantaty.length; j++) {
        let counter = dataOfQuantaty[j];
        for (let i=0; i<arr2.length; i++) {
            let newLetter = arr2[i].join("");
            newLetter = newLetter.replace(re, "-");
            newLetter = newLetter.replace(re2, ".");

            for (let key in MORSE_TABLE) {
                if (newLetter === key) {
                    newLetter = MORSE_TABLE[key];
                }
            }

            if  (counter > 0)  {
                str += newLetter;
            }
            counter --;
        }
        str += " ";
        arr2.splice(0,dataOfQuantaty[j]);
    }

    return str.slice(0,-1);
}

module.exports = {
    decode
}


