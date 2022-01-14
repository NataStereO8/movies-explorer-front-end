import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../MoviesCard/MoviesCard.css";

function MoviesCard({
    likedMovies,
    movie,
    cardLikeButtonClicked,
    cardButtonClicked,
}) {

    const location = useLocation();

    const isSaved =
        location.pathname === "/movies" ? likedMovies.some((i) => i.movieId === movie.id) : true;
    
    // console.log(isSaved);

    function handleLikeClick() {
        if (!isSaved) {
            return cardLikeButtonClicked(movie);
        } else if (isSaved) {
            return cardButtonClicked(movie);
        }
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
        } else if (isSaved && location.pathname === '/movies') {
            return 'film__save-button_active';
        }
        return 'film__save-button_delete';
    }

    // console.log(cardButtonClassName());
    // console.log(movie);


    return (
        <li className="film" key={movie.movieId}>
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
            <Link to={{ pathname: movie.trailerLink || movie.trailer}} target="_blank">
                <div className="film__cover">
                    <img
                        src={`${location.pathname === '/movies' ? 'https://api.nomoreparties.co' : ''}${location.pathname === '/movies' ? movie.image.url : movie.image}`}
                        alt={`Постер фильма ${movie.nameRU}`}
                        className="film__photo"
                    />
                </div>
            </Link>
        </li>
    );
}

export default MoviesCard;
