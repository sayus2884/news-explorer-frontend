import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory, useLocation } from 'react-router-dom';

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

import Footer from '../Footer/Footer';

import newsAPI from '../../utils/NewsAPI';
import mainApi from '../../utils/MainApi';

import { findSavedNews, capitalizeFirstLetter } from '../../utils/helpers';

function App() {

  const history = useHistory()
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetchingError, setIsFetchingError] = useState(false);
  const [news, setNews] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentNews, setCurrentNews] = useState(null);
  const [savedNews, setSavedNews] = useState([]);
  const [newsCount, setNewsCount] = useState(3);

  useEffect(() => {
    tokenCheck().
    then((user) => {

      resetSearch();

      if (localStorage.getItem("news")) {

        const articles = JSON.parse(localStorage.getItem("news"));
        const currentNews = [];

        for (let i = 0; i < 3; i++) {
          currentNews.push(articles[i]);
        }

        setNews(articles);
        setCurrentNews(currentNews);

        if (user) {
          initSavedNews();
        }
      }
    })

  }, [])

  const tokenCheck = () => {
    const path = location.pathname;

    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem('jwt');
      return checkToken(jwt)
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
          history.push(path);

          return user
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }

    return Promise.resolve(false);
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

  const login = (email, password, onError) => {

    return authorize(email, password)
    .then((res) => {
      if (res.token) {
        setIsLoggedIn(true);
      }
    })

    .then(() => mainApi.getUserInfo())

    .then((res) => {
      if (res) {
        setCurrentUser(res);
        setIsLoggedIn(true);
        closeAllPopups();
        initSavedNews();
      }
    })

    .catch((err) => {
      err.text()
      .then((res) => {
        const message = JSON.parse(res).message;
        onError(message);
      })
    });

  }

  const signup = (email, password, username, onError) => {

    return register(email, password, username)

    .then((res) => {
      if (res) {
        closeAllPopups();
        setIsTooltipOpen(true);
      }
    })

    .catch((err) => {
      err.text()
      .then((res) => {
        const message = JSON.parse(res).message;
        onError(message);
      })
    });

  }

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    history.push('/');
    setSavedNews([]);
  }

  const search = (query) => {
    setIsSearching(true);
    setTotalResults(0);
    setIsFetchingError(false);
    newsAPI.getNews(query)

    .then(({ articles, totalResults }) => {

      const currentNews = [];

      for (let i = 0; i < 3; i++) {
        currentNews.push(articles[i]);
      }

      setNews(articles);
      setTotalResults(totalResults);
      setCurrentNews(currentNews);
      localStorage.setItem('news', JSON.stringify(articles));
      localStorage.setItem('keyword', query ? capitalizeFirstLetter(query) : '');
    })

    .catch((err) => {
      setIsFetchingError(true);
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
    return mainApi.getNews()
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
      mainApi.saveNews({
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
    return mainApi.deleteNews(news._id)
    .then(() => {
      setSavedNews((state) => state.filter((n) => n._id !== news._id));
    })

    .catch((err) =>{
      console.error(`Status code: ${err}.`)
    });
  }

  const toggleBookmark = (news) => {
    const savedArticle = findSavedNews(news, savedNews);

    if (!isLoggedIn) {
      openSignInModal();
    } else {
      if (savedArticle) {
        deleteSavedNews(savedArticle);
      } else {
        saveNews(news);
      }
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
              onDeleteNews={deleteSavedNews}
              isFetchingError={isFetchingError}/>
            </ProtectedRoute>

            <Route exact path="/" key={document.location.href}>
              <Main news={currentNews}
              savedNews={savedNews}
              totalResults={totalResults}
              onSearch={search}
              onSearchMore={showMore}
              onBookmarkClick={toggleBookmark}
              isSearching={isSearching}
              maxNews={news ? news.length : 0}
              isFetchingError={isFetchingError}/>
            </Route>

          </Switch>

          <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
          <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} onSubmit={signup}/>
          <SuccessTooltip isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            openSignInModal={openSignInModal}/>

          <Footer />

        </NavigatorContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
