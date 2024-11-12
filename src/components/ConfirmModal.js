import React from 'react';
import '../styles/ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Confirmar</button>
          <button onClick={onCancel} className="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;