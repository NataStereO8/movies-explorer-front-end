import React from "react";
import "../Main/Main.css";
import "../SavedMovies/SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
// import { deleteFilm } from "../../utils/MainApi";
import Header from "../Header/Header";
//import BadIcon from "../../images/bad-tik.svg";
import {
    filterMoviesByDuration,
    filterMoviesBySearchString,
} from "../../utils/MoviesFilter";
import Footer from "../Footer/Footer";
// import {
//     movieSearchErrorMessage
// } from '../../utils/const';

function SavedMovies({
    loggedIn,
    isLoading,
    likedMovies,
    cardLikeButtonClicked,
    cardDeleteButtonClicked,
    isGetMoviesFetchError,
    infoToolTipText,
}) {

    const [searchStringSubmit, setSearchStringSubmit] = React.useState("");
    const [isShort, setIsShort] = React.useState(false);
    const [moviesFiltered, setMoviesFiltered] = React.useState([]);
    const [searchString, setSearchString] = React.useState("");
        // eslint-disable-next-line
    // const [isMoreButton, setIsMoreButton] = React.useState(false);
    // const [toolTipInfo, setToolTipInfo] = React.useState("");
    // const [toolTipIcon, setToolTipIcon] = React.useState("");
    const [searchIsRun, setSearchIsRun] = React.useState(false);

    React.useEffect(() => {
        if (searchStringSubmit && isShort) {
            setMoviesFiltered(filterMoviesByDuration(moviesFiltered, isShort));
        } else if (!isShort) {
            setMoviesFiltered(filterMoviesBySearchString(likedMovies, searchStringSubmit));
        }
        // eslint-disable-next-line
    }, [isShort]);

    React.useEffect(() => {
        if (searchStringSubmit) {
            setMoviesFiltered(filterMoviesBySearchString(likedMovies, searchStringSubmit));
        }
        // eslint-disable-next-line
    }, [searchStringSubmit]);

    function filter(isShort, array) {
        if (isShort) {
            return array.filter((card) => card.duration <= 75);
        }
        return array;
    }
    
    function handleSearchSubmit(event) {
        event.preventDefault();
        setSearchIsRun(true);
        setSearchStringSubmit(searchString);
    }

    function handleChangeSearchString(event) {
        setSearchString(event.target.value);
    }

    function handleChangeIsShort(event) {
        setIsShort(event.target.checked);
    }

    function clearSearchString(){
        if (moviesFiltered.length === 1) {
            setSearchString("");
        }
    }

    function handleDeleteInSearchResult(card) {
        cardDeleteButtonClicked(card);
        setMoviesFiltered(moviesFiltered.filter((i) => i._id !== card._id));
        clearSearchString();
        console.log(moviesFiltered);
    }

    const cardsToShow = moviesFiltered.length === 0
    ? filter(isShort, likedMovies)
    : filter(isShort, moviesFiltered);

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
                cardsToShow={cardsToShow} 
                isLoading={isLoading}
                cardLikeButtonClicked={cardLikeButtonClicked}
                cardButtonClicked={searchIsRun ? handleDeleteInSearchResult : cardDeleteButtonClicked}
            />

            {isGetMoviesFetchError && <p>{infoToolTipText}</p>}
            <Footer />
        </div>
    );
}


export default SavedMovies;
