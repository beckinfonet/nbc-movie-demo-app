import React from 'react';
import './styles.css';

const Modal = ({ handleClose, handleSubmit, show, children, readyToSubmit }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-controls">
          <div onClick={handleClose}>
            <p className="control-btn cancel-btn">Close</p>
          </div>
          <div onClick={readyToSubmit ? handleSubmit : () => {}}>
            <p className={`control-btn ${readyToSubmit ? 'submit-btn' : 'disabled'}`}>Submit</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Modal;