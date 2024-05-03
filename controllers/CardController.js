import prisma from "../config/prisma.js";

class CardController {
  async all_cards(req, res) {
    const cards = await prisma.card.findMany();
    return res.status(200).send(cards);
  }

  async index(req, res) {
    try {
      const id = parseInt(req.params.id_user);

      const user = await prisma.user.findUnique({
        where: { id: id },
        include: { cards: true },
      });

      if (!user) {
        return res.status(404).send("Utilisateur pas trouvé");
      }

      const cartes = user.cards;
      return res.status(200).send(cartes);
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async add_card(req, res) {
    try {
      const id_user = parseInt(req.params.id_user);
      const id_card = parseInt(req.params.id_card);

      const user = await prisma.user.findUnique({
        where: { id: id_user },
        include: { cards: true },
      });

      const card = await prisma.card.findUnique({
        where: { id: id_card },
      });

      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }

      if (!card) {
        return res.status(404).send("Carte non trouvée");
      }

      const updatedUser = await prisma.user.update({
        where: { id: id_user },
        data: { cards: { connect: { id: id_card } } },
      });

      return res.status(200).send(updatedUser);
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async show(req, res) {
    try {
      const id_user = parseInt(req.params.id_user);
      let id_card = req.params.id_card;

      let user = await prisma.user.findUnique({
        where: { id: id_user },
        include: { cards: true },
      });

      if (!user) {
        user = await prisma.user.findUnique({
          where: { id: id_user },
          include: { cards: true },
        });
        return res.status(404).send("Utilisateur pas trouvé");
      }

      const carte_user = user.cards;

      if (isNaN(parseInt(id_card))) {
        let card = await prisma.card.findFirst({
          where: { name: id_card },
        });

        if (!card) {
          return res.status(404).send("Carte pas trouvé");
        }
        return res.status(200).send(card);
      }

      id_card = parseInt(req.params.id_card);

      for (const carte of carte_user) {
        if (carte.id === id_card) {
          return res.status(200).send(carte);
        }
      }
      return res.status(404).send("Carte pas trouvé");
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async remove_card(req, res) {
    try {
      const id_user = parseInt(req.params.id_user);
      const id_card = parseInt(req.params.id_card);

      const user = await prisma.user.findUnique({
        where: { id: id_user },
        include: { cards: true },
      });

      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }

      // Vérifiez si la carte existe dans la liste des cartes de l'utilisateur
      const cardIndex = user.cards.findIndex((card) => card.id === id_card);
      if (cardIndex === -1) {
        return res
          .status(404)
          .send("Carte non trouvée dans la liste de l'utilisateur");
      }

      // Supprimer la carte de la liste des cartes de l'utilisateur
      const updatedUser = await prisma.user.update({
        where: { id: id_user },
        data: { cards: { disconnect: { id: id_card } } },
      });

      return res.status(200).send(updatedUser);
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }
}

export default new CardController();
