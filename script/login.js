
const logoHome = document.getElementById('logo');

logoHome.addEventListener('click', () => {
  window.location.href = './index.html';
})


const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

// signup
signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});

//login
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

// signup click
signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

const adminData = { "username": "admin", "password" : "admin123"};

const loginFormBtn = document.querySelector("input[type='submit']");
const loginUsername = loginForm.querySelector("input[type='text']");
const loginPassword = loginForm.querySelector("input[type='password']");

loginFormBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  // console.log(adminData,loginUsername.value,loginPassword.value);
  if (loginUsername.value === adminData.username && loginPassword.value === adminData.password){
    window.location.href = "./hotelAdmin.html";
    
  }
  else{
    window.location.href = "./hotel.html";
  }
})

