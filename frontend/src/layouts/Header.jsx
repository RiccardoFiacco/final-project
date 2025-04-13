import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../Components/LogoutButton";
import LoginButton from "../Components/LoginButton";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  // funzione per verificare lo stato di autenticazione
  const checkAuthStatus = () => {
    axios.get("http://localhost:8080/api/manga", {
      withCredentials: true,
      headers: { //header per evitare caching
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    .then(() => setLoggedIn(true))
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setLoggedIn(false);
      } else {
        console.error("Errore generico: ", error);
      }
    });
  };

  useEffect(() => {
    checkAuthStatus();
    // quando l'utente usa il tasto indietro/avanti del browser
    const handlePopState = () => {
      checkAuthStatus();
    };

    window.addEventListener("popstate", handlePopState);

    // pulizia dell'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        console.log("Logout effettuato");
        setLoggedIn(false);
        document.cookie = "JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      })
      .catch((error) => {
        console.error("Errore nel logout:", error);
      });
  };

  return (
    <header className="container mx-auto bg-blue-400 rounded-2xl">
      <div className="flex justify-between items-center p-3.5">
        <NavLink to="/">
          <div className="logo p-1.5">Manga Library</div>
        </NavLink>
        <nav className="nav p-1.5">
          <ul className="flex gap-4">
            {loggedIn ? (
              <LogoutButton onLogout={handleLogout} />
            ) : (
              <LoginButton />
            )}
            <NavLink to="/find">
              <li className="bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                Cerca
              </li>
            </NavLink>
            {loggedIn ? (
              <NavLink to="/add">
                <li className="bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                  Aggiungi
                </li>
              </NavLink>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
