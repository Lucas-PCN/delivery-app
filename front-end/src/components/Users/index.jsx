import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/Auth';

import './style.css';

function Users() {
  const { adminUsers, setAdminUsers } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    const getUsers = async () => {
      const response = await instance.get('/admin/manage').then((res) => res);
      return setAdminUsers(response.data);
    };

    getUsers();
  }, [setAdminUsers]);

  const deleteUser = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    await instance.delete(`/admin/manage/${id}`);

    const response = await instance.get('/admin/manage').then((res) => res);
    return setAdminUsers(response.data);
  };

  return (
    <table className="table-user">
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {adminUsers.map((user, index) => (
          <tr key={ user.id }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {user.id}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {user.role}
            </td>
            <td>
              <button
                className="btn-delete"
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => deleteUser(user.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;
