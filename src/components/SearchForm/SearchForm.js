import React from 'react';
import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {

  const [keyword, setKeyword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    onSearch(keyword);
  }

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  }

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Enter topic" onChange={handleSearchChange}/>
        <button className="search-form__button" type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
