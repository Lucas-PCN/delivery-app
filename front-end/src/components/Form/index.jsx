import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';

import './style.css';

function Form() {
  const {
    adminCreateUser,
    setAdminCreateUser,
    buttonAdminCreateDisable,
    setErrorCreateAdmin,
    setMessageErrorAdminCreate,
    setAdminUsers,
  } = useContext(AuthContext);

  const selectOptions = ['customer', 'seller'];

  const createNewUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: { authorization: user.token },
    });

    await instance.post('/admin/manage', adminCreateUser).then(async () => {
      setAdminCreateUser({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
      const responseUsers = await instance.get('/admin/manage').then((res) => res.data);

      return setAdminUsers(responseUsers);
    }).catch((err) => {
      setMessageErrorAdminCreate(err.message);
      return setErrorCreateAdmin(true);
    });
  };

  return (
    <section className="form-user">
      <label htmlFor="nome">
        Nome
        <input
          data-testid="admin_manage__input-name"
          type="text"
          placeholder="Nome"
          name="nome"
          value={ adminCreateUser.name }
          onChange={
            (e) => setAdminCreateUser({ ...adminCreateUser, name: e.target.value })
          }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          data-testid="admin_manage__input-email"
          type="text"
          name="email"
          placeholder="E-mail"
          value={ adminCreateUser.email }
          onChange={
            (e) => setAdminCreateUser({ ...adminCreateUser, email: e.target.value })
          }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="admin_manage__input-password"
          type="text"
          name="password"
          placeholder="Password"
          value={ adminCreateUser.password }
          onChange={
            (e) => setAdminCreateUser({ ...adminCreateUser, password: e.target.value })
          }
        />
      </label>
      <label htmlFor="role">
        Tipo
        <select
          data-testid="admin_manage__select-role"
          name="role"
          onChange={
            (e) => setAdminCreateUser({ ...adminCreateUser, role: e.target.value })
          }
        >
          {selectOptions.map((opt) => (
            <option key={ opt } value={ opt }>{opt}</option>
          ))}
        </select>
      </label>
      <button
        className={
          (buttonAdminCreateDisable) ? 'btn-create-desability' : 'btn-create-ability'
        }
        data-testid="admin_manage__button-register"
        disabled={ buttonAdminCreateDisable }
        type="button"
        onClick={ () => createNewUser() }
      >
        Cadastrar

      </button>
    </section>
  );
}

export default Form;
