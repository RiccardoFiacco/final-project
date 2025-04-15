import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LogoutButton from "../Components/LogoutButton";
import LoginButton from "../Components/LoginButton";
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        console.error(
          "Errore durante il controllo dello stato di login:",
          error
        );
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout", // Usa l'endpoint personalizzato per il logout
        {},
        { withCredentials: true } // Assicurati di inviare i cookie di sessione
      );
      console.log("Logout effettuato");
      setIsLoggedIn(false); // Aggiorna lo stato
      navigate("/"); // Naviga senza refresh
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  }

  return (
    <header className="container mx-auto bg-blue-400 rounded-2xl">
      <div className="flex justify-between items-center p-3.5">
        <NavLink to="/">
          <div className="logo p-1.5">Manga Library</div>
        </NavLink>
        <nav className="nav p-1.5">
          <ul className="flex gap-4">
            {isLoggedIn ? (
              <LogoutButton onLogout={handleLogout} />
            ) : (
              <NavLink to="/login">
                <LoginButton />
              </NavLink>
            )}
            <NavLink to="/find">
              <li className="bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                Cerca
              </li>
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/add">
                <li className="bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                  Aggiungi
                </li>
              </NavLink>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
