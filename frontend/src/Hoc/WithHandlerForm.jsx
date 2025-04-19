import { useState } from "react";

export function WithHandlerForm(Component, baseForm) {
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(baseForm);
    function changeHandler(event) {
      let value =
        event.target.type === "select"
          ? event.target.selected
          : event.target.value;

      setData((review) => {
        return {
          ...review,
          [event.target.name]: value,
        };
      });
    }

    function resetForm() {
      setData({
        ...baseForm,
        immagine: null, // Reimposta immagine come null
      });
    }

    return (
      <Component //con questo io ritorno il componente arricchito di nuove props, create in questo componente ma usufruibili nell'import
        data={data} //passo i valori che dovranno essere mostrati come value
        handlerInput={changeHandler} //passo il gestore per aggiornare gli input
        resetForm={resetForm} //passo la funzione per resettare il form
        {...props}
      />
    ); //queste sono le props che aveva gia il componente
  };
}
