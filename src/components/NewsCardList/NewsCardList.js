import './NewsCardList.css';

import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ news, isSavedNews=false }) {

  return (
    <div className="news-card-list">
      <ul className="news-card-list__grid">
        {
          news.map((item) => (
            <NewsCard
            news={item}
            isSavedNews={isSavedNews}
            key={item._id}/>
          ))
        }
      </ul>
    </div>
  );
}

export default NewsCardList;
