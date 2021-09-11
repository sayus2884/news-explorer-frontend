import React, {useContext} from 'react';
import { useState } from 'react';
import './NewsCard.css';
import  moment from 'moment';
import { isString } from 'validate.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

import joniahApi from '../../utils/joniahApi';

function NewsCard({ news, isSavedNewsHeader, isSavedNews, onDeleteNews, onBookmarkClick }) {

  const [hideTooltip, setHideTooltip] = useState(true);
  const [tooltipText, setTooltipText] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const handleBookmarkMouseEnter = () => {
    if (!currentUser) {
      setHideTooltip(false);
      setTooltipText("Sign in to save articles");
    }
  }

  const handleDeleteMouseEnter = () => {
    setHideTooltip(false);
    setTooltipText("Remove from saved");
  }

  const handleMouseLeave = () => {
    setHideTooltip(true);
  }

  const handleBookmarkClick = (event) =>{
    event.preventDefault();
    onBookmarkClick(news);
  }

  const handleDeleteClick = (event) => {
    event.preventDefault();
    onDeleteNews(news);
  }

  const formatDate = (date)=> {
    return moment(date).format('MMMM D, YYYY')
  }

  const reconstructedNews = (news) => {
    return {
      description: news.description ? news.description : news.text,
      publishedAt: news.publishedAt ? news.publishedAt : news.date,
      source: isString(news.source) ? news.source : { name: news.name},
      urlToImage: news.urlToImage ? news.urlToImage : news.image,
      url: news.url ? news.url : news.link,
      ...news
    }
  }

  const newNews = reconstructedNews(news);

  return (
    <li className="news-card">

      <div className="news-card___actions">
        <div className="news-card___actions-container">

            <p className={`news-card___keyword ${!isSavedNewsHeader && 'news-card___keyword_hidden'}`}>{newNews.keyword}</p>

          <div className="news-card___buttons-container">

            <p className={`news-card___tooltip ${hideTooltip && 'news-card___tooltip_hidden'}`}>{tooltipText}</p>

            { !isSavedNewsHeader &&
              <button className={`news-card___button button_bookmark ${ isSavedNews && 'button_bookmark_active'}`}
              onMouseEnter={handleBookmarkMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleBookmarkClick}
              ></button>
            }

            { isSavedNewsHeader &&
              <button className="news-card___button button_delete"
              onMouseEnter={handleDeleteMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDeleteClick}
              ></button>
            }
          </div>

        </div>
      </div>

      <img className="news-card___image" src={newNews.urlToImage} alt={newNews.title}/>
      <div className="news-card___content">
        <h3 className="news-card___date">{formatDate(newNews.publishedAt)}</h3>
        <h2 className="news-card___title">
          <a className="news-card___link" href={newNews.url} target="_blank" rel="noreferrer">
            {newNews.title}
          </a>
        </h2>
        <p className="news-card___text">{newNews.description}</p>

        <figcaption className="news-card___source">{newNews.source.name}</figcaption>
      </div>
    </li>
  );
}

export default NewsCard;
