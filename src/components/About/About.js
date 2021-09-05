import React from 'react';
import './About.css';
import author from "../../images/author.png";

function About() {
  return (
    <div className="about">
      <div className="about__columns">
        <div className="about__column">
          <img className="about__image" src={author}/>
        </div>

        <div className="about__column">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
          <p className="about__description">You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
