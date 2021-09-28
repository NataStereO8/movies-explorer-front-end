import React from 'react';
import Portfolio from "../Portfolio/Portfolio";
import "../AboutMe/AboutMe.css";
import "../Main/Main.css";
import photo from "../../images/photo.jpeg";
import { Link } from "react-router-dom";

function AboutMe({props}) {

    return (
        <section className="student">
            <div className="student__about">
                <div className="landing__title">
                    <p className="landing__text">Студенты</p>
                    <div className="landing__line"></div>
                </div>
                <div className="student__info">
                    <div className="student__information">
                        <div className="student__paragraph">
                            <p className="student__name">Виталий</p>
                            <p className="student__experience">Фронтенд-разработчик, 30 лет</p>
                            <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        </div>
                        <ul className="menu menu_student">
                            <li className="menu-item menu-item_header">
                                <Link className="menu-item__text menu-item__text_student" to="https://www.facebook.com/nataliay.potapova">Facebook</Link>
                            </li>
                            <li className="menu-item menu-item_header">
                                <Link className="menu-item__text menu-item__text_student" to="https://github.com/NataStereO8">Github</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="student__photo">
                        <img className="student__image" src={photo} alt="Фото студента"/>
                    </div>
                </div>
            </div>
            <Portfolio/>
        </section>
    );
}

export default AboutMe;