import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <input className="search-formform__input" placeholder="Enter topic"/>
        <button>Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
