import prisma from "../config/prisma.js";
import bcrypt from "../utils/bcrypt.js";
import jwt from "../utils/jwt.js";

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.findFirst({
        where: { email: body.email },
      });

      if (!user) {
        return res.status(404).send("Utilisateur introuvable");
      } else if (
        !(await bcrypt.comparePassword(body.password, user.password))
      ) {
        return res.status(401).send("Invalide Password");
      }

      const token = jwt.generateToken(user);
      return res.status(200).send({ user, token });
    } catch (e) {
      return res.status(500).send(`Erreur : ${e.message}`);
    }
  }
}

export default new AuthentificationController();
