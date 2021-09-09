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

  getInitialCards(){
    const url = `${this._baseUrl}/cards`;
    return this._fetch(METHODS.GET, url)
  }

  editUserInfo(data){
    const url = `${this._baseUrl}/users/me`;
    return this._fetch(METHODS.PATCH, url, data)
  }

  addCard(data){
    const url = `${this._baseUrl}/cards`;
    return this._fetch(METHODS.POST, url, data)
  }

  deleteCard(id){
    const url = `${this._baseUrl}/cards/${id}`;
    return this._fetch(METHODS.DELETE, url)
  }

  changeLikeCardStatus(id, isLiked){
    const url = `${this._baseUrl}/cards/${id}/likes`;

    if (isLiked)
      return this._fetch(METHODS.PUT, url)
    else
      return this._fetch(METHODS.DELETE, url)

  }

  updateAvatar(data){
    const url = `${this._baseUrl}/users/me/avatar`;
    return this._fetch(METHODS.PATCH, url, data)
  }

  _fetch(method, url, data = {}){
    const token = localStorage.getItem('jwt');

    console.log('token');
    console.log(token);

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
