import React from 'react';
import "../SearchForm/SearchForm.css";
import "../Main/Main.css";
import searchIcon from "../../images/search-icon.svg";


function SearchForm({searchString, handleSearchSubmit, handleChangeSearchString, isShort, handleChangeIsShort}) {

    return (
        <section className="filters">
            <form className="search" onSubmit={handleSearchSubmit}>
                <img className="search__icon" src={searchIcon} alt="иконка поиска"/>
                <label className="search__label">
                    <input type="text" className="search__input" id="search__input" placeholder="Фильм" value={searchString} onChange={handleChangeSearchString} required/>
                </label>
                <button className="search__button" type="submit">Search</button>
            </form>
            <div className="main__line"></div>
            <div className="filter__container">
                <div className="filter__box">
                    <label className="filter__checkbox">
                        <input className="filter__checkbox-default" checked={isShort} onChange={handleChangeIsShort} type="checkbox" name="film-switch"></input>
                        <span className="filter__switch"></span>
                    </label>
                    <span className="filter__name">Короткометражки</span>
                </div>
            </div>
        </section>
    );
}

export default SearchForm;