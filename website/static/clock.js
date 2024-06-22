document.addEventListener('DOMContentLoaded', function() {
    const clockElement = document.getElementById("countdown");
    const inputField = document.getElementById('username');

    let timeLeft = 59;
    let countdownInterval;

    function updateCountdown() {
        clockElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownInterval.textContent = 'Time\'s up';
        } else {
            timeLeft--;
        }
    }

    function startCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    inputField.addEventListener('input', function() {
        
        if (inputField.value.length > 0) {
            startCountdown();
            inputField.removeEventListener('input', arguments.callee);
        }
    });
    
});