import React from "react";
import "../Main/Main.css";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({
    loggedIn,
    isLoading,
    handleChangeSearchString,
    handleChangeIsShort,
    isShort,
    searchString,
    handleSearchSubmit,
    moviesFiltered,
    cardsToShow,
    cardLikeButtonClicked,
    cardDislikeButtonClicked,
    visibleCount,
    getMoreCount,
    likedMovies
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
                cardsToShow={cardsToShow} 
                isLoading={isLoading}
                likedMovies={likedMovies}
                cardLikeButtonClicked={cardLikeButtonClicked}
                cardButtonClicked={cardDislikeButtonClicked}
            />
            {visibleCount < moviesFiltered.length && (
                <section className="pagination">
                    <button className="pagination__button" onClick={getMoreCount}>
                        Ещё
                    </button>
                </section>
            )}
            <Footer />
        </div>
    );
}

export default Movies;
