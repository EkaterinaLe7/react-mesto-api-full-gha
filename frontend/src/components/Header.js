import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header page__item-centered">
      <div className="header__logo" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__signin-info">
              <p className="header__email">{email}</p>
              <Link
                to="/sign-in"
                className="header__link header__link_signin"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
