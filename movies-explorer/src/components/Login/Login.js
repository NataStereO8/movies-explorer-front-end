    import React from "react";
    import "../Login/Login.css";
    import logo from "../../images/logo.svg";
    import { Link } from "react-router-dom";
    import useFormWithValidation from "../../utils/useFormWithValidator";

    function Login(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const checkValidation = useFormWithValidation();

    function handleChangeEmail(event) {
        setEmail(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleLogin(email, password);
    }

    return (
        <section className="login">
        <div className="login__countainer">
            <div className="form__header">
            <img src={logo} alt="Лого в шапке" className="logo_profile" />
            <p className="login__title login__title_form">
                Добро пожаловать, чувак!
            </p>
            </div>
            <form
            name="form-init"
            className="form form_log"
            onSubmit={handleSubmit}
            >
            <div className="input__countainer">
                <label className="form__label">
                <span className="form__name" id="form__input_name_email">
                    Email
                </span>
                <input
                    type="email"
                    className="form__input form__input_email"
                    name='email'
                    id="form__input_email"
                    placeholder="Твоя почта для спама"
                    value={email || ''}
                    minLength="2"
                    maxLength="30"
                    onFocus={checkValidation.handleChange}
                    onChange={handleChangeEmail}
                    required
                />
                <span className="form__error" id="form__input_email_error"></span>
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
                    placeholder="Твой секретный пароль"
                    value={password || ''}
                    minLength="8"
                    maxLength="30"
                    onFocus={checkValidation.handleChange}
                    onChange={handleChangePassword}
                    required
                />
                <span
                    className="form__error"
                    id="form__input_password_error"
                ></span>
                </label>
            </div>
            <button className="form__save-button form__save-button_log" disabled={!checkValidation.isValid}>
                Войти
            </button>
            <div className="form__link-button form__link-button_log">
                <p className="form__link-text">Ещё не зарегистрированы?</p>
                <Link className="form__link" to="/signup">
                Зарегистрироваться
                </Link>
            </div>
            </form>
        </div>
        </section>
    );
    }
        
    export default Login;
