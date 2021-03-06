import React from 'react';
import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

import { news } from '../../utils/dummy';

function SavedNews() {

  return (
    <div className="saved-news">
      <SavedNewsHeader/>

      <section className="news-list">

        <NewsCardList news={news} isSavedNews={true}/>

      </section>

      <Footer />
    </div>
  );
}

export default SavedNews;
