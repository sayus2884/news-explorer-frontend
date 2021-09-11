import React from 'react';
import { isDefined } from 'validate.js';

import './Main.css';

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

function Main({ news, onSearch, onSearchMore, onBookmarkClick, isSearching, maxNews, savedNews, isFetchingError, totalResults }) {

  const allNews = localStorage.getItem("news") ? localStorage.getItem("news").length : 0;

  return (
    <div className="main">
      <Header onSearch={onSearch}/>

      { isSearching && <Preloader/>}


      { isDefined(news) && news.length === 0 &&
        <NotFound
          title="Nothing found"
          description="Sorry, but nothing matched your search terms."
          />
      }

      { isFetchingError &&
        <NotFound
          title="Server Error"
          description="Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          />
      }

      { isDefined(news) && news.length > 0 &&
      <section className="news-list">

        <h2 className="news-list__title">{totalResults} Search results</h2>

        <NewsCardList news={news} savedNews={savedNews} onBookmarkClick={onBookmarkClick}/>

        { (news.length < maxNews) &&
          <button className="news-list__button" onClick={onSearchMore}>Show more</button>
        }

      </section>
      }

      <About />
      <Footer />
    </div>
  );
}

export default Main;
