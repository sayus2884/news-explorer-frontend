import './SearchForm.css';

function SearchForm() {

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Enter topic"/>
        <button className="search-form__button">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
