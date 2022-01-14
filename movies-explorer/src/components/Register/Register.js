import React from "react";
import "../Register/Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../utils/useFormWithValidator";

function Register(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {handleRegister} = props;
    const checkValidation = useFormWithValidation();

    function handleChangeName(event) {
        setName(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleRegister(name, email, password);
    }

    return (
        <section className="registration">
            <div className="registration__countainer">
                <div className="form__header">
                    <Link to="/">
                        <img src={logo} alt="Лого в шапке" className="logo logo_profile" />
                    </Link>
                    <p className="register__title register__title_form">
                        Добро пожаловать!
                    </p>
                </div>
                <form name="form-init" className="form form_reg" onSubmit={handleSubmit}>
                    <div className="input__countainer">
                    <label className="form__label">
                        <span className="form__name" id="form__input_name_name">
                            Имя
                        </span>
                        <input
                            type="text"
                            className="form__input form__input_name"
                            name="name"
                            id="form__input_name"
                            placeholder="Как тебя зочут, чувааак?"
                            value={name || ''}
                            onFocus={checkValidation.handleChange}
                            pattern='^[а-яА-ЯёЁa-zA-Z0-9- ]{2,30}$'
                            minLength="2"
                            maxLength="30"
                            onChange={handleChangeName}
                            required
                        />
                        <span className="form__error">{checkValidation.errors.name}</span>
                    </label>
                    <label className="form__label">
                        <span className="form__name" id="form__input_name_email">
                            Email
                        </span>
                        <input
                            type="email"
                            className="form__input form__input_email"
                            name='email'
                            id="form__input_email"
                            placeholder="Куда слать почтовую сову?"
                            value={email || ''}
                            onFocus={checkValidation.handleChange}
                            pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
                            minLength="2"
                            maxLength="30"
                            onChange={handleChangeEmail}
                            required
                        />
                        <span className="form__error">{checkValidation.errors.email}</span>
                    </label>
                    <label className="form__label">
                        <span className="form__name" id="form__input_name_password">
                            Password
                        </span>
                        <input
                            type="password"
                            className="form__input form__input_password"
                            name="password"
                            id="popup__input_password"
                            password="password"
                            placeholder="QWERTY123"
                            value={password || ''}
                            onFocus={checkValidation.handleChange}
                            minLength="8"
                            maxLength="30"
                            onChange={handleChangePassword}
                            required
                        />
                        <span className="form__error">{checkValidation.errors.password}</span>
                        <span
                            className="form__error"
                            id="form__input_password_error"
                        ></span>
                    </label>
                    </div>
                    <button className="form__save-button form__save-button_reg" disabled={!checkValidation.isValid}>
                        Зарегистрироваться
                    </button>
                    <div className="form__link-button form__link-button_reg">
                        <p className="form__link-text">Вы уже зарегистрировались?</p>
                        <Link className="form__link" to="/signin">
                            Войти
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
