export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

const newsBaseUrl = 'https://newsapi.org/v2'

class Api {

  getNews(q){


    const pageSize = 100;
    const from = new Date()
    from.setDate(from.getDate() - 5);

    const query = this._query({
      q,
      apiKey: process.env.REACT_APP_NEWS_KEY,
      pageSize,
      from: from.toISOString(),
      to: new Date().toISOString()
    });


    const url = newsBaseUrl + `/everything` + query;

    return this._fetch( METHODS.GET, url);
  }

  _query(object){
    const keys = Object.keys(object);
    let query = '?';

    keys.forEach((key) => {
      query += `${key}=${object[key]}&`;
    });


    return query.substring(0, query.length - 1);
  }

  _fetch(method, url, data = {}){

    let options = {
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      }
    }

    if (method !== METHODS.GET && method !== METHODS.DELETE) {
      options = Object.assign(options, { body: JSON.stringify(data) })
    }

    return fetch(url, options)
    .then( res => {

      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    });
  }
}

export default new Api()
