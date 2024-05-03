"use strict";

// Fonction pour basculer l'affichage du menu déroulant
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("show");
}

//Fonction pour le DarkMode
const DarkModeBtn = document.querySelector(".switch");
const body = document.querySelector("body");
function toggleDarkMode() {
  body.classList.toggle("light-mode");
}
DarkModeBtn.addEventListener("change", toggleDarkMode);
