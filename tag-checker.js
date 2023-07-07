"use strict";

//defining variables as the divs telling the user the status
let long = document.getElementById("toolong");
let short = document.getElementById("tooshort");
let right = document.getElementById("justright");
let progress = document.getElementById("progress");
let check = document.getElementById("checkbutton");
let descProgress = document.getElementById("desc-progress");
let descLong = document.getElementById("desctoolong");
let descShort = document.getElementById("desctooshort");
let descAlmost = document.getElementById("descgettingthere");
let descRight = document.getElementById("descjustright");
let refreshButton = document.getElementById("refreshbutton");
//hiding the Divs
long.style.display = "none";
right.style.display = "none";
short.style.display = "none";
progress.style.display = "none";
progress.style.display = "none";
descProgress.style.display = "none";
descLong.style.display = "none";
descShort.style.display = "none";
descRight.style.display = "none";
descAlmost.style.display = "none";
refreshButton.style.display = "none";

//add keyup function to title tag
document.getElementById("searchbox").addEventListener("keyup", textInput);

//define input and length variables
function textInput() {
  let input = document.getElementById("searchbox").value;
  let originalInput = input; // store original input to get actual length
  if (input.length > 60) {
    input = input.substring(0, 60) + "..";
  }
  document.getElementById("textoutput").innerHTML = input;
  let length = originalInput.length;
  document.getElementById(
    "textlength"
  ).innerHTML = `Title Tag Length: ${length}`;
  document.getElementById("progress").value = length;
  progress.style.display = "block";
  refreshButton.style.display = "block";

  //if statemements to determine the result, showing relevant div and hiding the others

  if (length >= 0 && length < 50) {
    short.style.display = "block";
    right.style.display = "none";
    long.style.display = "none";
  }

  if (length >= 50 && length <= 60) {
    short.style.display = "none";
    right.style.display = "block";
    long.style.display = "none";
  }

  if (length > 60) {
    short.style.display = "none";
    right.style.display = "none";
    long.style.display = "block";
  }
}

//meta desc
document.getElementById("meta-desc").addEventListener("keyup", metaDesc);
//define input and length variables
function metaDesc() {
  let desc = document.getElementById("meta-desc").value;
  let originalDesc = desc; // store original input to get actual length
  if (desc.length > 160) {
    desc = desc.substring(0, 160) + "..";
  }
  let metaDesc = document.querySelector(".metaDesc");
  metaDesc.innerHTML = desc;
  let length = originalDesc.length;
  document.getElementById(
    "desc-length"
  ).innerHTML = `Meta Description Length: ${length}`;
  document.getElementById("desc-progress").value = length;
  descProgress.style.display = "block";
  refreshButton.style.display = "block";

  if (length >= 0 && length < 50) {
    descShort.style.display = "block";
    descRight.style.display = "none";
    descLong.style.display = "none";
    descAlmost.style.display = "none";
  }

  if (length >= 100 && length <= 155) {
    descShort.style.display = "none";
    descRight.style.display = "none";
    descLong.style.display = "none";
    descAlmost.style.display = "block";
  }

  if (length >= 155 && length <= 160) {
    descShort.style.display = "none";
    descRight.style.display = "block";
    descLong.style.display = "none";
    descAlmost.style.display = "none";
  }

  if (length > 160) {
    descShort.style.display = "none";
    descRight.style.display = "none";
    descLong.style.display = "block";
    descAlmost.style.display = "none";
  }
}

//site name
document.getElementById("site-name").addEventListener("keyup", siteName);
function siteName() {
  let name = document.getElementById("site-name").value;
  let siteTitle = document.querySelector(".site-title");
  siteTitle.innerHTML = name;
  refreshButton.style.display = "block";
}

//site url
document.getElementById("site-url").addEventListener("keyup", siteUrl);
function siteUrl() {
  let url = document.getElementById("site-url").value;
  let siteTitle = document.querySelector(".search-url");
  siteTitle.innerHTML = url;
  refreshButton.style.display = "block";
}

//reset on click of refresh button, hide any divs and clear all fields
refreshbutton.onclick = function () {
  //hide divs
  short.style.display = "none";
  right.style.display = "none";
  long.style.display = "none";
  descShort.style.display = "none";
  descRight.style.display = "none";
  descLong.style.display = "none";
  refreshButton.style.display = "none";

  //reset title tag
  document.getElementById("textoutput").innerHTML = "Your Title Tag";
  document.getElementById("searchbox").value = "";
  //reset meta desc
  document.querySelector(".metaDesc").innerHTML = "Your Meta Description";
  document.getElementById("meta-desc").value = "";
  //reset url
  document.querySelector(".search-url").innerHTML = "www.your-site.co.uk";
  document.getElementById("site-url").value = "";
  //reset site name
  document.querySelector(".site-title").innerHTML = "Your Site Name";
  document.getElementById("site-name").value = "";
  //reset progress and length
  document.getElementById("textlength").innerHTML = "";
  progress.value = "0";
  progress.style.display = "none";
  document.getElementById("desc-length").innerHTML = "";
  descProgress.value = "0";
  descProgress.style.display = "none";
};

const nav = document.querySelector(".navbar");
let navHeight = nav.getBoundingClientRect().height;
// navHeight = navHeight + 100
console.log(navHeight);

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
