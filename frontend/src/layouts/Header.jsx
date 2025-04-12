function Header() {
  return (
    <header className="container mx-auto border-2 border-red-700">
      <div className="flex justify-between items-center p-3.5">
        <div className="logo p-1.5">Manga Library</div>
        <nav className="nav p-1.5">
          <ul className="flex gap-4">
            <li className=" bg-blue-400 hover:bg-blue-500 p-1 rounded-md">
              <a href="/">Home</a>
            </li>
            <li className=" bg-blue-400 hover:bg-blue-500 p-1 rounded-md">
              <a href="/manga">Manga</a>
            </li>
            <li className=" bg-blue-400 hover:bg-blue-500 p-1 rounded-md">
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
