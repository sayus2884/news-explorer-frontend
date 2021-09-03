import './Header.css';

import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header({ onSearch }) {
  return (
    <header className="header">
        <Navigation />

        <div className="header__container">
          <h1 className="header__title">
            What's going on in the world?
          </h1>
          <p className="header__sub-title">
            Find the latest news on any topic and save them in your personal account.
          </p>

          <SearchForm onSearch={onSearch}/>
      </div>
    </header>
  );
}

export default Header;
