import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/UserForm.css';

function UserForm({ selectedUser, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || '');
      setCpf(selectedUser.cpf || '');
      setAge(selectedUser.age || '');
      setRole(selectedUser.role || '');
      setErrorMessage('');
    } else {
      setName('');
      setCpf('');
      setAge('');
      setRole('');
      setErrorMessage('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, cpf, age: parseInt(age), role };

    try {
      if (selectedUser) {
        await api.put(`/${selectedUser.id}`, userData);
      } else {
        await api.post('/', userData);
      }
      setErrorMessage('');
      onSave();
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage('CPF já cadastrado');
      } else {
        console.error('Erro ao salvar usuário:', error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{selectedUser ? 'Editar Usuário' : 'Criar Usuário'}</h2>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="form-input"
      />

      <input
        type="text"
        placeholder="CPF (11 dígitos)"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
        pattern="\d{11}"
        title="CPF deve conter exatamente 11 dígitos"
        className="form-input"
      />

      <input
        type="number"
        placeholder="Idade"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        min="0"
        className="form-input"
      />

      <input
        type="text"
        placeholder="Cargo"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="form-input"
      />

      <button type="submit" className="form-button">Salvar</button>
      <button type="button" onClick={onCancel} className="form-button cancel-button">Cancelar</button>
    </form>
  );
}

export default UserForm;
