document.addEventListener('DOMContentLoaded', function() {

const modal = document.getElementById('sign-up-modal');

const signUpButton = document.getElementById('sign-up');
const closeSignUpButton = document.getElementById('closeSignUpButton');

signUpButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeSignUpButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

const email = document.getElementById('email');
const username = document.getElementById('usernameSet')
const password = document.getElementById('passwordSet');
const confirmPasswordSet = document.getElementById('confirmPasswordSet');
const submit = document.getElementById('signUser');
const record = document.getElementById('record');

submit.addEventListener('click', () => {
    const emailVal = email.value;
    const userNameVal = username.value;
    const passwordVal = password.value;
    const passwordSetVal = confirmPasswordSet.value;

    if (passwordVal != passwordSetVal) {
        confirmPasswordSet.placeholder = "Passwords don't match"
        confirmPasswordSet.style.border = '2px solid red';
        confirmPasswordSet.value = '';
    }

    fetch(`/add_user/${userNameVal}/${emailVal}/${passwordVal}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userNameVal, email: emailVal, password: passwordVal})
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });

});

});