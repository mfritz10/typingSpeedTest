document.addEventListener('DOMContentLoaded', function() {

const modal = document.getElementById('modal');

const loginButton = document.getElementById('login');
const closeModalButton = document.getElementById('closeModalButton');

loginButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});


fetch(`/users/${userNameVal}/${passwordVal}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: userNameVal, password: passwordVal})
})
.then(response => response.json())
.then(data => {
    record.textContent = data.highscore;
})
.catch(error => {
    console.error('Error', error);
});

});