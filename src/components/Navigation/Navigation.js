import './Navigation.css';
import { withRouter, useLocation, Link } from 'react-router-dom';

function Navigation({ isSavedNews }) {
  return (
    <div className={`navigation ${isSavedNews && 'navigation_theme_white'}`}>
      <div className="navigation__container">
        <div className="navigation__logo">NewsExplorer</div>

        <ul className="navigation__links">
          <li className="navigation__link-container">
            <Link to="/" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Home</Link>
          </li>
          <li className="navigation__link-container">
            <Link to="/saved-news" className={`navigation__link ${isSavedNews && 'navigation__link_theme_white'}`}>Saved articles</Link>
          </li>
          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button ${isSavedNews && 'navigation__button_theme_white'}`}>Sign in</button>
          </li>
          <li className="navigation__link-container navigation__button-container">
            <button className={`navigation__button ${isSavedNews && 'navigation__button_theme_white'}`}>Tom [Log out icon]</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Navigation);
