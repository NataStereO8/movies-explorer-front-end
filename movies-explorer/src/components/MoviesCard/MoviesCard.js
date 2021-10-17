import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../MoviesCard/MoviesCard.css";

function MoviesCard({
    likedMovies,
    movie,
    cardLikeButtonClicked,
    cardDislikeButtonClicked
}) {

    const location = useLocation();

    const isSaved =
        location.pathname === "/movies"
            ? likedMovies.some((i) => i._id === movie.movieId)
            : true;


    function handleLikeClick() {
        if (!isSaved) {
            return cardLikeButtonClicked(movie);
        } else
            { return cardDislikeButtonClicked(movie)};
    }

    function decoratingDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const time = hours + "ч " + minutes + "м";
        return time;
    }

    function cardButtonClassName() {
        if (!isSaved && location.pathname === '/movies') {
            return 'film__save-button_hidden';
        } if (isSaved && location.pathname === '/movies') {
            return 'film__save-button_active';
        }
        return 'film__save-button_delete';
    }

    return (
        <li className="film">
            <div className="film__about">
                <div className="film__info">
                    <span className="film__name">{movie.nameRU}</span>
                    <span className="film__duration">
                        {decoratingDuration(movie.duration)}
                    </span>
                </div>
                <button
                    className={`film__save-button ${cardButtonClassName()}`}
                    onClick={handleLikeClick}
                ></button>
            </div>
            <Link to={{ pathname: movie.trailerLink }} target="_blank">
                <div className="film__cover">
                    <img
                        src={`https://api.nomoreparties.co${movie.image.url}`}
                        alt="постер фильма"
                        className="film__photo"
                    />
                </div>
            </Link>
        </li>
    );
}

export default MoviesCard;
