import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Main/>
        <SavedNews/>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
