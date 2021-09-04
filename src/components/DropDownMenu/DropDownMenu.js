import { useContext } from 'react';
import './DropDownMenu.css';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../images/menu.svg';
import closeIcon from '../../images/back.png';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

function DropDownMenu({ isSavedNews, children }) {

  return (
    <div className="drop-down-menu">
      <button className="drop-down-menu__button">
        <BurgerIcon className="drop-down-menu__icon"/>
      </button>

      <div className="drop-down-menu__container">
        <div className="drop-down-menu__header">
          <div className="navigation__logo">NewsExplorer</div>
          <img className="navigation__close-button" src={closeIcon}/>
        </div>

        {children}
      </div>
    </div>
  );
}

export default withRouter(DropDownMenu);
