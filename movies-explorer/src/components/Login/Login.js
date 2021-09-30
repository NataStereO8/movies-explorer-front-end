import React from 'react';
import "../Login/Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props) {
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
        <section className="login">
            <div className="login__countainer">
                <div className="form__header">
                    <img src={logo} alt="Лого в шапке" className="logo_profile" />
                    <p className="login__title login__title_form">Добро пожаловать, чувак!</p>
                </div>
                <form name="form-init" className="form form_log" >
                    <div className="input__countainer">
                        <label className="form__label">
                            <span className="form__name" id='form__input_name_email'>Email</span>
                            <input type="email" className="form__input form__input_email" id="form__input_email" placeholder="Твоя почта для спама" value="" minlength="2" maxlength="30" required />
                            <span className="form__error" id='form__input_email_error'></span>
                        </label>
                        <label className="form__label">
                            <span className="form__name" id='form__input_name_password'>Password</span>
                            <input type="password" className="form__input form__input_password" id="popup__input_password" placeholder="Твой секретный пароль" value="" minLength='8' maxLength='30' required />
                            <span className="form__error" id='form__input_password_error'></span>
                        </label>
                    </div>
                    <button className="form__save-button form__save-button_log">Войти</button>
                    <div className="form__link-button form__link-button_log">
                        <p className="form__link-text">Ещё не зарегистрированы?</p>
                        <Link className="form__link" to="/sign-up">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register;