import { navbar } from "./constants/script.js";
function Header() {
    return (
        <header>
            {navbar.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </header>
    );
}

export default Header;
