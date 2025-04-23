import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // per la navigazione
import { login } from "../assets/loginFunction"; // dove hai messo la funzione login
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

function LoginForm() {
  const [error, setError] = useState("");
  const { setIsLoggedIn, username, setUsername, password, setPassword } =
    useContext(GlobalContext); // Hook per aggiornare lo stato di login
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
    <div className="container flex justify-center text-black mx-auto">
      <form
        className=" mt-3.5 lg:w-1/2 flex flex-col gap-4 justify-center items-center custom-bg-form"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <div>
          <input
            type="text"
            value={username}
            className="border-2 rounded-2xl p-3 mx-5 w-11/12"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci username.."
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            className="border-2 rounded-2xl p-3 mx-5 w-11/12"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci password.."
            required
          />
        </div>
        <button
          className="text-lg uppercase py-1 px-2 bg-cyan-600 rounded-xl"
          type="submit"
        >
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
