"use strict";

// affiche les cartes
document.addEventListener("DOMContentLoaded", function () {
  const fetchCarte = async () => {
    try {
      const url = "https://hp-api.lainocs.fr/characters";
      const response = await fetch(url);
      let data = await response.json();
      data = data;
      displayCarte(data);
    } catch (e) {
      alert(e);
    }
  };

  const displayCarte = (data) => {
    const DarkMode = document.querySelector("body").className;
    let container = document.getElementById("carte-container");
    let template = document.getElementById("carte-template");

    container.innerHTML = "";
    container.appendChild(template);

    data.forEach((carte) => {
      const carteCard = template.cloneNode(true);

      carteCard.style.display = "block";
      carteCard.querySelector(".carte-nom").textContent = `Nom : ${carte.name}`;

      carteCard.querySelector(
        ".carte-maison"
      ).textContent = `Maison : ${carte.house}`;

      carteCard.querySelector(
        ".carte-acteur"
      ).textContent = `Acteur : ${carte.actor}`;

      carteCard.querySelector(
        ".carte-patronus"
      ).textContent = `Patronus : ${carte.patronus}`;
      carteCard.querySelector(".carte-img").src = carte.image;

      carteCard.querySelector(
        ".carte-details-link"
      ).href = `detail.html?slug=${carte.slug}`;

      if (carte.house) {
        carteCard.classList.add(carte.house);
      } else {
        carteCard.classList.add("no-house");
      }
      container.appendChild(carteCard);
    });
  };

  fetchCarte();
});
