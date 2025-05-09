/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";

export function WithRegistrationForm(Component) {
  return ({
    data,
    charactersValidation,
    resetForm,
    mangaValidation,
    userValidation,
    ...other
  }) => {
    const { id } = useParams();
    const { setMangas, setManga } = useContext(GlobalContext);
    const navigator = useNavigate();

    async function sendManga(event) {
      event.preventDefault();
      //trim inputauthor, title, description
      data.author = data.author ? data.author.trim() : "";
      data.title = data.title ? data.title.trim() : "";
      data.description = data.description ? data.description.trim() : "";

      //eseguo la validazione
      const result = mangaValidation();
      //se validazione va bene faccio chiamata
      console.log(result);
      if (result.length == 0) {
        try {
          console.log("sono entrato");
          const result = await axios.post(
            `http://localhost:8080/api/manga`,
            data
          );
          console.log(result.data.message);
          fetchData();
          navigator("/");
          resetForm();
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
      } else {
        //output errore validazione
        console.log(result);
      }
    }

    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/api/manga`);
        setMangas(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function sendRegistration(event) {
      event.preventDefault();
      console.log(data);
      //trim inputauthor, title, description
      data.username = data.username ? data.username.trim() : "";
      data.password = data.password ? data.password.trim() : "";
      const result = userValidation();
      //se validazione va bene faccio chiamata
      if (result.length == 0) {
        try {
          const result = await axios.post(
            `http://localhost:8080/api/users/register`,
            data
          );
          console.log(result.data.message);
          navigator("/login");
          resetForm();
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
              navigator("/register");
            } else {
              console.log(error);
            }
          } else {
            console.error("Errore di rete o di configurazione", error);
          }
        }
      } else {
        console.log(result);
      }
    }
    return (
      <Component
        sender={sendManga}
        data={data}
        register={sendRegistration}
        {...other}
      />
    );
  };
}
