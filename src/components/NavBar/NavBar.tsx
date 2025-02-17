import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Calorie tracker</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;