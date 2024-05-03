"use strict";
document.addEventListener("DOMContentLoaded", async () => {
  // Fonction pour les tabs
  const lightbox = new SimpleLightbox(".card a");
  let ecole_elements = document.querySelector(".ecole-elements");
  if (ecole_elements) {
    const filterizr = new Filterizr(".ecole-elements", {
      gutterPixels: 50,
    });
    const filtersList = document.querySelectorAll(".filters li");
    if (filterizr) {
      filtersList.forEach(function (filter) {
        filter.addEventListener("click", function () {
          document.querySelector(".filters .active").classList.remove("active");
          filter.classList.add("active");
          const ecole_elements = document.querySelector(".ecole-elements");
          ecole_elements.classList.remove(
            "Gryffindor",
            "Hufflepuff",
            "Ravenclaw",
            "Slytherin"
          );
          ecole_elements.classList.add(filter.textContent);
        });
      });
    }
  }

  // Fonction pour le Bouton Modale

  const token = localStorage.getItem("token");
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("myModal");
  const closeModalBtn = document.querySelector(".close");
  const btn_submit = document.getElementById("envoyer");

  const input = document.getElementById("inputAuto");
  const autoItems = document.getElementById("auto-items");

  const input_contact = document.getElementById("name");
  const autoItems_contact = document.getElementById("auto-items-contact");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      if (!token) {
        window.location.href = "./signIn.html";
      }
      modal.style.display = "flex";
      document.body.classList.add("modal-open");
    });

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }
    });

    btn_submit.addEventListener("submit", async (e) => {
      e.preventDefault;
      let user = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user = await user.json();
      const user_id = user.id;

      let card = await fetch(
        `http://localhost:3000/card/${user_id}/${input.value}`
      );
      card = await card.json();

      let contact = await fetch(
        `http://localhost:3000/users/${input_contact.value}`
      );
      contact = await contact.json();

      let remove = await fetch(
        `http://localhost:3000/remove_card/${user_id}/${card.id}`,
        {
          method: "PUT",
        }
      );

      let add = await fetch(
        `http://localhost:3000/users/${contact.id}/${card.id}`,
        {
          method: "PUT",
        }
      );
    });

    // Fonction pour l'auto complete

    input.addEventListener("input", async () => {
      try {
        const inputText = input.value.toLowerCase();

        let user = await fetch("http://localhost:3000/getMyProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        user = await user.json();

        autoItems.innerHTML = "";
        let carte = await fetch(`http://localhost:3000/cards/${user.id}`);
        console.log(carte);
        carte = await carte.json();

        const carte_filtre = carte.filter((character) =>
          character.name.toLowerCase().includes(inputText)
        );

        carte_filtre.forEach((character) => {
          const item = document.createElement("div");
          item.classList.add("autocomplete-item");
          item.textContent = character.name;
          item.addEventListener("click", function () {
            input.value = character.name;
            autoItems.innerHTML = "";
          });

          autoItems.appendChild(item);
        });
      } catch (e) {
        console.log(`Erreur : `, e);
      }
    });

    input_contact.addEventListener("input", async () => {
      try {
        const inputText = input_contact.value.toLowerCase();

        autoItems_contact.innerHTML = "";
        let users = await fetch(`http://localhost:3000/users`);
        console.log(users);
        users = await users.json();

        const user_filtre = users.filter((user) =>
          user.name.toLowerCase().includes(inputText)
        );

        user_filtre.forEach((user) => {
          const item = document.createElement("div");
          item.classList.add("autocomplete-item-contact");
          item.textContent = user.name;
          item.addEventListener("click", function () {
            input_contact.value = user.name;
            autoItems_contact.innerHTML = "";
          });

          autoItems_contact.appendChild(item);
        });
      } catch (e) {
        console.log(`Erreur : `, e);
      }
    });
  }
});
