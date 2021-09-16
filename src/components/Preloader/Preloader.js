import React from 'react';
import './Preloader.css';

function Preloader() {

  return (
    <section className="circle-preloader__container">
      <i className="circle-preloader"></i>
      <p className="circle-preloader__text">Searching for news...</p>
    </section>
  );
}

export default Preloader;
