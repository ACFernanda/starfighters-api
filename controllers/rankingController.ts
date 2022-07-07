import { Request, Response } from "express";
import { rankingRepository } from "./../repositories/rankingRepository.js";

export async function getRanking(req: Request, res: Response) {
  const fightersResult = await rankingRepository.getAllFighters();
  const fighters = fightersResult.rows;
  res.send({ fighters });
}
