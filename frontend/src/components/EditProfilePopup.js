import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
      }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm title='Редактировать профиль' name='edit' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Имя" className="form__text form__text_type_name" id="name-input" required minLength="2" maxLength="40" value={name} onChange={handleNameChange}></input>
            <span className="form__input-error name-input-error"></span>
            <input name="description" type="text" placeholder="О себе" className="form__text form__text_type_about" id="about-input" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange}></input>
            <span className="form__input-error about-input-error"></span>
        </PopupWithForm>
    )
}