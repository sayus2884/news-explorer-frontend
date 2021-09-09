import React from 'react';
import { useState } from 'react';
import './NewsCard.css';
import  moment from 'moment';

function NewsCard({ news, isSavedNews }) {

  const [hideTooltip, setHideTooltip] = useState(true);
  const [tooltipText, setTooltipText] = useState("");

  const handleBookmarkMouseEnter = () => {
    setHideTooltip(false);
    setTooltipText("Sign in to save articles");
  }

  const handleDeleteMouseEnter = () => {
    setHideTooltip(false);
    setTooltipText("Remove from saved");
  }

  const handleMouseLeave = () => {
    setHideTooltip(true);
  }

  const formatDate = (date)=> {
    return moment(date).format('MMMM D, YYYY')
  }

  return (
    <li className="news-card">

      <div className="news-card___actions">
        <div className="news-card___actions-container">

            <p className={`news-card___keyword ${!isSavedNews && 'news-card___keyword_hidden'}`}>{news.keyword}</p>

          <div className="news-card___buttons-container">

            <p className={`news-card___tooltip ${hideTooltip && 'news-card___tooltip_hidden'}`}>{tooltipText}</p>

            { !isSavedNews &&
              <button className="news-card___button button_bookmark"
              onMouseEnter={handleBookmarkMouseEnter}
              onMouseLeave={handleMouseLeave}
              ></button>
            }

            { isSavedNews &&
              <button className="news-card___button button_delete"
              onMouseEnter={handleDeleteMouseEnter}
              onMouseLeave={handleMouseLeave}
              ></button>
            }
          </div>

        </div>
      </div>

      <img className="news-card___image" src={news.urlToImage} alt={news.title}/>
      <div className="news-card___content">
        <h3 className="news-card___date">{formatDate(news.publishedAt)}</h3>
        <h2 className="news-card___title">{news.title}</h2>
        <p className="news-card___text">{news.description}</p>

        <figcaption className="news-card___source">{news.source.name}</figcaption>
      </div>
    </li>
  );
}

export default NewsCard;
