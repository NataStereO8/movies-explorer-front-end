import React from 'react';
import "../Techs/Techs.css";
import "../Main/Main.css";


function Techs({props}) {

    return (
        <section className="technology">
            <div className="landing__title">
                <p className="landing__text">Технологии</p>
                <div className="landing__line"></div>
            </div>
            <p className="technology__title">7 технологий</p>
            <p className="technology__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="technology__list">
                <li className="technology-item">
                    <p className="technology-item__name">HTML</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">CSS</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">JS</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">React</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">Git</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">Express.js</p>
                </li>
                <li className="technology-item">
                    <p className="technology-item__name">mongoDB</p>
                </li>
            </ul>                    
        </section>
    );
}

export default Techs;