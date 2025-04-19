import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";
import { FinalChangeForm } from "../Components/ChangeForm";
import { DeleteButton } from "../Components/DeleteButton";

export function DetailPage() {
  const { manga, setManga, isLoggedIn } = useContext(GlobalContext);
  const { id } = useParams(); // Get the manga ID from the URL
  const { author, title, description, characters } = manga;
  useEffect(() => {
    console.log(isLoggedIn);
    async function fetchData() {
      const result = await axios.get(`http://localhost:8080/api/manga/${id}`); // Fetch all mangas
      setManga(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-xl font-semibold">Titolo dell'opera: {title}</h2>
      <p className="mt-2">Descrizione: {description}</p>
      <p className="mt-2">Autore: {author}</p>
      {characters && characters.length > 0 ? (
        characters.map((character, index) => {
          return (
            <div
              key={index}
              className="manga-card bg-white hover:bg-blue-200 transition-all duration-300 hover:scale-102 shadow-md rounded-lg p-4 mt-4 flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold">{character.name}</h2>
              <p className="mt-2">{character.description}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      {isLoggedIn && (
        <div>
          <FinalChangeForm />
          <NavLink
            to={`/manga/${id}/add-character`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Aggiungi personaggio
          </NavLink>
          <DeleteButton />
        </div>
      )}
    </div>
  );
}
