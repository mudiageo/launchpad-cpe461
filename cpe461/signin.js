const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("signin-btn");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const form = document.getElementById("signin-form");


function validateInputs() {

const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

const passwordValid = password.value.trim().length > 0;

button.disabled = !(emailValid && passwordValid);

}

email.addEventListener("input", validateInputs);
password.addEventListener("input", validateInputs);


form.addEventListener("submit", function(e){

e.preventDefault();

emailError.textContent = "";
passwordError.textContent = "";

const emailValue = email.value.trim();
const passwordValue = password.value.trim();

let valid = true;


if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)){

emailError.textContent = "Please enter a valid email address";

valid = false;

}


if(passwordValue === ""){

passwordError.textContent = "Password required";

valid = false;

}


if(!valid) return;


button.textContent = "Signing in...";
button.disabled = true;


/* Simulated authentication */

setTimeout(()=>{

const demoEmail = "user@example.com";
const demoPassword = "password123";


if(emailValue === demoEmail && passwordValue === demoPassword){

if(document.getElementById("remember").checked){

localStorage.setItem("launchpadLogin","true");

}

window.location.href = "dashboard.html";

}
else{

password.value = "";

passwordError.textContent = "Invalid email or password";

button.textContent = "Sign In";
button.disabled = false;

}

},1000);

});