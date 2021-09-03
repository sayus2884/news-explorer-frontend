import './NewsCardList.css';

import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ news }) {

  return (
    <div className="news-card-list">
      <ul className="news-card-list__grid">
        {
          news.map((item) => (
            <NewsCard news={item} key={item._id}/>
          ))
        }
      </ul>
    </div>
  );
}

export default NewsCardList;
