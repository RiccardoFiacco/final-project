import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // per la navigazione
import { login } from "../assets/loginFunction"; // dove hai messo la funzione login
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(GlobalContext); // Hook per aggiornare lo stato di login
  const navigate = useNavigate(); // Hook per navigare dopo il login

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      // Se il login ha successo, naviga alla home page (o pagina protetta)
      setIsLoggedIn(true); // aggiorna lo stato di login
      navigate("/");
    } else {
      // Se il login fallisce, mostra un messaggio di errore
      setError("Credenziali non valide. Riprova.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
