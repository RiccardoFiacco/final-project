import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function DeleteButton() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  async function deleteManga() {
    try {
      const res = axios.delete(`http://localhost:8080/api/manga/${id}`,{
        withCredentials: true
      });
      console.log(res.data);
      setShowModal(false);
      navigator("/");
    } catch (error) {
      console.error("Errore durante l'eliminazione del manga:", error);
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Elimina
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">
              Conferma cancellazione
            </h2>
            <p className="text-gray-700 mb-6">
              Sei sicuro di voler eliminare questo elemento?
            </p>
            <div className="flex justify-around">
              <button
                onClick={deleteManga}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Conferma
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
