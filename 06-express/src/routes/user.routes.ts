import express, { Router } from "express";
import users from "../controllers/user.controller";
const router = Router();

router.use(express.json());

router.route("/").get(users.getAllUsers).post(users.createNewUser); // !

router
  .route("/:id")
  .get(users.getUserById)
  .patch(users.updateUserById)
  .delete(users.deleteUserById);

export default router;
