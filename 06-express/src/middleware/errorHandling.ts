import { NextFunction, Request, Response } from "express";

export default function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("I was invoked!");
  console.log(err.stack);
  res.status(400).json({ message: "Something broke." });
  return;
}
