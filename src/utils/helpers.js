import { isString } from 'validate.js';

export const toOriginalNewsProps = (news) => {
  return {
    description: news.description ? news.description : news.text,
    publishedAt: news.publishedAt ? news.publishedAt : news.date,
    source: isString(news.source) ? news.source : { name: news.name},
    urlToImage: news.urlToImage ? news.urlToImage : news.image,
    url: news.url ? news.url : news.link,
    title: news.title,
    keyword: news.keyword
  }
}

export const findSavedNews = (article, savedNews) => {
  const news = savedNews.find((savedArticle) => {
    const newSavedArticle = toOriginalNewsProps(savedArticle);
    const titleMatch = newSavedArticle.title === article.title;
    const dateMatch = newSavedArticle.publishedAt === article.publishedAt;

    return titleMatch && dateMatch;
  })


  return news;
}
