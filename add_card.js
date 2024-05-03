import prisma from "/Users/ilyan/OneDrive - De Vinci/Documents/GitHub/IlyanJude_BainTrimbach_ProjetAxe/config/prisma.js";

const fetchCarte = async () => {
  try {
    const url = "https://hp-api.lainocs.fr/characters";
    const response = await fetch(url);
    let data = await response.json();
    data = data;

    data.forEach((carte) => {
      ajouterCarte(
        carte.name,
        carte.house,
        carte.slug,
        carte.actor,
        carte.image
      );
    });
  } catch (e) {
    alert(e);
  }
};

async function ajouterCarte(nom, house, slug, actor, img) {
  try {
    const nouvelleCarte = await prisma.card.create({
      data: {
        name: nom,
        slug: slug,
        house: house,
        actor: actor,
        img: img,
      },
    });
    console.log("Nouvelle carte ajoutée:", nouvelleCarte);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la carte:", erreur);
  } finally {
    await prisma.$disconnect();
  }
}

fetchCarte();
