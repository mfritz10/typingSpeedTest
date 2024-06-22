document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('username');
    const pseudoPlaceholder = document.getElementById('textSpot');
    const wordCounter = document.getElementById('WPM');

    let beforeSpace = 0;

    // Function to update placeholder color based on input
    function updatePlaceholderColor() {



        pseudoPlaceholder.innerHTML = '';

        const inputValue = inputField.value;

        let placeholderHTML = 'all work no play makes johnny a dull boy all work no play makes johnny a dull boy all work no play makes johnny a dull boy'

        let correctLength = 0
        let wordCount = 0
        

        for (let i = 0; i < inputValue.length; i++) {
            const listItem = document.createElement('span');

            if (inputValue[i] == " ") {
                
                while (correctLength < placeholderHTML.length && placeholderHTML[correctLength] != " ") {
                    correctLength++;
                }  
                correctLength++;

                if (checkCorrectWord(pseudoPlaceholder)) {
                    wordCount++;
                    
                    wordCounter.innerText = wordCount;
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

        }

        for (let i = correctLength; i < placeholderHTML.length; i++) {
            const rest = document.createElement('span');
            rest.style.color = 'grey';
            rest.textContent = placeholderHTML[i];
            pseudoPlaceholder.appendChild(rest);


            if (pseudoPlaceholder.offsetWidth > 1100) {
                pseudoPlaceholder.removeChild(pseudoPlaceholder.lastChild);
            }
        }



    }

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

    function setupPlaceholders(){
        
    }

    // Initial check
    updatePlaceholderColor();

    // Add event listeners
    inputField.addEventListener('input', updatePlaceholderColor);
    
});