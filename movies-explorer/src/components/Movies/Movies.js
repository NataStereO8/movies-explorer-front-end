import React from 'react';
import "../Main/Main.css";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({loggedIn, handleLogout}) {

    const [film, setFilm] = React.useState();

    function handleChangeFilm(event) {
        setFilm(event.target.value);
    }

    return (
        <div className="content">
            <Header
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                />
            <SearchForm film={film || ''} handleChangeFilm={handleChangeFilm}/>
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