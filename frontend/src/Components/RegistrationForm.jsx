import { WithHandlerForm } from "../Hoc/WithHandlerForm";
import { WithValidation } from "../Hoc/WithValidation";
import { WithRegistrationForm } from "../Hoc/WithRegistration";

const baseForm = {
  username: "",
  password: "",
  roles: ["user"],
};

export function RegistrationForm({ data, handlerInput, register }) {
  const { username, password } = data;

  return (
    <div className="container text-black mx-auto">
      <form
        className="lg:w-1/2 flex flex-col gap-4 justify-center items-center custom-bg-form"
        encType="multipart/form-data"
        onSubmit={(e) => register(e)}
      >
        <h1 className="font-medium text-white text-2xl pb-3">Registrati qui</h1>

        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => handlerInput(e)}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci autore..."
          minLength="4"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => handlerInput(e)}
          className="border-2 rounded-2xl p-3 mx-5 w-11/12"
          placeholder="Inserisci titolo.."
          minLength="4"
          required
        />
        <button className="uppercase text-2xl py-3 px-3 bg-cyan-600 rounded-4xl">
          invia
        </button>
      </form>
    </div>
  );
}

const FinalRegistrationForm = WithHandlerForm(
  WithValidation(WithRegistrationForm(RegistrationForm)),
  baseForm
);

export { FinalRegistrationForm };
