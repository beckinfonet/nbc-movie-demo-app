import React from 'react';
import './styles.css';

const Modal = ({ handleClose, handleSubmit, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </section>
    </div>
  );
};

export default Modal;