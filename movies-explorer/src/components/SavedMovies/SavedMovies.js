import React from 'react';
import "../SavedMovies/SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({loggedIn, handleLogout}) {

    return (
        <div className="content">
            <Header
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                />
            <SearchForm/>
            <MoviesCardList/>
            <Footer/> 
        </div>
    );
}

export default SavedMovies;