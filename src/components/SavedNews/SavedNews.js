import React, { useState, useEffect } from 'react';
import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

import { news } from '../../utils/dummy';

function SavedNews({ onMount, savedNews, onDeleteNews }) {

  useEffect(() => {
    onMount()
  }, [])

  return (
    <div className="saved-news">
      <SavedNewsHeader news={savedNews}/>

      <section className="news-list">

        <NewsCardList news={savedNews} isSavedNewsHeader={true} onDeleteNews={onDeleteNews}/>

      </section>

      <Footer />
    </div>
  );
}

export default SavedNews;
