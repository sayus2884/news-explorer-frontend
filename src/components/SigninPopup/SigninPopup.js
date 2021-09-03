import { useContext } from 'react';
import './SigninPopup.css';

import Popup from '../Popup/Popup';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function SigninPopup({ isOpen, onClose }) {
  const { openSignUpModal } = useContext(NavigatorContext);

  const handleOpenSignUpModal = (event) => {
    event.preventDefault();
    openSignUpModal();
  }

  return (
    <Popup
      title="Sign in"
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

        <button className="form__submit-button" type="submit">Sign in</button>

      </form>

      <p className="signin__link-container">
        or <a className="signin__link" onClick={handleOpenSignUpModal}>Sign up</a>
      </p>
    </Popup>
  );
}

export default SigninPopup;
