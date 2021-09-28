import React from 'react';
import "../Register/Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props){
    // const [name, setName] = React.useState();
    // const [email, setEmail] = React.useState();
    // const [password, setPassword] = React.useState();
    // const {handleRegister} = props;

    // function handleChangeName(event) {
    //     setName(event.target.value);
    // }

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
        <section className="registration">
        <div className="form__header">
            <img src={logo} alt="Лого в шапке" className="logo logo_profile"/>
            <p className="profile__title profile__title_form">Добро пожаловать!</p>
        </div>
        <form name="form-init" className="form form_reg" >
            <label className="form__label">
                <span className="form__name" id='form__input_name_name'>Имя</span>
                <input type="text" className="form__input form__input_name" id="form__input_name" placeholder="Как тебя зочут, чувааак?" value="" minLength="2" maxLength="30" />
                <span className="form__error" id='form__input_name_error'></span>
            </label>
            <label className="form__label">
                <span className="form__name" id='form__input_name_email'>Email</span>
                <input type="email" className="form__input form__input_email" id="form__input_email" placeholder="Куда слать почтовую сову?" value="" minLength="2" maxLength="30" />
                <span className="form__error" id='form__input_email_error'></span>
            </label>
            <label className="form__label">
                <span className="form__name" id='form__input_name_password'>Password</span>
                <input type="password" className="form__input form__input_password" id="popup__input_password" placeholder="QWERTY123" value="" minLength='8' maxLength='30' />
                <span className="form__error" id='form__input_password_error'></span>
            </label>
            <button className="form__save-button form__save-button_add" >Зарегистрироваться</button>
            <div className="form__link-button">
                <p className="form__link-text">Вы уже зарегистрировались?</p>
                <Link className="form__link" to="/sign-in">Войти</Link>
            </div>
        </form>
    </section>
)}

export default Register;