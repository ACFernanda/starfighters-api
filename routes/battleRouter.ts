import { Router } from "express";
import { battleValidator } from "./../middlewares/battleValidator.js";
import { postBattle } from "./../controllers/battleController.js";

const battleRouter = Router();

battleRouter.post("/battle", battleValidator, postBattle);

export default battleRouter;
