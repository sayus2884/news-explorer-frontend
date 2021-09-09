import React from 'react';
import './NewsCardList.css';

import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ news, isSavedNews=false }) {


  return (
    <div className="news-card-list">
      <ul className="news-card-list__grid">
        {
          news.map((item, i) => (
            <NewsCard
            news={item}
            isSavedNews={isSavedNews}
            key={i}/>
          ))
        }
      </ul>
    </div>
  );
}

export default NewsCardList;
