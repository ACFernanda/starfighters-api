import { getRepos } from "./../services/userService.js";
import { battleRepository } from "../repositories/battleRepository.js";

export async function startBattle(firstUser: string, secondUser: string) {
  const firstUserRepos = await getRepos(firstUser);
  const secondUserRepos = await getRepos(secondUser);

  let firstUserStargazersCount = 0;
  let secondUserStargazersCount = 0;

  firstUserRepos.data.forEach(
    (repo) => (firstUserStargazersCount += repo.stargazers_count)
  );

  secondUserRepos.data.forEach(
    (repo) => (secondUserStargazersCount += repo.stargazers_count)
  );

  const firstUserExists = await battleRepository.getFighterByUsername(
    firstUser
  );
  if (!firstUserExists.rows.length) {
    await battleRepository.createNewFighter(firstUser);
  }

  const secondUserExists = await battleRepository.getFighterByUsername(
    secondUser
  );
  if (!secondUserExists.rows.length) {
    await battleRepository.createNewFighter(secondUser);
  }

  if (firstUserStargazersCount === secondUserStargazersCount) {
    await battleRepository.updateFighterByUsername(firstUser, 0, 0, 1);
    await battleRepository.updateFighterByUsername(secondUser, 0, 0, 1);
    return {
      winner: null,
      loser: null,
      draw: true,
    };
  }

  if (firstUserStargazersCount > secondUserStargazersCount) {
    await battleRepository.updateFighterByUsername(firstUser, 1, 0, 0);
    await battleRepository.updateFighterByUsername(secondUser, 0, 1, 0);
    return {
      winner: firstUser,
      loser: secondUser,
      draw: false,
    };
  }

  if (firstUserStargazersCount < secondUserStargazersCount) {
    await battleRepository.updateFighterByUsername(firstUser, 0, 1, 0);
    await battleRepository.updateFighterByUsername(secondUser, 1, 0, 0);
    return {
      winner: secondUser,
      loser: firstUser,
      draw: false,
    };
  }
}
