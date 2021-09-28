import React from 'react';
import "../Error/Error.css";

function Error({props}) {

    return (
        <div class="page">
            <section class="notFound">
                <div class="notFound__info">
                    <p class="notFound__title">404</p>
                    <p class="notFound__text">Страница не найдена</p>
                </div>
                <button class="textButton textButton_blue">назад</button>
            </section>
        </div>
    );
}

export default Error;