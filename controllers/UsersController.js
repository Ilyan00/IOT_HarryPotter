import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

class UsersController {
  getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  }

  async store(req, res) {
    try {
      const body = req.body;
      console.log(body);
      const existingUser = await prisma.user.findFirst({
        where: { email: body.email },
      });
      console.log(existingUser);

      if (existingUser === null) {
        const user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: await hashPassword(body.password),
            house: body.house,
            cards: {},
          },
          include: {
            cards: true,
          },
        });
        return res.status(201).send(user);
      }
      return res.status(409).send("user existe");
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;

      if (isNaN(parseInt(id))) {
        let user = await prisma.user.findUnique({
          where: { name: id },
        });

        if (!user) {
          return res.status(404).send("Utilisateur pas trouvé");
        }
        return res.status(200).send(user);
      }

      user = await prisma.user.findFirst({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).send("Utilisateur pas trouvé");
      }
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async update(req, res) {
    try {
      const body = req.body;
      const id = req.params.id;

      let user = await prisma.user.findFirst({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).send("Utilisateur pas trouvé");
      }

      user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          house: body.house,
        },
      });
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;

      let existingUser = await prisma.user.findFirst({
        where: { id: parseInt(id) },
      });

      if (!existingUser) {
        return res.status(404).send("Utilisateur pas trouvé");
      }

      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(204).end();
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }
}

// /users en get = liste utilisateurs
// /users en post = ajout utilisateur (body accessible) (.push)
// /users/:id en get = affiche un utilisateur (.find)
// /users/:id en put = modifie un utilisateur (body accessible) (.find =)
// /users/:id en delete = supprime un utilisteur (.find et .slice)

//module.exports = new UsersController();
export default new UsersController();
