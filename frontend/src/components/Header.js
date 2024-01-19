import React from "react";
import logo from '../images/Vector.svg';
import { Link } from "react-router-dom";

export default function Header({route, title, mail, onSignOut}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo"></img>
            <div className="header__menu">
                <p className="header__email">{mail}</p>
                <Link className="header__link" to={route} onClick={onSignOut}>{title}</Link>
            </div>
        </header>
    )
}