import { NavLink } from "react-router-dom";
export function Card({ manga }) {
  const { id, title, description } = manga;
  return (
    <NavLink to={`/manga/${id}`}>
      <div
        key={id}
        className="manga-card bg-white hover:bg-blue-200 transition-all duration-300 hover:scale-102 shadow-md rounded-lg p-4 mt-4 flex justify-between items-center"
      >
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-2">{description}</p>
        </div>
      </div>
    </NavLink>
  );
}
