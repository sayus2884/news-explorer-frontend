import './Header.css';

import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header() {
  return (
    <header className="header">
      <Navigation />

      <h1>
        What's going on in the world?
      </h1>
      <p>
        Find the latest news on any topic and save them in your personal account.
      </p>

      <SearchForm />
    </header>
  );
}

export default Header;
