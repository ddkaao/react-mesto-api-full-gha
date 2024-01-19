import React from "react";

export default function ImagePopup({card, onClose}) {

    const popupOpened = card ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type-view ${popupOpened}`}>
                <div className="popup__img-container">
                    <button type="button" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
                    <img src={card ? card.link : '/'} alt={card ? card.name : ''} className="popup__image"></img>
                    <h3 className="popup__caption">{card ? card.name : ''}</h3>
                </div>
        </div>
    )
}