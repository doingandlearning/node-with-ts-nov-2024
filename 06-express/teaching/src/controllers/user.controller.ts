import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";

const users: User[] = [];

function getAllUsers(req: Request, res: Response, next: NextFunction) {
  next(new Error("Something went wrong"));
  return;
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
      res
        .status(400)
        .json({ message: "You need to provide a name and location." });
    } else {
      user.id = users.length + 1;
      users.push(user);
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
}
function getUserById(req: Request, res: Response) {
  try {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}
function updateUserById(req: Request, res: Response) {
  try {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
      res.status(404).json({ message: "User could not be found." });
    } else {
      users[userIndex] = { ...users[userIndex], ...req.body };
      res.send(users[userIndex]);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

function deleteUserById(req: Request, res: Response) {
  try {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
      res.status(404).json({ message: "User could not be found." });
    } else {
      users.splice(userIndex, 1); // Changes the underlying array!
      res.status(204).send();
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

export default {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
