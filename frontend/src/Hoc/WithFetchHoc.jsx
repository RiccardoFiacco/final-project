import axios from "axios";

export function WithFetchHoc(Component, url) {
  return (props) => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchSearch(urlSearch, param) {
      console.log(urlSearch);
      try {
        const response = await axios.get(urlSearch, {
          params: { title: param }, //il nome del parametro deve essere uguale a 
          //quello definito nel backend come parametri ricevuti da findMangabyTitle
        });
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    return <Component fetch={fetchData} searchFetch={fetchSearch} {...props} />;
  };
}
