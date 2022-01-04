import React from 'react';
import { useHistory } from 'react-router-dom';
import "../Error/Error.css";

function Error({props}) {
    const history = useHistory();
    function goBack() {
        history.goBack();
    };

    return (
        <div class="page">
            <section class="notFound">
                <div class="notFound__info">
                    <p class="notFound__title">404</p>
                    <p class="notFound__text">Страница не найдена</p>
                </div>
                <button class="textButton textButton_blue" onClick={goBack}>назад</button>
            </section>
        </div>
    );
}

export default Error;