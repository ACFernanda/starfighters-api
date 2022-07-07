import db from "./../config/db.js";

async function getAllFighters() {
  return db.query(`
    SELECT username, wins, losses, draws
    FROM fighters
    ORDER BY wins DESC, draws DESC`);
}

export const rankingRepository = { getAllFighters };
