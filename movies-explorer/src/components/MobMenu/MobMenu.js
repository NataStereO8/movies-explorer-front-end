import React from 'react';
import "../MobMenu/MobMenu.css";
import closeIcon from "../../images/close.svg";
import accountIcon from "../../images/user.svg";

function MobMenu({props}) {

    return (
        <section className="mob-menu__section">
            <div className="mob-menu__background"></div>
                <div className="mob-menu__container">
                <button className="mob-menu__close-button">
                    <img className="mob-menu__icon" src={closeIcon} alt="Иконка креста"/>
                </button>
                <div className="mob-menu">
                    <ul className="mob-menu__list">
                        <li className="mob-menu__item">
                            <button className="mob-menu__button" href="">Главная</button>
                        </li>
                        <li className="mob-menu__item">
                            <button className="mob-menu__button">Сохраненные фильмы</button>
                        </li>
                        <li className="mob-menu__item">
                            <button className="mob-menu__button">Фильмы</button>
                        </li>
                    </ul>
                </div>
                <div className="mob-menu__account-container">
                    <button className="mob-menu__button mob-menu__button_account">
                        <div className="mob-menu__button-text">Аккаунт</div>
                        <img className="menu__icon" src={accountIcon} alt="иконка frrfeynf"/>
                    </button>
                </div>
                </div>        
        </section>
    );
}

export default MobMenu;