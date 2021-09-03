import { isDefined } from 'validate.js';

import './Main.css';

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

import Preloader from '../Preloader/Preloader';

function Main({ news, onSearch, isSearching }) {

  return (
    <div className="main">
      <Header onSearch={onSearch}/>

      { isSearching && <Preloader/>}

      { isDefined(news) &&
      <section className="news-list">

        <h2 className="news-list__title">Search results</h2>

        <NewsCardList news={news}/>

        <button className="news-list__button">Show more</button>

      </section>
      }

      <About />
      <Footer />
    </div>
  );
}

export default Main;
