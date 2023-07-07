"use strict";

//gsap changing text
gsap.registerPlugin(TextPlugin);

let text = ["Collaborative ", "Enthusiastic ", "Imaginative ", "Resourceful "];
let currentIndex = 0;

function changeText() {
  gsap.to(".changingText span", {
    duration: 2,
    text: text[currentIndex],
    ease: "none",
  });
  currentIndex = currentIndex + 1;
  if (currentIndex > text.length - 1) {
    currentIndex = 0;
  }
}

setInterval(function () {
  changeText();
}, 3500);

//gsaap changing header on scroll
// Slide
console.clear();
gsap.config({ trialWarn: false });
gsap.registerPlugin(ScrollTrigger);
gsap.to("#banner, #wellness-banner, #library-banner", {
  "--target": "0%",
  ease: "none",
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "+=900",
    pin: true,
    toggleActions: "play reverse none reverse", // play forward when scrolling down, reverse when scrolling up
    markers: {startColor: "green", endColor: "red", fontSize: "12px"}
  },
});


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

//Fade in sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});
