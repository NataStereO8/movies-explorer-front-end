import React from 'react';
import "../Portfolio/Portfolio.css";
import icon from "../../images/arrow.svg";

function Portfolio({props}) {

    return (
        <div className="portfolio">
                <div className="landing__title landing__title_portfolio">
                    <p className="landing__text landing__text_portfolio">Портфолио</p>
                </div>
                <ul className="portfolio__list">
                    <li className="portfolio-item">
                        <a className="portfolio-item__link" href="https://www.behance.net/Stereo8">
                            <p className="portfolio-item__text">Статичный сайт</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </a>
                        <div className="portfolio-item__line"></div>
                    </li>
                    <li className="portfolio-item">
                        <a className="portfolio-item__link" href="https://www.behance.net/Stereo8">
                            <p className="portfolio-item__text">Адаптивный сайт</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </a>
                        <div className="portfolio-item__line"></div>
                    </li>
                    <li className="portfolio-item">
                        <a className="portfolio-item__link" href="https://www.behance.net/Stereo8">
                            <p className="portfolio-item__text">Одностраничное приложение</p>
                            <img className="portfolio-item__icon" src={icon} alt="Стрелочка"/>
                        </a>
                    </li>
                </ul>
            </div>
    );
}

export default Portfolio;