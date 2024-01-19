import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <button type="button" aria-label="Редактировать" className="profile__avatar-btn" onClick={onEditAvatar}></button>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"></img>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button type="button" aria-label="Редактировать" className="profile__edit-btn" onClick={onEditProfile}></button>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                    {cards.map((item) => {
                        return (
                            <Card card={item} key={item._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}></Card>
                        )
                    })}       
            </section>
        </main>
    )
}