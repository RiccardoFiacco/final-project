/* eslint-disable no-unused-vars */
export function WithValidation(Component) {
  return ({ data, ...other }) => {
    const { author, title, description, characters } = data; // Destruttura name da characters, se esiste
    function inputMangaValidation() {
      const errors = [];
      if (!author.trim()) {
        errors.push("L'autore è obbligatorio.");
      } else if (author.length > 255) {
        errors.push("L'autore non può superare i 255 caratteri.");
      }

      if (!description.trim()) {
        errors.push("La descrizione è obbligatoria.");
      } else if (description.length > 255) {
        errors.push("La descrizione non può superare i 255 caratteri.");
      }

      if (!title.trim()) {
        errors.push("Il titolo è obbligatorio.");
      } else if (title.length > 255) {
        errors.push("Il titolo non può superare i 255 caratteri.");
      }

      if (characters) {
        if (!characters.description.trim()) {
          errors.push("La descrizione è obbligatoria.");
        } else if (characters.description.length > 255) {
          errors.push("La descrizione non può superare i 255 caratteri.");
        }

        if (!characters.name.trim()) {
          errors.push("Il nome è obbligatorio.");
        } else if (characters.name.length > 255) {
          errors.push("Il nome non può superare i 255 caratteri.");
        }
      }
      return errors;
    }

    function charactersValidation() {
      const errors = [];

      if (!characters.description.trim()) {
        errors.push("La descrizione è obbligatoria.");
      } else if (characters.description.length > 255) {
        errors.push("La descrizione non può superare i 255 caratteri.");
      }

      if (!characters.name.trim()) {
        errors.push("Il nome è obbligatorio.");
      } else if (characters.name.length > 255) {
        errors.push("Il nome non può superare i 255 caratteri.");
      }

      return errors;
    }

    return (
      <Component
        mangaValidation={inputMangaValidation}
        charactersValidation={charactersValidation}
        data={data}
        {...other}
      />
    );
  };
}
