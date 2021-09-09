import React from 'react';
import { useContext } from 'react';
import './Navigation.css';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../images/logout.svg';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

import DropDownMenu from '../DropDownMenu/DropDownMenu';

function Navigation({ isSavedNews }) {

  const { pathname } = useLocation();
  const { openSignInModal, isLoggedIn, logout } = useContext(NavigatorContext);
  const currentUser = useContext(CurrentUserContext);

  const handleOpenSignInModal = (event) => {
    event.preventDefault();
    openSignInModal();
  }

  const handleOnLogout = (event) => {
    event.preventDefault();
    logout();
  }

  const activeStyle = isSavedNews ?
    "navigation__link-container_active_theme_white"
    : "navigation__link-container_active";


  return (
    <div className={`navigation ${isSavedNews && 'navigation_theme_white'}`}>
      <div className="navigation__container">
        <div className={`navigation__logo ${isSavedNews && 'navigation__logo_theme_white'}`}>NewsExplorer</div>

        <DropDownMenu>
          <ul className="navigation__links drop-down-menu_links">
            <li className="navigation__link-container">
              <Link to="/" className={`navigation__link`}>Home</Link>
            </li>

            { isLoggedIn && (
            <li className="navigation__link-container">
              <Link to="/saved-news" className={`navigation__link`}>Saved articles</Link>
            </li>
            )}

            { !isLoggedIn && (
            <li className="navigation__link-container navigation__button-container">
              <button className={`navigation__button navigation__button_type_signin`}
              onClick={handleOpenSignInModal}>Sign in</button>
            </li>
            )}


            { isLoggedIn && (

            <li className="navigation__link-container navigation__button-container">
              <button className={`navigation__button`}
              onClick={handleOnLogout}>{ currentUser ? currentUser.name : ''}
              <Icon className={`navigation__logout-icon`}/></button>
            </li>
            )}

          </ul>
        </DropDownMenu>

        <ul className="navigation__links">
          <li className={`navigation__link-container ${ pathname === '/' && activeStyle }`}>
            <Link to="/" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Home</Link>
          </li>

          { isLoggedIn && (
          <li className={`navigation__link-container ${ pathname === '/saved-news' && activeStyle }`}>
            <Link to="/saved-news" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Saved articles</Link>
          </li>
          )}

          { !isLoggedIn && (
          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button navigation__button_type_signin ${isSavedNews && 'navigation__button_theme_white'}`}
            onClick={handleOpenSignInModal}>Sign in</button>
          </li>
          )}


          { isLoggedIn && (

          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button ${isSavedNews && 'navigation__button_theme_white'}`}
            onClick={handleOnLogout}>{ currentUser ? currentUser.name : ''}
            <Icon className={`navigation__logout-icon ${isSavedNews && 'navigation__logout-icon_theme_white'}`}/></button>
          </li>
          )}

        </ul>
      </div>
    </div>
  );
}

export default withRouter(Navigation);
