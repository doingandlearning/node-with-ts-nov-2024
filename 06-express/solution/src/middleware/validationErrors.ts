import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// Validation rules for /register
const validateUserObject = [
  check("name").trim().notEmpty().withMessage("Name is required."),
  check("location").trim().notEmpty().withMessage("Location is required."),
];

// Middleware to handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export { validateUserObject, handleValidationErrors };
