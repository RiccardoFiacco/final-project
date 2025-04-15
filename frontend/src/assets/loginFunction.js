import axios from "axios";

export async function login(username, password) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/login",
      { username, password },
      { withCredentials: true }
    );
    console.log("Login effettuato:", response.data);
    return true;
  } catch (error) {
    console.error("Errore durante il login", error);
    return false;
  }
}

