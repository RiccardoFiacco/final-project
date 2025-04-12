export function Header() {
    return (
        <header className="container">
            <div className="flex justify-between">
                <div className="logo">Manga Library</div>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/manga">Manga</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}