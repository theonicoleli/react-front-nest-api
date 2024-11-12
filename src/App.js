// src/App.js
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSave = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gerenciamento de Usuários</h1>
      <UserForm
        selectedUser={selectedUser}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <UserList 
        onEdit={handleEdit} 
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default App;
