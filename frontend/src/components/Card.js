import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  id,
  likes,
  owner,
  onCardClick,
  onCardLike,
  onConfirmationDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `photo-item__like-btn ${
    isLiked && "photo-item__like-btn_active"
  }`;

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeCard() {
    onCardLike({ likes, id });
  }

  function handleDeleteClick() {
    onConfirmationDelete({ id });
  }

  return (
    <li className="photo-item">
      {isOwn && (
        <button
          className="photo-item__delete-btn"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="photo-item__img"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="photo-item__description">
        <h2 className="photo-item__title">{name}</h2>
        <div className="photo-item__counter-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeCard}
          />
          <span className="photo-item__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
