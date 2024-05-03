"use strict";
const formulaire = document.getElementById("form-HarryPotter");

document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();

  const choix_maison = () => {
    if (select_house.value != "aucun") {
      fieldset.forEach((etape) => {
        etape.className = select_house.value;
      });
    } else {
      fieldset.forEach((etape) => {
        etape.classList.remove(etape.classList);
      });
    }
  };
  const fieldset = document.querySelectorAll("fieldset");
  const select_house = document.getElementById("maison");
  select_house.addEventListener("change", choix_maison);
});

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const motDePasse = document.getElementById("motDePasse").value;
  const confirm_motDePasse =
    document.getElementById("confirm_motDePasse").value;
  const house = document.getElementById("maison").value;
  const error = document.getElementById("error");

  if (motDePasse === confirm_motDePasse) {
    error.style.display = "none";
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
        password: motDePasse,
        house: house,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.href = "./profile.html";
  } else {
    error.style.display = "flex";
  }
});
