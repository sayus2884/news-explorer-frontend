import './Popup.css';

function PopupWithForm({ title, name, isOpen=false, onClose, onSubmit, buttonText="Save", children }) {

  const handleOnClose = (event) => {
    event.preventDefault();
    onClose(event);
  }

  const handleSubmit = (event) => {
    onSubmit(event);
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? '' : 'popup_hidden'}`}>

      <div className="popup__overlay"></div>

      <div className="popup__container">

        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>


            {children}


          <button className="popup__close-button" type="button" aria-label="close" title="close" onClick={handleOnClose}></button>
        </div>
      </div>

    </div>
  );
}

export default PopupWithForm;
