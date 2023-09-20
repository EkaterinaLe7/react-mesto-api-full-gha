import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ selectedCard }) {
  const{ closeAllPopups } = useContext(AppContext);

  usePopupClose(selectedCard?.link, closeAllPopups);

  return (
    <div
      className={`popup popup_type_card-opened ${
        selectedCard && "popup_opened"
      }`}
    >
      <div className="popup__card-container">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={selectedCard && selectedCard.link}
            alt={selectedCard && selectedCard.name}
          />
          <figcaption className="popup__figcaption">
            {selectedCard && selectedCard.name}
          </figcaption>
        </figure>
        <button className="popup__button-close" onClick={closeAllPopups} />
      </div>
    </div>
  );
}

export default ImagePopup;
