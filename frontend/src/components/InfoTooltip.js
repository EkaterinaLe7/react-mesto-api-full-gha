import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, sign, text }) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          onClick={closeAllPopups}
        ></button>
        <div className="popup__info-wrapper">
          <img className="popup__sign" src={sign} alt="Иконка" />
          <h2 className="popup__text">{text}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
