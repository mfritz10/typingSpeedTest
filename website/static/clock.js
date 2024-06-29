document.addEventListener('DOMContentLoaded', function() {
    const clockElement = document.getElementById("countdown");
    const inputField = document.getElementById('username');

    let timeLeft = 59.9;
    let countdownInterval;

    function updateCountdown() {
        if (timeLeft < 0) {
            clockElement.textContent = 0.0.toFixed(1);
            return;
        }
        clockElement.textContent = timeLeft.toFixed(1);
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownInterval.textContent = 'Time\'s up';
        } else {
            timeLeft -= 0.1;
        }
    }

    function startCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        countdownInterval = setInterval(updateCountdown, 10);
    }

    inputField.addEventListener('input', function() {
        
        if (inputField.value.length > 0) {
            startCountdown();
            inputField.removeEventListener('input', arguments.callee);
        }
    });
    
});