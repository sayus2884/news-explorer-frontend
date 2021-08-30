import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation">
      <div className="navigaiton__container">
        <div className="navigation__logo">logo here</div>

        <ul className="navigation__links">
          <li className="navigation__link-container">
            <a className="navigation__link">Home</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link">Saved articles</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link_type_button">Sign in</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link_type_button">Tom [Log out icon]</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
