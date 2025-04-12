import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="container mx-auto bg-blue-400 rounded-2xl">
      <div className="flex justify-between items-center p-3.5">
        <NavLink to="/">
          <div className="logo p-1.5">Manga Library</div>
        </NavLink>
        <nav className="nav p-1.5">
          <ul className="flex gap-4">
            <NavLink to="/find">
              <li className=" bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                Cerca
              </li>
            </NavLink>
            <NavLink to="/add">
              <li className=" bg-amber-300 hover:bg-amber-500 p-1 rounded-md">
                Aggiungi
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
