import './Main.css';

import Header from '../Header/Header'
import NewsCardList from '../NewsCardList/NewsCardList'
import About from '../About/About'
import Footer from '../Footer/Footer'

function Main() {
  const news = [{
    "keyword": "test",
    "title": "Test",
    "text": "This is a another test.",
    "date": "Yesterday",
    "source": "Pinteres",
    "link": "https://www.pinterest.ca/pin/4011087161611097/",
    "image": "https://i.pinimg.com/564x/3e/a0/e7/3ea0e76a34ce151d87d728a85cfb406f.jpg"
  },{
    "keyword": "test",
    "title": "Test",
    "text": "This is a another test.",
    "date": "Yesterday",
    "source": "Pinteres",
    "link": "https://www.pinterest.ca/pin/4011087161611097/",
    "image": "https://i.pinimg.com/564x/3e/a0/e7/3ea0e76a34ce151d87d728a85cfb406f.jpg"
  }]

  return (
    <div className="main">
      <Header/>

      <section className="news-list">

        <h2 className="news-list__title">Search results</h2>

        <NewsCardList news={news}/>

        <button className="news-list__button">Show more</button>

      </section>

      <About />
      <Footer />
    </div>
  );
}

export default Main;
