import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onSubmit }) {
  return (
    <div className="register">
      <AuthForm
        name="register"
        onSubmit={onSubmit}
        title="Регистрация"
        buttonText="Зарегистрироваться"
      />
      <Link className="auth__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
