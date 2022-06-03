import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to='/'>
                <h1>Hello, DRF</h1>
            </Link>
            <Link to='/projects'>
                <h2>Projects</h2>
            </Link>
        </div>
    )
}

export default Header;