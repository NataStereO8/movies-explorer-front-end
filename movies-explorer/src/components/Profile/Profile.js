import React from 'react';
import "../Main/Main.css";
import "../MoviesCard/MoviesCard.css";
import "../Profile/Profile.css";
import EditPopup from "../EditPopup/EditPopup";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ loggedIn, handleLogout, handleUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    return (
        <section className="content">
            <EditPopup isOpen={isEditProfilePopupOpen} handleEditProfileClick={handleEditProfileClick} handleUpdateUser={handleUpdateUser} />
            <Header
                loggedIn={loggedIn}
                handleLogout={handleLogout}
            />
            <div className="about">
                <div className="profile__title profile__title_account">{`Привет, ${currentUser.name}!`}</div>
                <div className="about__info">
                    <div className="about__text">
                        <p className="about__input-name">Имя</p>
                        <p className="about__input-value">{currentUser.name}</p>
                    </div>
                    <div className="about__line"></div>
                    <div className="about__text">
                        <p className="about__input-name">Почта</p>
                        <p className="about__input-value">{currentUser.email}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="textButton textButton_black" onClick={handleEditProfileClick}>Редактировать</button>
                    <button className="textButton textButton_pink" onClick={handleLogout}>Выйти из аккаунта</button>
                </div>
            </div>
        </section>
    );
}

export default Profile;