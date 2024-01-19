import React from "react";

export default function InfoTooltip ({isOpen, icon, title, onClose}) {

    const popupOpened = isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type-tool ${popupOpened}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
                <img src={icon} alt={title} className="popup__icon"></img>
                <h2 className="popup__tip">{title}</h2>
            </div>
        </div>
    )
}