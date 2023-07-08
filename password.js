'use strict';

const password = document.getElementById("password");
const newPassword = document.getElementById("generatepass");
const url = "https://api.api-ninjas.com/v1/passwordgenerator?";
let numberExclude = false;
const numberToggle = document.getElementById("numbers");
let specialExclude = false;
const specialToggle = document.getElementById("characters");
const copyButton = document.getElementById("copyButton");

copyButton.style.display = "none"

//number toggle
numberToggle.addEventListener("click", function () {
  numberExclude = !numberExclude;
});

//special character toggle
specialToggle.addEventListener("click", function () {
  specialExclude = !specialExclude;
});

//generate password function
function generatePassword(length) {

  fetch(
    url +
      "length=" +
      length +
      "&exclude_numbers=" +
      numberExclude +
      "&exclude_special_chars=" +
      specialExclude,
    {
      method: "GET",
      headers: {
        "X-Api-Key": "gmIBEECCZrQsin5xQH6KEA==JaIyg13mvczmyLxX",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      password.value = data.random_password;
    })
    .catch((error) => console.error(error));
}

//function call on click
newPassword.addEventListener("click", function () {
  generatePassword(value.value);
  copyButton.style.display = "block"
});

//slider returns
const value = document.querySelector("#value");
const input = document.querySelector("#length_input");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

const nav = document.querySelector(".navbar");
let navHeight = nav.getBoundingClientRect().height;

//Menu fade effect function
const hover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".navbar").querySelectorAll(".nav-link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
nav.addEventListener("mouseover", hover.bind(0.3));
nav.addEventListener("mouseout", hover.bind(1));

//sticky header
nav.classList.add("sticky");

//to top button
const toTop = document.getElementById("top");
toTop.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 550 ||
    document.documentElement.scrollTop > 550
  ) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
}

// Copy password to clipboard
copyButton.addEventListener("click", function () {
  const passwordText = password.value;

  // Try using the modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(passwordText)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy password:", error);
      });
  }
  // Fallback for browsers that don't support the clipboard API
  else {
    const textarea = document.createElement("textarea");
    textarea.value = passwordText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Password copied to clipboard!");
  }
});
