import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      formName="avatarpopup"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_image"
          type="url"
          id="avatar-input"
          name="avatarlink"
          ref={avatarRef}
          placeholder="Ссылка на изображение"
          required=""
        />
        <span className="popup__error avatar-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
