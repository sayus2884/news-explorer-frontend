import './Popup.css';

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, buttonText="Save", children }) {

  function handleSubmit(event){
    onSubmit(event);
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? '' : 'popup_hidden'}`}>

      <div className="popup__overlay"></div>

      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>


          {children}


        <button className="popup__close-button" type="button" aria-label="close" title="close" onClick={onClose}></button>
      </div>

    </div>
  );
}

export default PopupWithForm;
