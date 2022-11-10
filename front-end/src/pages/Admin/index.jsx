import React, { useContext } from 'react';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Users from '../../components/Users';

import './style.css';
import { AuthContext } from '../../providers/Auth';

function Admin() {
  const { errorCreateAdmin, messageErrorAdminCreate } = useContext(AuthContext);

  return (
    <div className="admin-container">
      <Header />
      <div className="admin-content">
        <div
          className={
            errorCreateAdmin ? 'span-error-type' : 'span-error-type-disable'
          }
        >
          <div className="error">
            <strong
              data-testid="admin_manage__element-invalid-register"
            >
              { messageErrorAdminCreate }

            </strong>
          </div>
        </div>
        <h1>Cadastrar novo usuário</h1>
        <Form />
        <h1>Lista de usuários</h1>
        <Users />
      </div>
    </div>
  );
}

export default Admin;
