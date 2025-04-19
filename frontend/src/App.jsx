import "./App.css";
import { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import { FinalHome } from "./pages/Home";
import { FinalFind } from "./pages/Find";
import { DetailPage } from "./pages/DetailPage";
import { FinalAddMangaForm } from "./Components/AddMangaForm";
import LoginForm from "./Components/LoginForm";
import { FinalRegistrationForm } from "./Components/RegistrationForm";

function App() {
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return (
    <>
      <GlobalContext.Provider
        value={{
          mangas,
          setMangas,
          search,
          setSearch,
          manga,
          setManga,
          isLoggedIn,
          setIsLoggedIn,
          username, setUsername,
          password, setPassword
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<FinalHome />} />
              <Route path="/find" element={<FinalFind />} />
              <Route path="/manga/:id" element={<DetailPage />} />
              <Route path="/add" element={<FinalAddMangaForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<FinalRegistrationForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
