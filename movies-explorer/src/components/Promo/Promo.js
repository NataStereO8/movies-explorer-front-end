import React from 'react';
import "../Promo/Promo.css"
import NavTab from "../NavTab/NavTab.js"

function Promo({props}) {

    return (
        <section className="banner">
            <h1 className="banner__title">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab/>
        </section>
    );
}

export default Promo;