import { useContext, useState, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
export function FinalChangeForm() {
  const { manga, setManga } = useContext(GlobalContext);
  const navigator = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (manga) {
      setFormData({
        author: manga.author || "",
        title: manga.title || "",
        description: manga.description || "",
      });
    }
  }, [manga]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:8080/api/manga/${id}`);
      setManga(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Gestione submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log("sono entrato");
      const result = await axios.put(
        `http://localhost:8080/api/manga/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(result.data.message);
      fetchData();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          navigator("/login");
        } else {
          console.log(error.response.data.message);
        }
      } else {
        console.error("Errore di rete o di configurazione", error);
      }
    }
  }

  return (
    <div className="container flex justify-center text-black mx-auto mb-10">
      <form
        className="lg:w-1/2 flex flex-col gap-4 justify-center items-center custom-bg-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h1 className="font-medium text-white text-2xl pb-3">
          Inserisci qui i tuoi dati
        </h1>

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci autore..."
          minLength="4"
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci titolo..."
          minLength="4"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci descrizione..."
          maxLength="255"
        />
        <button className="uppercase text-lg py-1 px-2 bg-cyan-600 rounded-xl">
          invia
        </button>
      </form>
    </div>
  );
}
