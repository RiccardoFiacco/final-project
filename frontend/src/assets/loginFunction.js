import axios from "axios";

export async function login(usrnm, psw) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/login",
      {
        username: usrnm,
        password: psw,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Login effettuato:", response.data);
    return true;
  } catch (error) {
    console.error("Errore durante il login", error);
    return false;
  }
}
