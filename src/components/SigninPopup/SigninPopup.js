import React from 'react';
import './SigninPopup.css';

import Popup from '../Popup/Popup'

function SigninPopup() {
  return (
    <Popup
      title={"Sign in"}
    >
      <form className="popup__form form">

        <label className="form__field">
          Email
          <input className="form__input form__item form__item_type_email"
            id="email-input" type="email" name="email" placeholder="Email" required/>
          <span className="form__input-error email-input-error"></span>
        </label>

        <label className="form__field">
          Password
          <input className="form__input form__item form__item_type_password"
            id="password-input" type="password" name="password" placeholder="Password"  required/>
          <span className="form__input-error password-input-error"></span>
        </label>

        <button className="form__submit-button" type="submit">Sign in</button>

      </form>

      <p className="signup__link-container">
        or <a className="signup__link" href="/">Sign up</a>
      </p>
    </Popup>
  );
}

export default SigninPopup;
