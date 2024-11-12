import React, { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import '../styles/UserList.css';
import api from '../api';

function UserList({ onEdit, refreshTrigger }) {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/${userIdToDelete}`);
      setShowModal(false);
      setUserIdToDelete(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setUserIdToDelete(null);
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>
      
      <div className="user-header">
        <span>Nome</span>
        <span>CPF</span>
        <span>Idade</span>
        <span>Cargo</span>
        <span>Ações</span>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span>{user.name}</span>
            <span>{user.cpf}</span>
            <span>{user.age}</span>
            <span>{user.role}</span>
            <div className="user-actions">
              <button className="user-button edit-button" onClick={() => onEdit(user)}>Editar</button>
              <button className="user-button delete-button" onClick={() => handleDeleteClick(user.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <ConfirmModal
          message="Tem certeza que deseja excluir este usuário?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default UserList;
