import React from 'react';
import "../MoviesCard/MoviesCard.css";
import photo from "../../images/jack.jpg";
// import { currentUser, CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({props}) {

    const [isLiked, setIsLiked] = React.useState(false);

    function handleLiked() {
        setIsLiked(!isLiked);
    }

    const cardLikeIconClassName = (`film__save-button ${isLiked ? 'film__save-button_active' : 'film__save-button_hidden'}`);

    return (
            <li className="film">
                <div className="film__about">
                    <div className="film__info">
                        <span className="film__name">Дом, который построил...</span>
                        <span className="film__duration">Бесконечно</span>
                    </div>
                    <button className={cardLikeIconClassName} onClick={handleLiked}></button>
                </div>
                <div className="film__cover">
                    <img src={photo} alt="постер фильма" className="film__photo"/>
                </div>
            </li>
    );
}

export default MoviesCard;