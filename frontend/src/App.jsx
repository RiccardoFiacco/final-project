import "./App.css";
import { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import { FinalHome } from "./pages/Home";
import { FinalFind } from "./pages/Find";
import { DetailPage } from "./pages/DetailPage";
function App() {
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState([]);
  const [search, setSearch] = useState("");
  return (
    <>
      <GlobalContext.Provider value={{ mangas, setMangas, search, setSearch, manga, setManga }}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
                <Route path="/" element={<FinalHome />} />
                <Route path="/find" element={<FinalFind />} /> 
                <Route path="/manga/:id" element={<DetailPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
