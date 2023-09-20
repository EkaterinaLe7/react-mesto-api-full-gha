import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";

function AuthForm({ title, formName, buttonText, onSubmit }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
  }, [setValues]);

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onSubmit(email, password);
  };

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" name={formName} onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_content_email"
          type="email"
          id="email-input"
          name="email"
          value={values.email || ""}
          placeholder="Email"
          required=""
          minLength={2}
          maxLength={40}
          onChange={handleChange}
        />

        <input
          className="auth__input auth__input_content_password"
          type="password"
          id="password-input"
          name="password"
          value={values.password || ""}
          placeholder="Пароль"
          required=""
          minLength={5}
          maxLength={40}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          {buttonText}
        </button>
      </form>
      
      {/* {location.pathname === "/sign-up" && (
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      )} */}
    </div>
  );
}

export default AuthForm;
