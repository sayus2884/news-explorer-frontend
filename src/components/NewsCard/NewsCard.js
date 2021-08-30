import './NewsCard.css';

function NewsCard({ news }) {

  console.log(news);

  return (
    <div className="news-card">
      <img src={news.image}/>
      <h3>{news.date}</h3>
      <h2>{news.title}</h2>
      <p>{news.text}</p>

      <figcaption>{news.source}</figcaption>
    </div>
  );
}

export default NewsCard;
