import React from 'react';
import "../MoviesCard/MoviesCard.css";
import photo from "../../images/jack.jpg";

function MoviesCard({props}) {

    return (
            <li className="film">
                <div className="film__about">
                    <div className="film__info">
                        <span className="film__name">Дом, который построил Джек</span>
                        <span className="film__duration">Бесконечно</span>
                    </div>
                    <button className="film__save-button"></button>
                </div>
                <div className="film__cover">
                    <img src={photo} alt="постер фильма" className="film__photo"/>
                </div>
            </li>
    );
}

export default MoviesCard;