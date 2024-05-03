document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const deco = document.getElementById("deconnection");
  const supp = document.getElementById("supprimer");

  if (!token) {
    window.location.href = "./signIn.html";
  }

  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "./signIn.html";
  }

  const data = await response.json();

  document.getElementById("email").innerHTML = `Email : ${data.email}`;
  document.getElementById("name").innerHTML = `Nom : ${data.name}`;
  document.getElementById("house").innerHTML = `Maison : ${data.house}`;

  let carte_user = await fetch(`http://localhost:3000/cards/${data.id}`);
  carte_user = await carte_user.json();

  carte_user.forEach((carte) => {
    console.log(carte.id);
  });

  document.getElementById("house").innerHTML =
    carte_user.length != 0
      ? `Nombre de carte : ${carte_user.length}`
      : "Aucune carte débloquée";

  let Gryffindor = document.getElementById("Gryffindor");
  let Hufflepuff = document.getElementById("Hufflepuff");
  let Ravenclaw = document.getElementById("Ravenclaw");
  let Slytherin = document.getElementById("Slytherin");
  let no_house = document.getElementById("no-house");

  let template = document.getElementById("carte-template");

  Gryffindor.innerHTML = "";
  Hufflepuff.innerHTML = "";
  Ravenclaw.innerHTML = "";
  Slytherin.innerHTML = "";
  no_house.innerHTML = "";

  Gryffindor.appendChild(template);
  Hufflepuff.appendChild(template);
  Ravenclaw.appendChild(template);
  Slytherin.appendChild(template);
  no_house.appendChild(template);

  carte_user.forEach((carte) => {
    console.log(carte);
    const carteCard = template.cloneNode(true);

    carteCard.style.display = "block";
    carteCard.querySelector(".carte-nom").textContent = `Nom : ${carte.name}`;

    carteCard.querySelector(
      ".carte-maison"
    ).textContent = `Maison : ${carte.house}`;

    carteCard.querySelector(
      ".carte-acteur"
    ).textContent = `Acteur : ${carte.actor}`;

    carteCard.querySelector(".carte-img").src = carte.img;

    carteCard.querySelector(
      ".carte-details-link"
    ).href = `detail.html?slug=${carte.slug}`;

    if (carte.house) {
      carteCard.classList.add(carte.house);
      switch (carte.house) {
        case "Gryffindor":
          Gryffindor.appendChild(carteCard);
          Gryffindor.style.display = "flex";
          break;
        case "Hufflepuff":
          Hufflepuff.appendChild(carteCard);
          Hufflepuff.style.display = "flex";
          break;
        case "Ravenclaw":
          Ravenclaw.appendChild(carteCard);
          Ravenclaw.style.display = "flex";
          break;
        case "Slytherin":
          Slytherin.appendChild(carteCard);
          Slytherin.style.display = "flex";
          break;
      }
    } else {
      carteCard.classList.add("no-house");
      no_house.appendChild(carteCard);
      no_house.style.display = "flex";
    }
  });

  supp.addEventListener("click", async () => {
    localStorage.removeItem("token");
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await response.json();

    let carte_user = await fetch(`http://localhost:3000/cards/${user.id}`);
    carte_user = await carte_user.json();

    for (const carte of carte_user) {
      await fetch(`http://localhost:3000/remove_card/${user.id}/${carte.id}`, {
        method: "PUT",
      });
    }

    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
    });
    window.location.href = "./signIn.html";
  });

  deco.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./signIn.html";
  });
});
