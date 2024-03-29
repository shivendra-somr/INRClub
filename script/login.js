
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

const adminData = { "username": "admin", "password": "admin123" };

const loginFormBtn = loginForm.querySelector("input[type='submit']");
const loginUsername = loginForm.querySelector("input[type='email']");

localStorage.setItem('username', loginUsername.value);

const loginPassword = loginForm.querySelector("input[type='password']");

loginFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log(adminData,loginUsername.value,loginPassword.value);
  if (loginUsername.value == "" || loginPassword.value == "") {
    alert("Fill the required Login details")
  }
  else if (loginUsername.value === adminData.username && loginPassword.value === adminData.password) {
    alert("Welcome Admin")
    window.location.href = "./addhotels.html";
  }
  else {
    fetch("https://mock-api-hotels.onrender.com/users")
      .then(res => res.json())
      .then((data) => {
        let userFound = false;
        for (let i = 0; i < data.length; i++) {
          if ((data[i].email == loginUsername.value && data[i].password == loginPassword.value)) {
            console.log(data)
            localStorage.setItem("username", JSON.stringify(data[i].name))
            alert(`Welcome Back ${data[i].name}`)
            window.location.href = "./hotel.html";
            userFound = true;
            break;
          }
        }
        if (!userFound) {
          alert("Wrong Credentials");
          loginForm.reset()
        }
      })
      .catch(err => console.log(err))
  }

})

// signUp functionality

let signUpForm = document.querySelector('form.signup');
let signUpFormBtn = signUpForm.querySelector("input[type='submit']");
let signUpName = signUpForm.querySelector("input[type='text']");
let signUpEmail = signUpForm.querySelector("input[type='email']");
let signUpPassword = document.getElementById("password")
let signUpConfirmPassword = document.getElementById("confirm-password")

signUpFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "" || signUpConfirmPassword.value == "") {
    alert("Please fill all required details")
  }
  else if (signUpPassword.value !== signUpConfirmPassword.value) {
    alert("Passwords do not match");
  }
  else {
    let newSignUp = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value
    };
    fetch("https://mock-api-hotels.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSignUp)
    })
      .then(res => res.json())
      .then(data => {
        alert("Signup successful!");
        signUpForm.reset();
      })
      .catch(error => console.error(error));
  }
});