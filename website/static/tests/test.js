const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Test</title>
    </head>
    <body>
        <span id="textSpot">
            <span style="color: green"> </span>
            <span style="color: green">a</span>
            <span style="color: green"> </span>
            <span style="color: green">t</span>
            <span style="color: green">e</span>
            <span style="color: green">s</span>
            <span style="color: green">t</span>
            <span style="color: green"> </span>
            <span style="color: green">i</span>
            <span style="color: green">s</span>
            <span style="color: green">s</span>
            <span style="color: green">i</span>
        </span>
    </body>
    </html>
`);

const { document } = dom.window;
const pseudoPlaceholder = document.getElementById('textSpot');

const placeholderHTML = " a test issi"

function checkCorrectWord(span, placeholderHTML, endLength) {

    let count = endLength-1;
    console.log(placeholderHTML[count]);

    let children = span.children;
    for (let i = children.length-1; i >= 0; i--) {
        console.log(children[i].textContent);

        if (children[i].style.color == "red") {
            return false;
        }

        if (children[i].textContent != placeholderHTML[count]) {
            return false;
        }

        if (children[i].textContent == " "){
            return true;
        }
        count -= 1;

    }
    return true;
}

async function randomWordGenerator() {
    const numberOfWords = 250;
    const randomWordApiUrl = `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`;

    try {
        const response = await fetch (randomWordApiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const words = await response.json();
        return words.join(' ');
    } catch (error) {
        console.error('Error fetching random words:', error);
        throw error;
    }
}

let globalTestVariable;

async function setTestVariable() {
    try {
        let test;
        test = await randomWordGenerator();
        return test;
        //console.log('Random words stored in tests:', test);
        
    } catch (error) {
        console.error('Error generating random words:', error);
        throw error;
    }
}


async function main() {
    globalTestVariable = await setTestVariable();
    console.log(globalTestVariable);
    
}

function calculateMaxWPM(timeStamps) {

    let maxWPM = 0

    for (let i = 2; i < timeStamps.length; i++) {
        let max = Math.round(180/Math.abs(timeStamps[i] - timeStamps[i-2]))
        if (max > maxWPM) {
            maxWPM = max;
        }
    }

    return maxWPM;

}

timeStamps = [60, 54, 50, 47, 20, 10, 8, 7, 5, 3, 1]

console.log(calculateMaxWPM(timeStamps));