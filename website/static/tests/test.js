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
            <span style="color: red">e</span>
            <span style="color: green">s</span>
            <span style="color: green">t</span>
            <span style="color: green"> </span>
            <span style="color: red">i</span>
            <span style="color: red">s</span>
            <span style="color: green"> </span>
            <span style="color: green">i</span>
        </span>
    </body>
    </html>
`);

const { document } = dom.window;
const pseudoPlaceholder = document.getElementById('textSpot');

function checkCorrectWord(span) {

    let children = span.children;
    for (let i = children.length-1; i >= 0; i--) {
        
        if (children[i].innerHTML == " ") {
            return true;
        }

        if (children[i].style.color == "red") {
            return false;
        }

    }
    return true;
}

console.log(checkCorrectWord(pseudoPlaceholder));