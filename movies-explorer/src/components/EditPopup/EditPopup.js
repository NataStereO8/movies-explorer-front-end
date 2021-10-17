import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from 'react';
import "../EditPopup/EditPopup.css";
import closeIcon from "../../images/close.svg";
import useFormWithValidation from "../../utils/useFormWithValidator";

function EditPopup({isOpen, handleUpdateUser, handleEditProfileClick, ...props}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);
    const checkValidation = useFormWithValidation();

    function handleChangeName(event) {
        setName(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
        checkValidation.handleChange(event);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleUpdateUser({
            name: name,
            email: email,
        });
        handleEditProfileClick(!handleEditProfileClick);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function disableSubmitButton() {
        if ((currentUser.name === name && currentUser.email === email)
            || !checkValidation.isValid) {
            return true;
        }
        return false;
    }

    return (
        <div className={`editPopup ${isOpen && 'editPopup_open'}`}>
            <button className="editPopup__close-button" onClick={handleEditProfileClick}>
                <img className="editPopup__icon" src={closeIcon} alt="Иконка креста" />
            </button>
            <div className="editPopup__container">
                <form name="form-init" className="form form_edit" onSubmit={handleSubmit}>
                    <div className="input__countainer">
                        <label className="form__label">
                            <span className="form__name" id="form__input_name_name">
                                Имя
                            </span>
                            <input
                                type="text"
                                className="form__input form__input_name"
                                id="form__input_name"
                                placeholder="Как тебя зочут, чувааак?"
                                value={name || ''}
                                minLength="2"
                                maxLength="30"
                                onChange={handleChangeName}
                                required
                            />
                            <span className="form__error" id="form__input_name_error"></span>
                        </label>
                        <label className="form__label">
                            <span className="form__name" id="form__input_name_email">
                                Email
                            </span>
                            <input
                                type="email"
                                className="form__input form__input_email"
                                id="form__input_email"
                                placeholder="Куда слать почтовую сову?"
                                value={email || ''}
                                minLength="2"
                                maxLength="30"
                                onChange={handleChangeEmail}
                                required
                            />
                            <span className="form__error" id="form__input_email_error"></span>
                        </label>
                        <button className="form__save-button form__save-button_edit" disabled={disableSubmitButton()}>
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPopup;