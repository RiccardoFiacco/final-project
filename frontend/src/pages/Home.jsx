import { useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { useContext } from "react";
import { WithFetchHoc } from "../Hoc/WithFetchHoc";
import { Card } from "../Components/Card";
export function Home({ fetch }) {
  const { mangas, setMangas } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      //senza di async non funziona
      const data = await fetch(); //perche dentro la funzione fetch è async
      setMangas(data);
    }
    fetchData();

  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold">Welcome to Manga Library</h1>
      <p className="mt-4">
        Discover your favorite manga series and characters.
      </p>
      {mangas ? (
        mangas.map((manga,i) => {
          return (
            <div key={i}>
              <Card manga={manga} />
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const FinalHome = WithFetchHoc(Home, "http://localhost:8080/api/manga");
export { FinalHome };
