import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    imagename: "",
    imagelink: "",
  });

  useEffect(() => {
    setValues({
      imagename: "",
      imagelink: "",
    });
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.imagename,
      link: values.imagelink,
    });
  }

  return (
    <PopupWithForm
      name="image-add"
      title="Новое место"
      formName="photocard"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_title"
          type="text"
          id="title-input"
          value={values.imagename || ""}
          name="imagename"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          onChange={handleChange}
        />
        <span className="popup__error title-input-error" />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_content_image"
          type="url"
          id="link-input"
          value={values.imagelink || ""}
          name="imagelink"
          placeholder="Ссылка на картинку"
          required=""
          onChange={handleChange}
        />
        <span className="popup__error link-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
