import { useContext } from 'react';
import './SignupPopup.css';

import Popup from '../Popup/Popup';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function SignupPopup({ isOpen, onClose }) {
  const { openSignInModal } = useContext(NavigatorContext);

  const handleOpenSignInModal = (event) => {
    event.preventDefault();
    openSignInModal();
  }

  return (
    <Popup
      title={"Sign up"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form form">

        <label className="form__field">
          Email
          <input className="form__input form__item form__item_type_email"
            id="email-input" type="email" name="email" placeholder="Enter email" required/>
          <span className="form__input-error email-input-error"></span>
        </label>

        <label className="form__field">
          Password
          <input className="form__input form__item form__item_type_password"
            id="password-input" type="password" name="password" placeholder="Enter password"  required/>
          <span className="form__input-error password-input-error"></span>
        </label>

        <label className="form__field">
          Username
          <input className="form__input form__item form__item_type_password"
            id="password-input" name="password" placeholder="Enter your username"  required/>
          <span className="form__input-error password-input-error"></span>
        </label>

        <button className="form__submit-button" type="submit">Sign up</button>

      </form>

      <p className="signup__link-container">
        or <a className="signup__link" onClick={handleOpenSignInModal}>Sign in</a>
      </p>
    </Popup>
  );
}

export default SignupPopup;
