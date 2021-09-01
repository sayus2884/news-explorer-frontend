import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import NewsCardList from '../NewsCardList/NewsCardList'
import Footer from '../Footer/Footer'

function SavedNews() {

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
    <div className="saved-news">
      <SavedNewsHeader/>

      <section className="news-list">

        <NewsCardList news={news}/>

      </section>

      <Footer />
    </div>
  );
}

export default SavedNews;
