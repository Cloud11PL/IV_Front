import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose, open }) => 
(open
  ? ReactDOM.createPortal(
    <div className="modal">
      <button type="button" onClick={onClose}>Close</button>
      <div className="modal__content">
        {children}
      </div>
    </div>,
    document.body
  ) : null);


export default Modal;
