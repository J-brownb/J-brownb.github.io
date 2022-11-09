"use strict";

const tabsContainer = document.querySelector(".portfolio__tab-container");
const tabs = document.querySelectorAll(".portfolio__tab");
const tabsContent = document.querySelectorAll(".portfolio__content");

//Tab container
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".portfolio__tab");
  // Guard clause
  if (!clicked) return;
  //Removing active class
  tabsContent.forEach((c) => c.classList.remove("portfolio__content--active"));
  //Activate content area
  document
    .querySelector(`.portfolio__content--${clicked.dataset.tab}`)
    .classList.add("portfolio__content--active");
});
