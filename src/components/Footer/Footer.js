import './Footer.css';

import githubLogo from '../../images/github.svg';
import fbLogo from '../../images/fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__copyright">&copy; 2021 Supersite, Powered by News API</div>

        <nav className="footer__navigator">
          <ul className="footer__links">
            <li className="footer__link-container">
              <a className="footer__link">Home</a>
            </li>
            <li className="footer__link-container">
              <a className="footer__link">Practicum by Yandex</a>
            </li>
            <li className="footer__link-container">
              <a className="footer__link">
                <img src={githubLogo}/>
              </a>
            </li>
            <li className="footer__link-container">
              <a className="footer__link">
                <img src={fbLogo}/>
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </footer>
  );
}

export default Footer;
