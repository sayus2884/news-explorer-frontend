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
import SuccessTooltip from '../SuccessTooltip/SuccessTooltip';

import { news as fakeNews } from '../../utils/dummy';
import api from '../../utils/api';
import joniahApi from '../../utils/joniahApi';

import { findSavedNews } from '../../utils/helpers';

function App() {

  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [news, setNews] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [savedNews, setSavedNews] = useState([]);
  const [newsCount, setNewsCount] = useState(3);

  useEffect(() => {
    resetSearch();
    tokenCheck();

    if (localStorage.getItem("news")) {

      const articles = JSON.parse(localStorage.getItem("news"));
      const currentNews = [];

      for (let i = 0; i < 3; i++) {
        currentNews.push(articles[i]);
      }

      setNews(articles);
      setCurrentNews(currentNews);

      initSavedNews();
    }

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
    setIsTooltipOpen(false);
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
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err);
    });

  }

  const signup = (email, password, username) => {

    register(email, password, username)

    .then((res) => {
      if (res) {
        closeAllPopups();
        setIsTooltipOpen(true);
      }
    })

    .catch((err) => {
      console.log(err);
    });

  }

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
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

      setNews(articles);
      setCurrentNews(currentNews);
      localStorage.setItem('news', JSON.stringify(articles));
      localStorage.setItem('keyword', query);
    })

    .then()

    .catch((err) => {
      console.error(err);
    })

    .finally(() => {
      resetSearch();
    });
  }

  const resetSearch = () => {
    setNewsCount(3);
    setIsSearching(false);
  }

  const showMore = () => {
    let count = newsCount + 3;
    const currentNews = [];

    setNewsCount(count);


    if (count >= news.length) {
      count = news.length;
    }

    for (let i = 0; i < count; i++) {
      currentNews.push(news[i]);
    }

    setCurrentNews(currentNews);
  }

  const initSavedNews = () => {
    return joniahApi.getNews()
    .then((savedNews) => {
      setSavedNews(savedNews);
      return savedNews;
    })

    .catch((err) =>{
      console.error(`Status code: ${err}.`)
    });
  }

  const saveNews = (news) =>{
    const { title, urlToImage, publishedAt, description, source, url} = news;
    const keyword = localStorage.getItem("keyword");

    if (currentUser) {
      joniahApi.saveNews({
        keyword,
        title,
        text: description,
        date: publishedAt,
        source: source.name,
        link: url,
        image: urlToImage
      })

      .then((article) => {
        const newSavedNews = [...savedNews, article]
        setSavedNews(newSavedNews);
      })

      .catch(err => console.log(err));
    }
  }

  const deleteSavedNews = (news) => {
    console.log(news);
    return joniahApi.deleteNews(news._id)
    .then((res) => {
      setSavedNews((state) => state.filter((n) => n._id !== news._id));
    })

    .catch((err) =>{
      console.error(`Status code: ${err}.`)
    });
  }

  const toggleBookmark = (news) => {
    const savedArticle = findSavedNews(news, savedNews);

    if (savedArticle) {
      deleteSavedNews(savedArticle);
    } else {
      saveNews(news);
    }
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
              <SavedNews
              savedNews={savedNews}
              onMount={initSavedNews}
              onDeleteNews={deleteSavedNews}/>
            </ProtectedRoute>

            <Route exact path="/" key={document.location.href}>
              <Main news={currentNews}
              savedNews={savedNews}
              onSearch={search}
              onSearchMore={showMore}
              onBookmarkClick={toggleBookmark}
              isSearching={isSearching}
              maxNews={news ? news.length : 0}/>
            </Route>

          </Switch>

          <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
          <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} onSubmit={signup}/>
          <SuccessTooltip isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            openSignInModal={openSignInModal}/>
        </NavigatorContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
