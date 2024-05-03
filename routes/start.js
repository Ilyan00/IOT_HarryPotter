//const express = require("express");
//const UsersController = require("../controllers/UsersController");
import express from "express";
import UsersController from "../controllers/UsersController.js";
import CardController from "../controllers/CardController.js";
import AuthentificationController from "../controllers/AuthentificationController.js";
import AuthentificationMiddleWare from "../middlewares/AuthentificationMiddleWare.js";

const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);
router.get(
  "/getMyProfile",
  AuthentificationMiddleWare.authentification,
  UsersController.getMyProfile
);

router.get("/all_cards", CardController.all_cards);
router.get("/cards/:id_user", CardController.index);
router.put("/users/:id_user/:id_card", CardController.add_card);
router.get("/card/:id_user/:id_card", CardController.show);
router.put("/remove_card/:id_user/:id_card", CardController.remove_card);

router.post("/login", AuthentificationController.login);

//module.exports = router;
export default router;
