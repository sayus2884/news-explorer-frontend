import './Navigation.css';

function Navigation({ isSavedNews }) {
  return (
    <div className={`navigation ${isSavedNews && 'navigation_theme_white'}`}>
      <div className="navigation__container">
        <div className="navigation__logo">NewsExplorer</div>

        <ul className="navigation__links">
          <li className="navigation__link-container">
            <a className="navigation__link">Home</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link">Saved articles</a>
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

export default Navigation;
