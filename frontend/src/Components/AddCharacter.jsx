import {useState} from "react";
import GlobalContext from "../contexts/GlobalContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export function AddCharacter() {

    const navigator = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    async function handleSubmit() { 
        try {
            const result = await axios.post(
                `http://localhost:8080/api/manga/${id}/characters`,
                formData,
                {
                    withCredentials: true,
                }
            );
            console.log(result.data.message);
            navigator(`/manga/${id}`);
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    navigator("/login");
                } else {
                    console.error("Errore durante l'invio del form:", error);
                }
            }
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    return (
        <div className="container mx-auto mt-5">
            <h2 className="text-xl font-semibold">Aggiungi un personaggio</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome del personaggio"
                    className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrizione del personaggio"
                    className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-10"
                >
                    Aggiungi Personaggio
                </button>
            </form>
        </div>
    );
}