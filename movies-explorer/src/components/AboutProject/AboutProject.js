import React from 'react';
import "../AboutProject/AboutProject.css";
import "../Main/Main.css";

function AboutProject({props}) {

    return (
        <section className="about">
            <div className="landing__title">
                <p className="landing__text">О проекте</p>
                <div className="landing__line"></div>
            </div>
            <ul className="about__list">
                <li className="about-item">
                    <p className="about-item__title">Дипломный проект включал 5 этапов</p>
                    <p className="about-item__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-item">
                    <p className="about-item__title">На выполнение диплома ушло 5 недель</p>
                    <p className="about-item__text">СУ каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>                    
            <div className="about__progress">
                <div className="about__stage">
                    <div className="about__line-progress about__line-progress_ended">
                        <p className="about__stage-time">1 неделя</p>
                    </div>
                    <p className="about__stage-name">Back-end</p>
                </div>
                <div className="about__stage">
                    <div className="about__line-progress about__line-progress_current">
                        <p className="about__stage-time">4 недели</p>
                    </div>
                    <p className="about__stage-name">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;