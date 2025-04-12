import React, { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { WithFetchHoc } from "../Hoc/WithFetchHoc";
import { Card } from "../Components/Card";
import Searchbar from "../Components/Searchbar";

export function Find({ fetch, searchFetch }) {
  const { mangas, setMangas, search } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      //senza di async non funziona
      const data = await fetch(); //perche dentro la funzione fetch è async
      setMangas(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //senza di async non funziona
      const data = await searchFetch(
        "http://localhost:8080/api/manga/search",
        search
      ); //perche dentro la funzione fetch è async
      console.log(data);
      setMangas(data);
    }
    fetchData();
  }, [search]);
    
    
  return (
    <div className="container mx-auto mt-5">
      <div>
        <Searchbar />
      </div>
      {mangas ? (
        mangas.map((manga, i) => {
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

const FinalFind = WithFetchHoc(Find, "http://localhost:8080/api/manga");
export { FinalFind };
