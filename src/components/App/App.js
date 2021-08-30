import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
