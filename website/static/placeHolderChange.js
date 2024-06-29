document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('username');
    const pseudoPlaceholder = document.getElementById('textSpot');
    const wordCounter = document.getElementById('WPM');
    const accuracy = document.getElementById('accuracy');
    const record = document.getElementById('record');
    const topSpeed = document.getElementById('topSpeed');
    

    let timeStamps = [60]
    let beforeSpace = 0;

    // Function to update placeholder color based on input
    function updatePlaceholderColor() {

        // for (let i = 0; i <= beforeSpace; i++) {
        //     const begItem = document.createElement('span');

        // }

        pseudoPlaceholder.innerHTML = '';

        const inputValue = inputField.value;
        const clockElement = document.getElementById("countdown");


        let correctLength = 0;
        let wordCount = 0;
        let countSpace = 0;
        
        

        for (let i = 0; i < inputValue.length; i++) {
            const listItem = document.createElement('span');

            if (inputValue[i] == " ") {
                
                while (correctLength < placeholderHTML.length && placeholderHTML[correctLength] != " ") {
                    correctLength++;
                }  
                correctLength++;

                if (checkCorrectWord(pseudoPlaceholder, placeholderHTML, correctLength)) {
                    wordCount++;
                    
                    wordCounter.innerText = wordCount;
                }
                countSpace++;

                if (i == inputValue.length-1) {
                    timeStamps.push(clockElement.textContent);
                    topSpeed.textContent = calculateMaxWPM(timeStamps);
                }

                


            } else if (inputValue[i] != placeholderHTML[correctLength]) {
                listItem.style.color = 'red';
            } else {
                listItem.style.color = 'green'
                correctLength++;
            }

            listItem.textContent = inputValue[i];
            pseudoPlaceholder.appendChild(listItem)

            if (pseudoPlaceholder.offsetWidth > 200) {
                pseudoPlaceholder.removeChild(pseudoPlaceholder.firstChild);
            }

            if (countSpace != 0){
                accuracy.innerText = Math.round((wordCount / countSpace) * 100);
            }

        }

        for (let i = correctLength; i < placeholderHTML.length; i++) {
            const rest = document.createElement('span');
            rest.style.color = 'grey';
            rest.textContent = placeholderHTML[i];
            pseudoPlaceholder.appendChild(rest);


            if (pseudoPlaceholder.offsetWidth > 1100) {
                pseudoPlaceholder.removeChild(pseudoPlaceholder.lastChild);
                break;
            }
        }

        

    }

    function checkCorrectWord(span, placeholderHTML, endLength) {

        let count = endLength-2;
    
        let children = span.children;
        for (let i = children.length-1; i >= 0; i--) {
    
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

    async function setTestVariable() {
        try {
            let test;
            test = await randomWordGenerator();
            return test;
        
        } catch (error) {
            console.error('Error generating random words:', error);
            throw error;
        }
    }
    
    function calculateMaxWPM(timeStamps) {

        let maxWPM = 0
    
        for (let i = 3; i < timeStamps.length; i++) {
            let max = Math.round(180/Math.abs(timeStamps[i]-timeStamps[i-3]));
            if (max > maxWPM) {
                maxWPM = max;
            }
        }
    
        return maxWPM;
    
    }

    let placeholderHTML;
    async function initialize() {
        placeholderHTML = await setTestVariable();
        updatePlaceholderColor();
        inputField.addEventListener('input', function() {
            updatePlaceholderColor();
            const clockElement = document.getElementById("countdown");
            record.textContent = clockElement.textContent;

            if (clockElement.textContent == 0) {
                inputField.removeEventListener('input', arguments.callee);
            }
        });
    }

    initialize()
    
    
});