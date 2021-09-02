import React from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'
import SignupPopup from '../SignupPopup/SignupPopup'
import SigninPopup from '../SigninPopup/SigninPopup'

function App() {
  return (
    <div className="page">
      <Switch>

        <Route path="/saved-news" key={document.location.href}>
          <SavedNews/>
        </Route>

        <Route exact path="/" key={document.location.href}>
          <Main/>
        </Route>

      </Switch>

      <SignupPopup/>
      <SigninPopup/>
    </div>
  );
}

export default withRouter(App);
