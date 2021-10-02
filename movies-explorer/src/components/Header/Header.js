import React from 'react';
import logo from '../../images/logo.svg';
import "../Header/Header.css";
import userIcon from "../../images/user.svg";
import openIcon from "../../images/menu.svg";
import { Link } from "react-router-dom";
import MobMenu from "../MobMenu/MobMenu";

function Header(props) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    function handleMobileMenuOpen() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className="header">
            <img src={logo} alt="Лого в шапке" className="logo_header"/>
        
            {props.loggedIn ? (
                <div>
                    <div className="header-menu"> 
                    <ul className="menu menu_header">
                        <li className="menu-item menu-item_header">
                            <Link className="menu-item__text menu-item__text_header" to="/movies">Фильм</Link>
                        </li>
                        <li className="menu-item menu-item_header">
                            <Link className="menu-item__text menu-item__text_header" to="/saved-movies">Сохранённые фильмы</Link>
                        </li>
                        <li className="menu-item menu-item_header menu-item_header_registrated">
                            <Link className="menu-item__text menu-item__text_header" to="/profile">Аккаунт</Link>
                            <img src={userIcon} className="menu-item__icon" alt="иконка аккаунта"/>
                        </li>
                    </ul>
                </div>
                    <button className="mob-menu__open-button" onClick={handleMobileMenuOpen}>
                        <img className="mob-menu__open-icon" src={openIcon} alt="Иконка меню"/>
                    </button>
                    <MobMenu isMobileMenuOpen={isMobileMenuOpen} handleMobileMenuOpen={handleMobileMenuOpen}/>
                </div>
                ) : (
                <div className="header-menu__unregistered">
                    <ul className="menu menu_header">
                        <li className="menu-item menu-item_header">
                            <Link className="menu-item__text menu-item__text_header" to="/sign-up">Регистрация</Link>
                        </li>
                        <li className="menu-item menu-item_header menu-item_unregistered">
                            <Link className="menu-item__text menu-item__text_header" to="/sign-in">Войти</Link>
                        </li>
                    </ul>
                </div>)}            
        </header>
    );
}

export default Header;