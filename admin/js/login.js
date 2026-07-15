const form = document.getElementById("loginForm");

const username = document.getElementById("username");

const password = document.getElementById("password");

const error = document.getElementById("errorMessage");

const toggle = document.getElementById("togglePassword");

toggle.onclick = () => {

if(password.type==="password"){

password.type="text";

toggle.classList.replace("fa-eye","fa-eye-slash");

}else{

password.type="password";

toggle.classList.replace("fa-eye-slash","fa-eye");

}

};

form.addEventListener("submit",function(e){

e.preventDefault();

if(

username.value==="admin"

&&

password.value==="admin123"

){

window.location.href="dashboard.html";

}else{

error.innerHTML="Invalid Username or Password.";

}

});
