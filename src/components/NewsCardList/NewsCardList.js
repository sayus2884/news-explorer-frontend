import React from 'react';
import './NewsCardList.css';

import NewsCard from '../NewsCard/NewsCard';
import { isSavedNews } from '../../utils/helpers';

function NewsCardList({ news, isSavedNewsHeader=false, onBookmarkClick=()=>{}, onDeleteNews=()=>{}, savedNews=[] }) {

  return (
    <div className="news-card-list">
      <ul className="news-card-list__grid">
        {
          news.map((article, i) => {

            return (
            <NewsCard
            news={article}
            isSavedNews={isSavedNews(article, savedNews)}
            isSavedNewsHeader={isSavedNewsHeader}
            onDeleteNews={onDeleteNews}
            onBookmarkClick={onBookmarkClick}
            key={i}/>
          )})
        }
      </ul>
    </div>
  );
}

export default NewsCardList;
