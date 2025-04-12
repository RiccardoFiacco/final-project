import "./App.css";
import { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import Home from "./pages/Home";

function App() {
  const [mangas, setMangas] = useState([]);

  return (
    <>
      <GlobalContext.Provider value={{ mangas, setMangas }}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
             <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
