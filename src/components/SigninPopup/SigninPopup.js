import React from 'react';
import { useContext, useState } from 'react';
import { isEmail } from 'validator';
import './SigninPopup.css';

import Popup from '../Popup/Popup';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function SigninPopup({ isOpen, onClose, onSubmit }) {
  const { openSignUpModal } = useContext(NavigatorContext);

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isButtonInactive, setIsButtonInactive] = useState(true);
  const [formErrorText, setFormErrorText] = useState('');
  const [isSubmitError, setIsSubmitError] = useState(false);

  const handleOpenSignUpModal = (event) => {
    event.preventDefault();
    openSignUpModal();
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsButtonInactive(true);
    onSubmit(email, password, onError )

    .finally(() => {
      setIsButtonInactive(false);
      resetForm();
    });
  }

  const onError = (textMessage) => {
    setIsSubmitError(true);
    setFormErrorText(textMessage);
  }

  const handleInactiveButton = () => {
    if (!isEmailInvalid && !isPasswordInvalid && email.length !== 0 && password.length !==0) {
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

  const resetForm = () => {
    setEmail("");
    setIsEmailInvalid(false);
    setPassword("");
    setIsPasswordInvalid(false);
    setIsButtonInactive(true);
    setFormErrorText('');
    setIsSubmitError(false);
  }

  const handleOnClose = () => {
    resetForm();
    onClose();
  }


  return (
    <Popup
      title="Sign in"
      isOpen={isOpen}
      onClose={handleOnClose}
    >
      <form className="popup__form form" onSubmit={handleOnSubmit} noValidate>

        <label className="form__field">
          Email
          <input className="form__input form__item form__item_type_email"
            id="email-input" type="email"
            name="email" placeholder="Enter email"
            onChange={handleEmailChange}
            value={email}
            required/>
          <span className={`form__input-error email-input-error ${ isEmailInvalid && 'form__input-error_active'}`}>Invalid email address</span>
        </label>

        <label className="form__field">
          Password
          <input className="form__input form__item form__item_type_password"
            id="password-input" type="password"
            name="password" placeholder="Enter password" minLength={2}
            onChange={handlePasswordChange}
            value={password}
            required/>
        </label>

        <span className={`form__input-error form__submit-error ${isSubmitError && 'form__submit-error_active'}`}>{formErrorText}</span>

        <button className={`form__submit-button ${isButtonInactive && 'form__submit-button_inactive'}`} type="submit">Sign in</button>

      </form>

      <p className="signin__link-container">
        or <a className="signin__link" onClick={handleOpenSignUpModal}>Sign up</a>
      </p>
    </Popup>
  );
}

export default SigninPopup;
