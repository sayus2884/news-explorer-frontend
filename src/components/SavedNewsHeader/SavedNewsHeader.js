import React, { useContext } from 'react';
import './SavedNewsHeader.css';

import Navigation from '../Navigation/Navigation';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

function SavedNewsHeader({ news }) {

  const currentUser = useContext(CurrentUserContext);

  const handleTags = () => {
    let keywords = [];

    news.forEach((item) => {
      // Check if keyword exists in keywords array
      if (!keywords.some((word) => word.name === item.keyword)) {
        keywords.push({
          name: item.keyword,
          count: 0
        });
      }

      // Add count to keyword
      keywords.map((word) => {
        if (word.name === item.keyword) {
          word.count += 1
        }
      });
    });

    keywords.sort((a, b) => {
      return b.count - a.count;
    });


    let text = '';

    if (keywords.length < 2 && keywords.length > 0) {
      text = `${keywords[0].name}`
    }

    if (keywords.length < 3 && keywords.length > 1) {
      text = `${keywords[0].name}, ${keywords[1].name}`
    }

    if (keywords.length >= 3 && keywords.length > 1) {
      text = `${keywords[0].name}, ${keywords[1].name}, and ${keywords.length - 2} more`
    }

    return text;
  }

  return (
    <header className="saved-news-header">
      <Navigation isSavedNews={true}/>

      <div className="saved-news-header__container">

        <h3 className="saved-news-header__sub-title">
          Saved Articles
        </h3>

        <h2 className="saved-news-header__title">
          {currentUser.name}, you have saved {news.length} articles
        </h2>
        <p className="saved-news-header__keywords">
          By keywords:
          <span className="saved-news-header__tags"> {handleTags()}</span>
        </p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
