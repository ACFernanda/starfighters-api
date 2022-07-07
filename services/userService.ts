import axios from "axios";

export async function verifyUsers(firstUser: string, secondUser: string) {
  await axios.get(`http://api.github.com/users/${firstUser}`).catch((error) => {
    throw { type: "not_found", message: error.response.data };
  });

  await axios
    .get(`http://api.github.com/users/${secondUser}`)
    .catch((error) => {
      throw { type: "not_found", message: error.response.data };
    });

  return;
}

export async function getRepos(username: string) {
  const repos = await axios
    .get(`http://api.github.com/users/${username}/repos`)
    .catch((error) => {
      throw { type: "not_found", message: error.response.data };
    });
  return repos;
}
