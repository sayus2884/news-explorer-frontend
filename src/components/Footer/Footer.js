import { Link } from 'react-router-dom';
import './Footer.css';

import githubLogo from '../../images/github.svg';
import fbLogo from '../../images/fb.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__copyright">&copy; 2021 Supersite, Powered by News API</div>

        <div className="footer__navs">
          <nav className="footer__nav">
            <ul className="footer__links footer__links_type_app">
              <li className="footer__link-container">
              <Link to="/" className="footer__link">Home</Link>
              </li>
              <li className="footer__link-container">
              <a href="https://practicum.yandex.com/" target="_blank" className="footer__link">Practicum by Yandex</a>
              </li>
            </ul>
          </nav>
          <nav className="footer__nav">
            <ul className="footer__links">
              <li className="footer__link-container">
                <a href="https://github.com/sayus2884" target="_blank" className="footer__link">
                <img src={githubLogo}/>
                </a>
              </li>
              <li className="footer__link-container">
                <a href="https://fb.com/" target="_blank" className="footer__link">
                <img src={fbLogo}/>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
