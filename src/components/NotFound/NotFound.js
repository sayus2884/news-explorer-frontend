import React from 'react';
import './NotFound.css';

function NotFound() {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__image"></div>
        <h2 className="not-found__title">Nothing found</h2>
        <p className="not-found__subtitle">Sorry, but nothing matched your search terms.</p>
      </div>
    </section>
  );
}

export default NotFound;
