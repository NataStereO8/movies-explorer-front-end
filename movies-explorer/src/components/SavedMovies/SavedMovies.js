import React from "react";
import "../Main/Main.css";
import "../SavedMovies/SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
    loggedIn,
    isLoading,
    handleChangeSearchString,
    handleChangeIsShort,
    handleSearchSubmit,
    isShort,
    searchString,
    moviesFiltered,
    likedMovies,
    cardLikeButtonClicked,
    cardDeleteButtonClicked,
    isGetMoviesFetchError,
    infoToolTipText,
}) {
    return (
        <div className="content">
            <Header
                loggedIn={loggedIn}
            />
            <SearchForm
                searchString={searchString || ""}
                handleChangeSearchString={handleChangeSearchString}
                isShort={isShort}
                handleChangeIsShort={handleChangeIsShort}
                handleSearchSubmit={handleSearchSubmit}
            />
            <MoviesCardList
                moviesFiltered={moviesFiltered}
                cardsToShow={likedMovies} 
                isLoading={isLoading}
                cardLikeButtonClicked={cardLikeButtonClicked}
                cardButtonClicked={cardDeleteButtonClicked}
            />

            {isGetMoviesFetchError && <p>{infoToolTipText}</p>}
            <Footer />
        </div>
    );
}


export default SavedMovies;
