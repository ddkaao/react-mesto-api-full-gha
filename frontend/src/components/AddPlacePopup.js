import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [isOpen]);

    return (
        <PopupWithForm title='Новое место' name='add' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Название" className="form__text form__text_type_label" id="label-input" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}></input>
            <span className="form__input-error label-input-error"></span>
            <input name="link" type="url" placeholder="Ссылка на картинку" className="form__text form__text_type_link" id="link-input" required value={link} onChange={handleLinkChange}></input>
            <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
    )
}