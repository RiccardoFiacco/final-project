import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

export function DetailPage() {
  const { manga, setManga } = useContext(GlobalContext);
  const { id } = useParams(); // Get the manga ID from the URL
  const { author, title, description, characters } = manga;
  useEffect(() => {
    async function fetchData() {
      console.log(id);
      const result = await axios.get(`http://localhost:8080/api/manga/${id}`); // Fetch all mangas
      console.log(result.data);
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
    </div>
  );
}
