import { Request, Response } from "express";
import { battleSchema } from "./../schemas/battleSchema.js";

export function battleValidator(req: Request, res: Response, next) {
  const body = req.body;
  const validation = battleSchema.validate(body);
  if (validation.error) {
    throw {
      type: "unprocessable_entity",
      message: validation.error.details.map((detail) => detail.message),
    };
  }

  next();
}
