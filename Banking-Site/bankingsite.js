"use strict";


///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
//Tabs
const tabsContainer = document.querySelector(".operations__tab-container");
const tab = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
//Defining button and section
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

//Open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Close modal
const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Smooth Scrolling
btnScroll.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Page Nav
//Add listener to parent
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //Matching
  if (e.target.classList.contains("nav__link")) {
    //Getting href element of each link in the nav
    const id = e.target.getAttribute("href");
    //Passing ID into query selector
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Event delegation
tabsContainer.addEventListener("click", function (e) {
  //Selecting the closest parent element
  const clicked = e.target.closest(".operations__tab");
  //Guard clause, returns early if a condition is matched. Here, when nothing is clicked, the function is finished
  if (!clicked) return;
  //Making buttons go down
  tab.forEach((t) => t.classList.remove("operations__tab--active"));
  //Making active button raise
  clicked.classList.add("operations__tab--active");
  //Hide other tabs on click
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  //Activating content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade effect function
const hover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", hover.bind(0.5));
// On mouse out
nav.addEventListener("mouseout", hover.bind(1));

// //Sticky Nav
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function (e) {
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// //Better sticky nav
// const obsCallback = function(entries, observer) {
// entries.forEach(entry => {
// console.log(entry)
// })
// }
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
let navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else nav.classList.remove('sticky')

}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //entire viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Lazy Loads 
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return
  //replace src attribute with data-src (HQ)
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)

};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});
imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
}
goToSlide(0)


//next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide)

}

//prev slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--
  }
  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
})



// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     //Getting href element of each link in the nav
//     const id = this.getAttribute("href");
//     //Passing ID into query selector
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//Selecting Elements
//Viewing entire document / page
console.log(document.documentElement);
//Viewing the <head>
console.log(document.head);
//Viewing <body>
console.log(document.body);

// //Selecting first element with class name 'header'
// const header = document.querySelector(".header");

//Selecting all elements with class name 'section'
const allSections = document.querySelectorAll(".section");
//Returns a node list of all elements
console.log(allSections);

//Selecting the element with the ID 'section--1'
document.getElementById("section--1");

//Selects all elements with the HTML tag 'button'
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

//Selects all elements with the class name 'btn'
const allBtnClass = document.getElementsByClassName("btn");
console.log(allBtnClass);

//Creating and Inserting Elements
const section11 = document.getElementById("section--1");
//Inserts 'hello there' at the end of section 1
section11.insertAdjacentHTML("afterend", "hello there");

//Creates a new DOM element
const newElement = document.createElement("div");
//Adding a class to the new element
newElement.classList.add("cookie-message");
//Adding content via HTML
newElement.innerHTML =
  'We use cookies on this site <button class= "btn btn--close-cookie"> Got It <button>';
//Puts the new element at the start of the header element (the first child) append sets it as the last child
header.prepend(newElement);
//Cloning the new element
// header.append(newElement.cloneNode(true));

//Deleting Elements

//Closes the element with class name newElement on click of the element with class name btn--close-cookie
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    newElement.remove();
  });

//Styles
//Changing the background color of the newElement
newElement.style.backgroundColor = "#37383d";
//Setting new element width to 120%
newElement.style.width = "120%";
//Returns the backgrund color of newElement
// console.log(newElement.style.backgroundColor);
// //Returns all the styling for newElement
// console.log(getComputedStyle(newElement));
// //Returns the color of newElement
// console.log(getComputedStyle(newElement).color);
//Set height of newElement to current height + 40
// newElement.style.height =
//   Number.parseFloat(getComputedStyle(newElement).height, 10) + 40 + "px";

// //Update --color-primary global color to red
// document.documentElement.style.setProperty("--color-primary", "red");

//Attributes
//Selecting the header image
// const image = document.querySelector(".header__img");
// //Logging attributes to the console
// console.log(image.alt);
// console.log(image.className);

//Setting the alt text of the image to 'hi'
// image.alt = "hi";
// console.log(image.alt);

// //Absolute URL
// console.log(image.src);
// //Relative URL
// console.log(image.getAttribute("src"));

// //Absolute and relative hrefs of an element
// const link = document.querySelector(".nav__link");
//Absolute
// console.log(link.href);
//Relative
// console.log(link.getAttribute("href"));

//Date attributes
// console.log(hero.dataset.versionNumber);

// //Classes
// hero.classList.add();
// hero.classList.remove();
// hero.classList.toggle();
// hero.classList.contains();

// //Event Handler - mouse enter
// const h1 = document.querySelector("h1");
// const alerth1 = function (e) {
//   alert("h1 event listener");
// };
// h1.addEventListener("mouseenter", alerth1);

// //Removes event listener after 3 seconds
// setTimeout(() => h1.removeEventListener("mouseenter", alerth1), 3000);

// //Random Number
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// //Random Colour, using random int function
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//Entire nav bar, when clicking this just the nav bar changes color as it's the parent element
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log("Link", e.target, e.currentTarget);
// });

// //All nav links, when clicking this, this element ant the entire nav bar (parent element changes color)
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log("Link", e.target, e.currentTarget);
// });

// //Individual nav link, when clicking this, all three elements change color as this is the target element and the other two are parents
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

//DOM Traversing
// const h1 = document.querySelector("h1");
// //Down the DOM (child)//
// //Shows all children of the element, returns a HTML collection. Only works for direct children
// console.log(h1.children);
// //Returns the first child element
// console.log(h1.firstElementChild);
// //Returns the last child element
// console.log(h1.lastElementChild);

// //Up the DOM (parent)
// //Retuns the direct parent element
// console.log(h1.parentNode);
// //Returns the parent element
// console.log(h1.parentElement);
// //Returns a parent that matches the specified selector
// console.log(h1.closest(".header"));
// //If the element you are calling it on matches the selector, it just returns the element
// console.log(h1.closest("h1"));

// //Going sideways (siblings)
// //You can only access direct siblings
// //Finds the previous element
// console.log(h1.previousElementSibling);
// //Finds the next element
// console.log(h1.nextElementSibling);
// //Nodes
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// //Getting all the siblings (returns HTML Collection)
// console.log(h1.parentElement.children);
// //Iterating over a HTML collection, making everything except our element smaller
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//on first load of DOM 
document.addEventListener('DOMContentLoaded', function(e){
console.log('hi', e)
})

//on fully load
window.addEventListener('load', function(e) {
  console.log('page fully loaded', e)
})

//message on close
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = ''
})

