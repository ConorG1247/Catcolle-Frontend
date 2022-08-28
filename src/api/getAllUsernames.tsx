async function getAllUsernames() {
  const response = await fetch("http://localhost:3001/getAllUsers");
  const data = await response.json();

  return data;
}

export default getAllUsernames;
