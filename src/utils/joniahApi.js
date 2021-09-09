export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

const baseUrl = 'https://api.joniah-news.students.nomoreparties.site'

class Api {
  constructor({ baseUrl, token }){
    this._baseUrl = baseUrl;
  }

  getUserInfo(){
    const url = `${this._baseUrl}/users/me`;
    return this._fetch( METHODS.GET, url);
  }

  getNews(data){
    const url = `${this._baseUrl}/articles`;
    return this._fetch( METHODS.GET, url, data);
  }

  saveNews(data){
    const url = `${this._baseUrl}/articles`;
    return this._fetch( METHODS.POST, url, data);
  }

  deleteNews(){
    console.log("delete card");
  }

  _fetch(method, url, data = {}){
    const token = localStorage.getItem('jwt');

    let params = {
      method,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }

    if (method !== METHODS.GET && method !== METHODS.DELETE) {
      params = Object.assign(params, { body: JSON.stringify(data) })
    }

    return fetch(url, params)
    .then( res => {

      if (res.ok) {
        return res.json()
      } else {
        console.log(res);
        return Promise.reject(res.status)
      }
    });
  }
}

export default new Api({ baseUrl })
