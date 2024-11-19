import { Request, Response, NextFunction } from "express";

export default function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req.headers["x-api-key"] ||
    req.headers["x-api-key"] !== process.env.API_KEY
  ) {
    res.status(403).json({ message: "Unauthorised" });
    return;
  }

  next();
}
