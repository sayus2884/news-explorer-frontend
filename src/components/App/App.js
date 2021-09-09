import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

import './App.css';

import { checkToken, authorize, register } from '../../utils/auth';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { news as fakeNews } from '../../utils/dummy';
import api from '../../utils/api';
import joniahApi from '../../utils/joniahApi';

function App() {

  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [news, setNews] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [newsCount, setNewsCount] = useState(3);

  useEffect(() => {
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt)
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }

  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
  }

  const openSignInModal = () => {
    closeAllPopups();
    setIsSigninPopupOpen(true);
  }

  const openSignUpModal = () => {
    closeAllPopups();
    setIsSignupPopupOpen(true);
  }

  const login = (email, password) => {

    console.log(email, password);

    authorize(email, password)
    .then((res) => {
      if (res.token) {
        setIsLoggedIn(true);
      }
    })

    .then(() => joniahApi.getUserInfo())

    .then((res) => {
      setCurrentUser(res);
      setIsLoggedIn(true);
    })

    .catch((err) => {
      console.log(err);
      console.log("set tooltip fail");
    })

    .finally(() => closeAllPopups());
  }

  const signup = (email, password, username) => {

    register(email, password, username)

    .then((res) => {
      if (res) {
        console.log("set tooltip");
      }
    })

    .catch(() => {
      console.log("set tooltip fail");
    });

    closeAllPopups();
  }

  const logout = () => {
    setIsLoggedIn(false);
    history.push('/');
  }

  const search = (query) => {
    setIsSearching(true);
    api.getNews(query)

    .then(({ articles }) => {

      const currentNews = [];

      for (let i = 0; i < 3; i++) {
        currentNews.push(articles[i]);
      }

      setNews(currentNews);

    })

    .catch(() => {
      setNews(fakeNews);
    })

    .finally(() => {
      setIsSearching(false);
    });
  }

  const showMore = () => {
    let count = newsCount + 3;
    const currentNews = [];

    setNewsCount(count)

    if (count >= news.length) {
      count = news.length;
    }

    for (let i = 0; i < count; i++) {
      currentNews.push(news[i]);
    }

    setCurrentNews(currentNews);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>
        <NavigatorContext.Provider value={{
          openSignInModal,
          openSignUpModal,
          isLoggedIn,
          logout
        }}>
          <Switch>
            <ProtectedRoute path="/saved-news" key={document.location.href} loggedIn={isLoggedIn}>
              <SavedNews/>
            </ProtectedRoute>

            <Route exact path="/" key={document.location.href}>
              <Main news={news}
              onSearch={search}
              onSearchMore={showMore}
              isSearching={isSearching}
              maxNews={news ? news.length : 0}/>
            </Route>

          </Switch>

          <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
          <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} onSubmit={signup}/>
        </NavigatorContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
