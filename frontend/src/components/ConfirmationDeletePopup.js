import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationDeletePopup({ card, onClose, onCardDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      formName="comfirmpopup"
      buttonText="Да"
      card={card}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={card}
      isLoading={isLoading}
    />
  );
}

export default ConfirmationDeletePopup;
