import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";
import UserModel from "../models/user.models";

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

async function createNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user: User = req.body;
    if (!user.location || !user.name) {
      res
        .status(400)
        .json({ message: "You need to provide a name and location." });
    } else {
      const newUser = new UserModel({
        name: user.name,
        location: user.location,
        role: user.role,
      });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("E11000")) {
        res
          .status(400)
          .send({ message: "You already have someone with that name." });
        return;
      }
    }
    next(error);
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

async function updateUserById(req: Request, res: Response) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
}

async function deleteUserById(req: Request, res: Response) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(204).json();
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
