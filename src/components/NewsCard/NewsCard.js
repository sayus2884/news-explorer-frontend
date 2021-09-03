import './NewsCard.css';

function NewsCard({ news }) {

  return (
    <div className="news-card">
      <img className="news-card___image" src={news.image}/>
      <div className="news-card___content">
        <h3 className="news-card___date">{news.date}</h3>
        <h2 className="news-card___title">{news.title}</h2>
        <p className="news-card___text">{news.text}</p>

        <figcaption className="news-card___source">{news.source}</figcaption>
      </div>
    </div>
  );
}

export default NewsCard;
