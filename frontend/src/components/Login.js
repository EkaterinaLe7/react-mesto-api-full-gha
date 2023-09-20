import React from "react";
import AuthForm from "./AuthForm";

function Login({ onSubmit }) {
  return (
    <AuthForm
      name="login"
      onSubmit={onSubmit}
      title="Вход"
      buttonText="Войти"
    />
  );
}

export default Login;
