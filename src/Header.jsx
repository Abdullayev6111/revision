import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <NavLink to="/">Products</NavLink>
            <NavLink to="/reciepes">Reciepes</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/posts">Posts</NavLink>
        </div>
    );
}

export default Header;
