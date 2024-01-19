import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatar.current.value,
        });
    }    

    React.useEffect(() => {
        avatar.current.value = "";
      }, [isOpen]);

    return (
        <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <input name="avatar" type="url" placeholder="Ссылка на картинку" className="form__text form__text_type_avatar" id="avatar-input" ref={avatar} required></input>
                <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}