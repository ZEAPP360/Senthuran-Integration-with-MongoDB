const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");

let name = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmpassword = document.getElementById("confirmpassword")
let signup = document.getElementById("signup")


let email_1 = document.getElementById("email_1")
let password_1 = document.getElementById("password_1")
let loginbtn = document.getElementById("loginbtn")




//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});


loginbtn.addEventListener("click",()=>{
  console.log(email_1.value, password_1.value)

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MzE1OSwiZXhwIjoxNjg2ODI5MTU5fQ.EHZJN2q8KwuboeTj6bcl8uecdDutXSrC1mhZhk09fnE");

var raw = JSON.stringify({
  "email": email_1.value,
  "password": password_1.value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3000/users/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
})


signup.addEventListener("click", () => {
  console.log(name.value, email.value, password.value, confirmpassword.value)
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0OWU1YjY5ZjgyZjMwNmU1OGJmMiIsImlhdCI6MTY3OTA1MTIzOCwiZXhwIjoxNjg2ODI3MjM4fQ._xP17Hvedem7kjR9wn5279_knonPE4ziwa-Vq7vRPjU");

    var raw = JSON.stringify({
      "name": name.value,
      "email": email.value,
      "password": password.value,
      "passwordConfirm": confirmpassword.value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/users/signup", requestOptions)
      .then(response => response.text())
      .then((result)=>{ 
        console.log(result)
        window.location.reload()
      
      })
      .catch(error => console.log('error', error));
  }
  catch (e) {
    alert(e)

  }
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
  container.classList.add("active");
});
login.addEventListener("click", () => {
  container.classList.remove("active");
});
