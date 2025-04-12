import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

function Searchbar() {

  const { search, setSearch } = useContext(GlobalContext)

  return (
    <div className=" rounded-lg">
      <input
        onChange={(e) => { setSearch(e.target.value) }}
        className="h-8 rounded-md border-2"
        type="text"
        value={search}
        placeholder='Cerca' />
    </div>
  )
}

export default Searchbar;
