import closeButton from "../../images/close.svg";
import "./InfoToolTip.css";

function InfoToolTip({toolTipIcon, toolTipInfo, isOpenToolTip, onClose}) {
    return (
        <section
            className={`popup popup_img ${isOpenToolTip && "popup_opened"}`}
        >
            <div className="popup__container popup__container_message">
                <div className="popup__message">
                    <button
                        className="popup__close-button popup__close-button_img"
                        onClick={onClose}>
                        <img src={closeButton} alt="Закрывающая кнопка" />
                    </button>
                    <img src={toolTipIcon} alt="иконка" className="popup__icon" />
                    <p className="popup__message-text">{toolTipInfo}</p>
                </div>
            </div>
        </section>
    );
}

export default InfoToolTip;
