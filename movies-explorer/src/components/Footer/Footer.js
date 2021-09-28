import React from 'react';
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

function Footer({props}) {

    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__line"></div>
            <div className="footer__links">
                <p className="footer__year">© 2020</p>
                <ul className="menu menu_footer">
                    <li className="menu-item menu-item_footer">
                        <Link className="menu-item__text menu-item__text_footer" to="/movies">Фильмы</Link>
                    </li>
                    <li className="menu-item menu-item_footer">
                        <Link className="menu-item__text menu-item__text_footer" to="/saved-movies">Сохраненные фильмы</Link>
                    </li>
                    <li className="menu-item menu-item_footer">
                        <Link className="menu-item__text menu-item__text_footer" to="/profile">Аккаунт</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;