import React from 'react';
import "../Main/Main.css";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({loggedIn, handleLogout}) {

    return (
        <div className="content">
            <Header
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                />
            <SearchForm/>
            <Preloader/>
            <MoviesCardList/>
            <section className="pagination">
                <button className="pagination__button">Ещё</button>
            </section>
            <Footer/> 
        </div>
    );
}

export default Movies;