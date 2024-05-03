let montagne_back = document.getElementById("montagne_back");
let montagne_front = document.getElementById("montagne_front");
let arbre = document.getElementById("arbre");
let buisson = document.getElementById("buisson");
let info = document.getElementById("info-presentation");
let header = document.querySelector("header");

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const carteId = params.get("slug");
  console.log(carteId);

  async function fetchCarte() {
    const url = `https://hp-api.lainocs.fr/characters/${carteId}`;
    const response = await fetch(url);
    const data = await response.json();

    displayCarte(data);
  }

  const displayCarte = async (carte) => {
    if (carte.name) {
      document.querySelector(
        ".nom-presentation"
      ).textContent = `Personnage : ${carte.name}`;
      const response = await fetch("http://localhost:3000/lastHouse");
      console.log(await response.json());
    } else {
      document.querySelector(".nom-presentation").textContent = "";
    }

    if (carte.house) {
      document.querySelector(
        ".house-presentation"
      ).textContent = `Maison : ${carte.house}`;

      fetch("http://localhost:3000/lastHouse", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          house: carte.house,
        }),
      })
        .then((r) => r.json())
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
    } else {
      document.querySelector(".house-presentation").textContent = "";
      const response = await fetch("http://localhost:3000/lastHouse", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          house: "no-house",
        }),
      });
      console.log("house envoyer", "no - house");
    }

    if (carte.actor) {
      document.querySelector(
        ".acteur-presentation"
      ).textContent = `Acteur : ${carte.actor}`;
    } else {
      document.querySelector(".acteur-presentation").textContent = "";
    }

    if (carte.patronus) {
      document.querySelector(
        ".patronus-presentation"
      ).textContent = `Patronus : ${carte.patronus}`;
    } else {
      document.querySelector(".patronus-presentation").textContent = "";
    }

    if (carte.role) {
      document.querySelector(
        ".role-presentation"
      ).textContent = `Role : ${carte.role}`;
    } else {
      document.querySelector(".role-presentation").textContent = "";
    }

    if (carte.eyes) {
      const eye = document.querySelector(".eye-presentation");
      let capitalized =
        carte.eyes.charAt(0).toUpperCase() + carte.eyes.slice(1);
      eye.textContent = `Couleur des yeux : ${capitalized}`;
    } else {
      document.querySelector(".eye-presentation").textContent = "";
    }

    if (carte.hairs) {
      const hair = document.querySelector(".hair-presentation");
      let capitalized =
        carte.hairs.charAt(0).toUpperCase() + carte.hairs.slice(1);
      hair.textContent = `Couleur des cheveux : ${capitalized}`;
    } else {
      document.querySelector(".hair-presentation").textContent = "";
    }
    const div_info_presentation = document.getElementById("info-presentation");
    if (carte.house) {
      div_info_presentation.classList.add(carte.house);
    } else {
      div_info_presentation.classList.add("no-house");
    }
  };

  fetchCarte();
});

window.addEventListener("scroll", function () {
  let value = this.window.scrollY;
  montagne_back.style.top = value * 0.5 + "px";
  montagne_front.style.top = value * 0.2 + "px";
  arbre.style.top = value * 0.3 + "px";
  buisson.style.top = value * 0.1 + "px";
  let info_value = value * 0.037;
  info.style.top = info_value + 30 + "%";
  header.style.marginTop = value * 0.5 + "px";
});
