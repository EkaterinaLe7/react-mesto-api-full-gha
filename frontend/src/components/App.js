import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationDeletePopup from "./ConfirmationDeletePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import okSign from "../images/OkSign.svg";
import notOkSign from "../images/notOkSign.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingProfilePopup, setIsLoadingProfilePopup] = useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = useState(false);
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false);
  const [isLoadingConfirmPopup, setIsLoadingConfirmPopup] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltipSign, setInfoTooltipSign] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");

  const navigate = useNavigate();

  const checkToken = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    // проверим токен
    const jwt = localStorage.getItem("jwt");
    if (localStorage.getItem("jwt")) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            // авторизуем пользователя
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getAppInfo()
        .then(([cardsArray, userData]) => {
          setCards(cardsArray.reverse());
          setCurrentUser(userData);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleCardLike({ likes, id }) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleCardDelete({ id }) {
    setIsLoadingConfirmPopup(true);
    return api
      .deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== id));
      })
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoadingConfirmPopup(false));
  }

  function handleUpdateUser(data) {
    setIsLoadingProfilePopup(true);
    return api
      .setUserInfo(data)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoadingProfilePopup(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarPopup(true);
    return api
      .editAvatar(data)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoadingAvatarPopup(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlacePopup(true);
    return api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoadingAddPlacePopup(false));
  }

  function handleConfirmationDelete(card) {
    setSelectedDeleteCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedDeleteCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setInfoTooltipSign(okSign);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText("Что-то пошло не так! Попробуйте еще раз.");
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  };

  const onLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipSign(notOkSign);
        setInfoTooltipText("Неверный логин или пароль");
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const signOut = () => {
    if (!localStorage.getItem("jwt")) return;
    localStorage.removeItem("jwt");
    setLoggedIn(false);

    navigate("/sign-in", { replace: true });
  };

  return (
    <AppContext.Provider value={{ closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__container">
            <Header loggedIn={loggedIn} email={email} onSignOut={signOut} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    element={Main}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onConfirmationDelete={handleConfirmationDelete}
                    loggedIn={loggedIn}
                  />
                }
              />

              <Route
                path="sign-up"
                element={<Register onSubmit={onRegister} />}
              />
              <Route path="sign-in" element={<Login onSubmit={onLogin} />} />
              <Route
                path="*"
                element={
                  !loggedIn ? (
                    <Navigate replace to="/sign-in" />
                  ) : (
                    <Navigate replace to="/" />
                  )
                }
              />
            </Routes>

            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoadingProfilePopup}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoadingAvatarPopup}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoadingAddPlacePopup}
            />
            <ConfirmationDeletePopup
              card={selectedDeleteCard}
              onCardDelete={handleCardDelete}
              isLoading={isLoadingConfirmPopup}
            />
            <ImagePopup selectedCard={selectedCard} />
            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              sign={infoTooltipSign}
              text={infoTooltipText}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
