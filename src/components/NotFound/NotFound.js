import React from 'react';
import './NotFound.css';

function NotFound({ title, description }) {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__image"></div>
        <h2 className="not-found__title">{title}</h2>
        <p className="not-found__subtitle">{description}</p>
      </div>
    </section>
  );
}

export default NotFound;
