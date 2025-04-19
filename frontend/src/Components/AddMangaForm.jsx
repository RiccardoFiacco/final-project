import { WithHandlerForm } from "../Hoc/WithHandlerForm";
import { WithValidation } from "../Hoc/WithValidation";
import { WithRegistrationForm } from "../Hoc/WithRegistration";

const baseForm = {
  author: "",
  title: "",
  description: "",
};

export function AddMangaForm({ data, handlerInput, sender }) {
  const { author, title, description } = data;
  return (
    <div className="container text-black mx-auto">
      <form
        className="lg:w-1/2 flex flex-col gap-4 justify-center items-center custom-bg-form"
        encType="multipart/form-data"
        onSubmit={(e) => sender(e)}
      >
        <h1 className="font-medium text-white text-2xl pb-3">
          Inserisci qui i tuoi dati
        </h1>

        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => handlerInput(e)}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci autore..."
          minLength="4"
          required
        />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => handlerInput(e)}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci titolo.."
          minLength="4"
          required
        />
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => handlerInput(e)}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci descrizione..."
          maxLength="255"
        />
        <button className="uppercase text-2xl py-3 px-3 bg-cyan-600 rounded-4xl">invia</button>
      </form>
    </div>
  );
}

const FinalAddMangaForm = WithHandlerForm(
  WithValidation(WithRegistrationForm(AddMangaForm)),
  baseForm
);

export { FinalAddMangaForm };
