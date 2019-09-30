import React from 'react';
import ReactDOM from 'react-dom';
import closeIcon from './assets/close-icon.png';

const Modal = ({
 children, onClose, open, modalTitle 
}) => 
(open
  ? ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">
        <div className="modal__content__top">
          <p className="modal__title">{modalTitle}</p>
          <button type="button" onClick={onClose} className="button-menu">
            <img src={closeIcon} className="vertical-menu" alt="close-button" />
          </button>
        </div>
        <div className="modal__content--form">
          {children}
        </div>
      </div>
    </div>,
    document.body
  ) : null);


export default Modal;
