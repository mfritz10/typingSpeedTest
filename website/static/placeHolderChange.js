document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('username');
    const pseudoPlaceholder = document.getElementById('textSpot');

    // Function to update placeholder color based on input
    function updatePlaceholderColor() {

        pseudoPlaceholder.innerHTML = '';

        const inputValue = inputField.value;

        let placeholderHTML = 'all work no play makes johnny a dull boy all work no play makes johnny a dull boy all work no play makes johnny a dull boy'

        let correctLength = 0
        

        for (let i = 0; i < inputValue.length; i++) {
            const listItem = document.createElement('span');

            if (inputValue[i] == " ") {
                
                while (correctLength < placeholderHTML.length && placeholderHTML[correctLength] != " ") {
                    correctLength++;
                }  
                correctLength++;
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

    // Initial check
    updatePlaceholderColor();

    // Add event listeners
    inputField.addEventListener('input', updatePlaceholderColor);
    
});