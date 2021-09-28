import React from 'react';
import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({props}) {

    return (
        <ul className="films-list">
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
        </ul>
    );
}

export default MoviesCardList;