import React from 'react';
import { NavigatorContext } from '../../contexts/NavigatorContext.js'

import './SuccessTooltip.css';

function SuccessTooltip({ message, image, alt, isOpen, onClose, openSignInModal }) {

  const handleOpenSignInModal = (event) => {
    event.preventDefault();
    openSignInModal();
  }

  return (
    <div className={`tooltip ${isOpen ? '' : 'tooltip_hidden'}`}>

      <div className="tooltip__overlay"></div>

      <div className="tooltip__content">

        <h2 className="tooltip__message">Registration successfully completed!</h2>

        <a className="tooltip__link" onClick={handleOpenSignInModal}>Sign in</a>

        <button className="tooltip__close-button" type="button" aria-label="close" title="close" onClick={onClose}></button>
      </div>

    </div>
  );
}

export default SuccessTooltip;
