import React from 'react';
import "../Login/Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props){
    // const [email, setEmail] = React.useState();
    // const [password, setPassword] = React.useState();
    // const {handleRegister} = props;

    // function handleChangeEmail(event) {
    //     setEmail(event.target.value);
    // }

    // function handleChangePassword(event) {
    //     setPassword(event.target.value);
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     handleRegister(email, password)
    // } 

    return (
        <section class="login">
            <div class="form__header">
                <img src={logo} alt="Лого в шапке" class="logo_profile"/>
                <p class="profile__title profile__title_form">Добро пожаловать, чувак!</p>
            </div>
            <form name="form-init" class="form form_log" >
                <label class="form__label">
                    <span class="form__name" id='form__input_name_email'>Email</span>
                    <input type="email" class="form__input form__input_email" id="form__input_email" placeholder="Твоя почта для спама" value="" minlength="2" maxlength="30" />
                    <span class="form__error" id='form__input_email_error'></span>
                </label>
                <label class="form__label">
                    <span class="form__name" id='form__input_name_password'>Password</span>
                    <input type="password" class="form__input form__input_password" id="popup__input_password" placeholder="Твой секретный пароль" value="" minLength='8' maxLength='30' />
                    <span class="form__error" id='form__input_password_error'></span>
                </label>
                <button class="form__save-button form__save-button_add">Войти</button>
                <div class="form__link-button">
                    <p class="form__link-text">Ещё не зарегистрированы?</p>
                    <Link class="form__link" to="/sign-up">Зарегистрироваться</Link>
                </div>
            </form>
    </section>
)}

export default Register;