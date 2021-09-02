import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'
import SignupPopup from '../SignupPopup/SignupPopup'
import SigninPopup from '../SigninPopup/SigninPopup'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Main/>
        <SavedNews/>

        <SignupPopup/>
        <SigninPopup/>

      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
