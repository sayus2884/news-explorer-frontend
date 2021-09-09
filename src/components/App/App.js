import React, { useState } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

import './App.css';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';

// import { news as fakeNews } from '../../utils/dummy';
import api from '../../utils/api';

function App() {

  const history = useHistory()
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [news, setNews] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [newsCount, setNewsCount] = useState(3);

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

  const login = () => {
    setIsLoggedIn(true);
    closeAllPopups();
  }

  const register = () => {
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
      setNews(articles);
      const currentNews = [];

      for (let i = 0; i < 3; i++) {
        currentNews.push(articles[i]);
      }

      setCurrentNews(currentNews);
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
      <NavigatorContext.Provider value={{
        openSignInModal,
        openSignUpModal,
        isLoggedIn,
        logout
      }}>
        <Switch>
          <Route path="/saved-news" key={document.location.href}>
            <SavedNews/>
          </Route>

          <Route exact path="/" key={document.location.href}>
            <Main news={currentNews}
            onSearch={search}
            onSearchMore={showMore}
            isSearching={isSearching}
            maxNews={news ? news.length : 0}/>
          </Route>

        </Switch>

        <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
        <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} onSubmit={register}/>
      </NavigatorContext.Provider>
    </div>
  );
}

export default withRouter(App);
