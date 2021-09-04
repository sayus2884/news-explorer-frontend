import { useContext, useState } from 'react';
import './DropDownMenu.css';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../images/menu.svg';
import closeIcon from '../../images/back.png';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function DropDownMenu({ isSavedNews, children }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  }

  const handleClose = (event) => {
    event.preventDefault();
    setIsOpen(false);
  }

  return (
    <div className="drop-down-menu">
      <BurgerIcon className="drop-down-menu__icon" onClick={handleOpen}/>

      <div className={`drop-down-menu__container ${!isOpen && 'drop-down-menu_hidden'}`}>
        <div className="drop-down-menu__header">
          <div className="navigation__logo">NewsExplorer</div>
          <img className="drop-down-menu__close-button" src={closeIcon}
           onClick={handleClose}/>
        </div>

        {children}
      </div>
    </div>
  );
}

export default withRouter(DropDownMenu);
