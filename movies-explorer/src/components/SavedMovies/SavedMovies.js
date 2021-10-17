import React from "react";
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
    isShort,
    searchString,
    searchStringSubmit,
    handleSearchSubmit,
    visibleCount,
    cardDeleteButtonClicked,
    getMoreCount, 
    moviesFiltered
}) {

    return (
        <div className="content">
            <Header loggedIn={loggedIn} />
            <SearchForm
                searchString={searchString || ""}
                handleChangeSearchString={handleChangeSearchString}
                isShort={isShort}
                handleChangeIsShort={handleChangeIsShort}
                handleSearchSubmit={handleSearchSubmit}
            />
            <MoviesCardList
                moviesFiltered={moviesFiltered}
                isLoading={isLoading}
                cardDeleteButtonClicked={cardDeleteButtonClicked}
            />
            <Footer />
        </div>
    );
}

export default SavedMovies;
