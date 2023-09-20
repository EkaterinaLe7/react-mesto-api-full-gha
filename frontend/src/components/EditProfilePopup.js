import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    username: "",
    userabout: "",
  });

  useEffect(() => {
    setValues({
      username: currentUser.name,
      userabout: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.username,
      about: values.userabout,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      formName="infoform"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_name"
          type="text"
          id="name-input"
          name="username"
          value={values.username || ""}
          placeholder="Имя"
          required=""
          minLength={2}
          maxLength={40}
          onChange={handleChange}
        />
        <span className="popup__error name-input-error" />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_occupation"
          type="text"
          id="occupation-input"
          name="userabout"
          value={values.userabout || ""}
          placeholder="О себе"
          required=""
          minLength={2}
          maxLength={200}
          onChange={handleChange}
        />
        <span className="popup__error occupation-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
