import React from 'react';
import "../Portfolio/Portfolio.css";
import icon from "../../images/arrow.svg";
import { Link } from "react-router-dom";

function Portfolio({props}) {

    return (
        <div className="portfolio">
                <div className="landing__title landing__title_portfolio">
                    <p className="landing__text landing__text_portfolio">Портфолио</p>
                </div>
                <ul className="portfolio__list">
                    <li className="portfolio-item">
                        <Link className="portfolio-item__link" to="/">
                            <p className="portfolio-item__text">Статичный сайт</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </Link>
                        <div className="portfolio-item__line"></div>
                    </li>
                    <li className="portfolio-item">
                        <Link className="portfolio-item__link" to="/">
                            <p className="portfolio-item__text">Адаптивный сайт</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </Link>
                        <div className="portfolio-item__line"></div>
                    </li>
                    <li className="portfolio-item">
                        <Link className="portfolio-item__link" to="/">
                            <p className="portfolio-item__text">Одностраничное приложение</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </Link>
                    </li>
                </ul>
            </div>
    );
}

export default Portfolio;