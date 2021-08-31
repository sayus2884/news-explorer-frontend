import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation__logo">NewsExplorer</div>

        <ul className="navigation__links">
          <li className="navigation__link-container">
            <a className="navigation__link">Home</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link">Saved articles</a>
          </li>
          <li className="navigation__link-container navigation__link-container_type_button">
            <button className="navigation__link_type_button">Sign in</button>
          </li>
          <li className="navigation__link-container navigation__link-container_type_button">
            <button className="navigation__link_type_button">Tom [Log out icon]</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
