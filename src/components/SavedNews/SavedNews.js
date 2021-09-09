import React, { useState, useEffect } from 'react';
import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

import { news } from '../../utils/dummy';

import joniahApi from '../../utils/joniahApi';

function SavedNews() {

  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    getSavedNews()
  }, [])

  const getSavedNews = () => {
    return joniahApi.getNews()
    .then((news) => {
      setSavedNews(news);
      console.log(news);
    });
  }

  return (
    <div className="saved-news">
      <SavedNewsHeader/>

      <section className="news-list">

        <NewsCardList news={savedNews} isSavedNews={true}/>

      </section>

      <Footer />
    </div>
  );
}

export default SavedNews;
