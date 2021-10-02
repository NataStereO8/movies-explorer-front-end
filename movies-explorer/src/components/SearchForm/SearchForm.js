import React from 'react';
import "../SearchForm/SearchForm.css";
import "../Main/Main.css";
import searchIcon from "../../images/search-icon.svg";


function SearchForm({props, film, handleChangeFilm}) {

    return (
        <section className="filters">
            <div className="search">
                <img className="search__icon" src={searchIcon} alt="иконка поиска"/>
                <label className="search__label">
                    <input type="text" className="search__input" id="search__input" placeholder="Фильм" value={film} onChange={handleChangeFilm} required/>
                </label>
                <button className="search__button">Search</button>
            </div>
            <div className="main__line"></div>
            <div className="filter__container">
                <div className="filter__box">
                    <label className="filter__checkbox">
                        <input className="filter__checkbox-default" type="checkbox" name="film-switch"></input>
                        <span className="filter__switch"></span>
                    </label>
                    <span className="filter__name">Короткометражки</span>
                </div>
            </div>
        </section>
    );
}

export default SearchForm;