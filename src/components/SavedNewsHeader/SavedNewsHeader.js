import './SavedNewsHeader.css';

import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function SavedNewsHeader() {
  return (
    <header className="header">
      <Navigation />

      <h3 className="header__sub-title">
        Saved Articles
      </h3>

      <h2 className="header__intro-title">
        Tom, you have saved 5 articles
      </h2>
      <p className="header__keywords">
        By keywords:
      </p>
    </header>
  );
}

export default SavedNewsHeader;
