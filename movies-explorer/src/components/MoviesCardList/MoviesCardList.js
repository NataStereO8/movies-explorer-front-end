import React from 'react';
import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({props, isSaved}) {

    return (
        <ul className="films-list">
            <MoviesCard isSaved={isSaved}/>
            <MoviesCard isSaved={isSaved}/>
            <MoviesCard isSaved={isSaved}/>
        </ul>
    );
}

export default MoviesCardList;