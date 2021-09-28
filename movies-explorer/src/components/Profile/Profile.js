import React from 'react';
import "../Main/Main.css";
import "../MoviesCard/MoviesCard.css";
import "../Profile/Profile.css";
import Header from "../Header/Header";

function Profile({loggedIn, handleLogout}) {

    return (
        <section className="content">
            <Header
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                />
            <div className="about">
                <div className="profile__title profile__title_account">Привет, Натали</div>
                <div className="about__info">
                    <div className="about__text">
                        <p className="about__input-name">Имя</p>
                        <p className="about__input-value">Натали</p>
                    </div>
                    <div className="about__line"></div>
                    <div className="about__text">
                        <p className="about__input-name">Почта</p>
                        <p className="about__input-value">n.potapova@dcrt.it</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="textButton textButton_black">Редактировать</button>
                    <button className="textButton textButton_pink">Выйти из аккаунта</button>
                </div>
            </div>
        </section>
    );
}

export default Profile;