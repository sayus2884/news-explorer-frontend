import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">

        <div className="footer__copyright">copyright</div>

        <nav className="footer__navigator">
          <ul className="footer__links">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Practicum by Yandex</a>
            </li>
            <li>
              <a>github logo</a>
            </li>
            <li>
              <a>fb logo</a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
}

export default Footer;
