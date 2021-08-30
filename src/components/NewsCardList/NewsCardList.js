import './NewsCardList.css';

import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ news }) {

  return (
    <div className="news-card-list">
      <ul className="news-card-list__grid">
        {
          news.map((item) => (
            <NewsCard news={item}/>
          ))
        }
      </ul>
    </div>
  );
}

export default NewsCardList;
