import React from 'react';
import { useContext, useState } from 'react';
import { isEmail } from 'validator';
import './SignupPopup.css';

import Popup from '../Popup/Popup';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function SignupPopup({ isOpen, onClose, onSubmit }) {
  const { openSignInModal } = useContext(NavigatorContext);

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isButtonInactive, setIsButtonInactive] = useState(true);

  const handleOpenSignInModal = (event) => {
    event.preventDefault();
    openSignInModal();
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    resetForm();
    onSubmit(email, password, username);
  }

  const handleInactiveButton = () => {
    const isValid = !isEmailInvalid && !isPasswordInvalid && !isUsernameInvalid;
    const notEmpty = email.length !== 0 && password.length !== 0 && username.length !== 0;

    if (isValid && notEmpty) {
      setIsButtonInactive(false);
    } else {
      setIsButtonInactive(true);
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailInvalid(!isEmail(event.target.value));
    handleInactiveButton();
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordInvalid(!event.target.validity.valid);
    handleInactiveButton();
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setIsUsernameInvalid(!event.target.validity.valid);
    handleInactiveButton();
  }

  const resetForm = () => {
    setEmail("");
    setIsEmailInvalid(false);
    setPassword("");
    setIsPasswordInvalid(false);
    setUsername("");
    setIsUsernameInvalid(false);
    setIsButtonInactive(true);
  }

  const handleOnClose = () => {
    onClose();
    resetForm();
  }

  return (
    <Popup
      title={"Sign up"}
      isOpen={isOpen}
      onClose={handleOnClose}
    >
      <form className="popup__form form" onSubmit={handleOnSubmit} noValidate>

        <label className="form__field">
          Email
          <input className="form__input form__item form__item_type_email"
            id="email-input" type="email" name="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={email}
            required/>
          <span className={`form__input-error email-input-error ${ isEmailInvalid && 'form__input-error_active'}`}></span>
        </label>

        <label className="form__field">
          Password
          <input className="form__input form__item form__item_type_password"
            id="password-input" type="password"
            name="password" placeholder="Enter password" minLength={2}
            onChange={handlePasswordChange}
            value={password}
            required/>
          <span className="form__input-error password-input-error"></span>
        </label>

        <label className="form__field">
          Username
          <input className="form__input form__item form__item_type_password"
            id="password-input"
            name="password" placeholder="Enter your username" minLength={2}
            onChange={handleUsernameChange}
            value={username}
            required/>
          <span className="form__input-error password-input-error"></span>
        </label>

        <button className={`form__submit-button ${isButtonInactive && 'form__submit-button_inactive'}`} type="submit">Sign up</button>

      </form>

      <p className="signup__link-container">
        or <a className="signup__link" onClick={handleOpenSignInModal}>Sign in</a>
      </p>
    </Popup>
  );
}

export default SignupPopup;
