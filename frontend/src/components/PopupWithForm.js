import React from "react";

export default function PopupWithForm({title, name, children, buttonText, isOpen, onClose, onSubmit}) {

    const popupOpened = isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type-${name} ${popupOpened}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}`} className="form form_type-profile" noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit-btn popup__submit-btn_avatar">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}