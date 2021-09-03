import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import { NavigatorContext } from '../../contexts/NavigatorContext.js'

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignupPopup from '../SignupPopup/SignupPopup';
import SigninPopup from '../SigninPopup/SigninPopup';

function App() {

  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
  }

  const logout = (event) => {
    setIsLoggedIn(false);
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
            <Main/>
          </Route>

        </Switch>

        <SigninPopup isOpen={isSigninPopupOpen} onClose={closeAllPopups} onSubmit={login}/>
        <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups}/>
      </NavigatorContext.Provider>
    </div>
  );
}

export default withRouter(App);
