import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );; 

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <div className="element">
            {isOwn && <button type="button" aria-label="Удалить" className="element__trash" onClick={handleCardDelete}></button>}
            <img src={card.link} onClick={handleCardClick} alt={card.name} className="element__image"></img>
            <div className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" aria-label="Лайкнуть" className={`${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
                    <p className="element__counter">{card.likes.length}</p>
                </div>
            </div>
        </div>    
    )
}