"use strict";

function Getrandom() {
  return parseInt(Math.random() * (30 - 0) + 0);
}

// affiche les cartes
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./signIn.html";
  }

  const fetchCarte = async () => {
    try {
      const response = await fetch("http://localhost:3000/all_cards");
      let data = await response.json();
      console.log(data);
      displayCarte(data);
    } catch (e) {
      alert(e);
    }
  };

  const displayCarte = async (data) => {
    let container = document.getElementById("booster-container");
    let template = document.getElementById("carte-template");

    container.innerHTML = "";
    container.appendChild(template);

    let tab_random = [];

    for (let i = 0; i < 5; i++) {
      tab_random.push(Getrandom());
    }

    console.log(tab_random);

    tab_random.forEach(async (chiffre) => {
      ajouter_card(chiffre + 1);
      const carte = data[chiffre];
      console.log(carte.id);

      const carteCard = template.cloneNode(true);

      carteCard.style.display = "block";
      carteCard.querySelector(".carte-nom").textContent = `Nom : ${carte.name}`;

      carteCard.querySelector(
        ".carte-maison"
      ).textContent = `Maison : ${carte.house}`;

      carteCard.querySelector(".carte-img").src = carte.img;

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

  const ajouter_card = async (id_card) => {
    let user = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user = await user.json();
    const user_id = user.id;
    const url = `http://localhost:3000/users/${user_id}/${id_card}`;
    const add = await fetch(url, {
      method: "PUT",
    });
  };

  fetchCarte();
});
