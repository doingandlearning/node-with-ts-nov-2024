import express, { Router } from "express";
import users from "../controllers/user.controller";
import apiKeyAuth from "../middleware/apiKeyAuth";
import {
  handleValidationErrors,
  validateUserObject,
} from "../middleware/validationErrors";
const router = Router();

router.use(express.json());

router
  .route("/")
  .get(users.getAllUsers)
  .post(
    apiKeyAuth,
    validateUserObject,
    handleValidationErrors,
    users.createNewUser
  ); // !

router
  .route("/:id")
  .get(users.getUserById)
  .patch(users.updateUserById)
  .delete(users.deleteUserById);

export default router;
