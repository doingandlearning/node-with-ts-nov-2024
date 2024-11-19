import { Request, Response } from "express";
import { User } from "../types/user.types";

const users: User[] = [];

function getAllUsers(req: Request, res: Response) {
  try {
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

function createNewUser(req: Request, res: Response) {
  try {
    const user: User = req.body;
    if (!user.location || !user.name) {
      return res
        .status(400)
        .json({ message: "You need to provide a name and location." });
    }
    user.id = users.length + 1;
    users.push(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
}
function getUserById(req: Request, res: Response) {
  res.json({ message: "Not implemented yet." });
}
function updateUserById(req: Request, res: Response) {
  res.json({ message: "Not implemented yet." });
}
function deleteUserById(req: Request, res: Response) {
  res.json({ message: "Not implemented yet." });
}

export default {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
