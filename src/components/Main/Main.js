import React from 'react';
import { isDefined } from 'validate.js';

import './Main.css';

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

import Preloader from '../Preloader/Preloader';

function Main({ news, onSearch, onSearchMore, isSearching, maxNews }) {

  return (
    <div className="main">
      <Header onSearch={onSearch}/>

      { isSearching && <Preloader/>}

      { isDefined(news) &&
      <section className="news-list">

        <h2 className="news-list__title">Search results</h2>

        <NewsCardList news={news} />

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
