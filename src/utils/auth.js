import { METHODS } from './MainApi';

const baseUrl = 'https://api.joniah-news.students.nomoreparties.site'
// const baseUrl = 'http://localhost:8080';
function _fetch(method, url,
  data = {},
  headers = { 'Content-Type': 'application/json' },
  credentials = '') {
  let params = {
    method,
    headers,
  };

  if (method !== METHODS.GET && method !== METHODS.DELETE) {
    params = Object.assign(params, { body: JSON.stringify(data) });
  }

  return fetch(url, params)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(res);
    });
}

export const register = (email, password, name) => {
  const url = `${baseUrl}/signup`;
  return _fetch(METHODS.POST, url, { email, password, name })
    .then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(res);
    });
}

export const authorize = (email, password) => {
  const url = `${baseUrl}/signin`;

  return _fetch(METHODS.POST, url, { email, password }, { 'Content-Type': 'application/json' }, 'include')
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        return res;
      }
    })
};

export const checkToken = (jwt) => {
  const url = `${baseUrl}/users/me`;

  return _fetch(METHODS.GET, url, {}, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      }
    })
};
