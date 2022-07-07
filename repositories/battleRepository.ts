import db from "./../config/db.js";

async function getFighterByUsername(username: string) {
  return db.query(
    `
    SELECT *
    FROM fighters
    WHERE username=$1
  `,
    [username]
  );
}

export async function createNewFighter(username: string) {
  return db.query(
    `
      INSERT INTO fighters (username, wins, losses, draws)
      VALUES ($1,$2,$3,$4)
    `,
    [username, 0, 0, 0]
  );
}

async function updateFighterByUsername(
  username: string,
  wins: number,
  losses: number,
  draws: number
) {
  return db.query(
    `
      UPDATE fighters SET wins=wins+$1, losses=losses+$2, draws=draws+$3
          WHERE username = $4;
  `,
    [wins, losses, draws, username]
  );
}

export const battleRepository = {
  getFighterByUsername,
  createNewFighter,
  updateFighterByUsername,
};
