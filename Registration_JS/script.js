const form = document.getElementById('registrationform')
const username  = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const conpassword = document.getElementById('repassword')

function showError(ip,msg){
    const formcontrol= ip.parentElement;
    formcontrol.className = 'form-control error';
    const small =formcontrol.querySelector('small');
    small.innerText = msg;
}

function showSuccess(ip){
    const formcontrol =ip.parentElement;
    formcontrol.className ='form-control success' ;
}
function isValidEmail(emailVal) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailVal).toLowerCase());
}
function checkInputs(){
    let isValid = true;

    const usernameval = username.value.trim();
    const emailval = email.value.trim();
    const passval = password.value.trim();
    const conpass = conpassword.value.trim();

    // User Details
    if (usernameval === '') {
        showError(username, 'Username cannot be blank.');
        isValid = false;
    } else if (usernameval.length < 3) {
        showError(username, 'Username must be at least 3 characters.');
        isValid = false;
    } else {
        showSuccess(username);
    }
    //Email Details
     if (emailValue === '') {
        showError(email, 'Email cannot be blank.');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showError(email, 'Email is not valid.');
        isValid = false;
    } else {
        showSuccess(email);
    }
    //Password Verification
      if (passwordValue === '') {
        showError(password, 'Password cannot be blank.');
        isValid = false;
    } else if (passwordValue.length < 8) {
        showError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        showSuccess(password);
    }
    //Confirmation of Password
     if (confirmPasswordValue === '') {
        showError(confirmPassword, 'Please re-enter your password.');
        isValid = false;
    } else if (passwordValue !== confirmPasswordValue) {
        showError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else {
        showSuccess(confirmPassword);
    }

    return isValid;
}
form.addEventListener('submit' , function(e){
    e.preventDefault();
    if(checkInputs()){
        alert("Registration Successful for prroceding further");
    }
});