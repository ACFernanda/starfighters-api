import { Request, Response } from "express";
import { verifyUsers } from "./../services/userService.js";
import { startBattle } from "./../services/battleService.js";

export async function postBattle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;
  await verifyUsers(firstUser, secondUser);
  const resultBattle = await startBattle(firstUser, secondUser);

  res.send(resultBattle);
}
