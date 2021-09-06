import React from 'react';
import './SavedNewsHeader.css';

import Navigation from '../Navigation/Navigation';

function SavedNewsHeader() {
  return (
    <header className="saved-news-header">
      <Navigation isSavedNews={true}/>

      <div className="saved-news-header__container">

        <h3 className="saved-news-header__sub-title">
          Saved Articles
        </h3>

        <h2 className="saved-news-header__title">
          Tom, you have saved 5 articles
        </h2>
        <p className="saved-news-header__keywords">
          By keywords:
          <span className="saved-news-header__tags"> Nature, Yellowstone, and 2 other</span>
        </p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
