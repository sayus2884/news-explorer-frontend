import React, { useState } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

import './App.css';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';

import { news as fakeNews } from '../../utils/dummy';

function App() {

  const history = useHistory()
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [news, setNews] = useState(null);

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

  const login = (event) => {
    setIsLoggedIn(true);
    closeAllPopups();
  }

  const register = (event) => {
    closeAllPopups();
  }

  const logout = (event) => {
    setIsLoggedIn(false);
    history.push('/');
  }

  const search = (keyword) => {
    setIsSearching(true);
    setTimeout(function(){
      setIsSearching(false);
      setNews(fakeNews);
    }, 1000);
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
            <Main news={news} onSearch={search} isSearching={isSearching}/>
          </Route>

        </Switch>

        <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
        <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} onSubmit={register}/>
      </NavigatorContext.Provider>
    </div>
  );
}

export default withRouter(App);
