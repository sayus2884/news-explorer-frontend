import React from 'react';
import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ savedNews, onDeleteNews }) {

  return (
    <section className="saved-news">
      <SavedNewsHeader news={savedNews}/>

      <div className="news-list">

        <NewsCardList news={savedNews} isSavedNewsHeader={true} onDeleteNews={onDeleteNews}/>

      </div>
    </section>
  );
}

export default SavedNews;
