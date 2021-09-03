import './Navigation.css';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../images/logout.svg';

function Navigation({ isSavedNews }) {
  return (
    <div className={`navigation ${isSavedNews && 'navigation_theme_white'}`}>
      <div className="navigation__container">
        <div className="navigation__logo">NewsExplorer</div>

        <ul className="navigation__links">
          <li className="navigation__link-container navigation__link-container_active">
            <Link to="/" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Home</Link>
          </li>
          <li className="navigation__link-container">
            <Link to="/saved-news" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Saved articles</Link>
          </li>
          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button navigation__button_type_signin ${isSavedNews && 'navigation__button_theme_white'}`}>Sign in</button>
          </li>
          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button ${isSavedNews && 'navigation__button_theme_white'}`}>Tom
            <Icon className={`navigation__logout-icon ${isSavedNews && 'navigation__logout-icon_theme_white'}`}/></button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Navigation);
