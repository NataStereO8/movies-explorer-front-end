import React from 'react';
import "../MobMenu/MobMenu.css";
import closeIcon from "../../images/close.svg";
import accountIcon from "../../images/user.svg";
import { Link } from "react-router-dom";

function MobMenu({props,isMobileMenuOpen, handleMobileMenuOpen}) {

    const mobileMenuClassName = (`mob-menu__section ${isMobileMenuOpen ? 'mob-menu__section_open' : 'mob-menu__section_hidden'}`);

    return (
        <section className={mobileMenuClassName}>
            <div className="mob-menu__background"></div>
                <div className="mob-menu__container">
                    <button className="mob-menu__close-button" onClick={handleMobileMenuOpen}>
                        <img className="mob-menu__icon" src={closeIcon} alt="Иконка креста"/>
                    </button>
                    <div className="mob-menu">
                        <ul className="mob-menu__list">
                            <li className="mob-menu__item">
                                <Link className="mob-menu__button" to="/">Главная</Link>
                            </li>
                            <li className="mob-menu__item">
                                <Link className="mob-menu__button" to="/saved-movies">Сохраненные фильмы</Link>
                            </li>
                            <li className="mob-menu__item">
                                <Link className="mob-menu__button" to="/movies">Фильмы</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mob-menu__account-container">
                        <Link className="mob-menu__button__account" to="/profile">
                            <p className="mob-menu__button mob-menu__button_account">Аккаунт</p>
                            <img className="menu__icon-account" src={accountIcon} alt="иконка профиля"/>
                        </Link>
                    </div>
                </div>        
        </section>
    );
}

export default MobMenu;