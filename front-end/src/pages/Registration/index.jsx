import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// import './style.css';
import { AuthContext } from '../../providers/Auth';

function Registration() {
  const history = useHistory();
  const [errorRegistration, setErrorRegistration] = useState(false);
  const { register, setRegister, setErro, error } = useContext(AuthContext);

  const validationRegister = () => {
    const MIN_PASSWORD = 5;
    const MIN_FULL_NAME = 11;
    const { name, password, email } = register;
    const passwordCheck = password.length > MIN_PASSWORD;
    const fullNameCheck = name.length > MIN_FULL_NAME;
    const emailCheck = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return !(passwordCheck && emailCheck && fullNameCheck);
  };

  const handleClick = () => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', {
        name: register.name,
        email: register.email,
        password: register.password,
      })
      .then((res) => {
        console.log(res);
        history.push('/customer/products');
      })
      .catch((err) => {
        setErro(true);
        setErrorRegistration(err.message);
        document.location.reload();
      });
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <h1>Cadastro</h1>
        <form>
          <label htmlFor="nome">
            <p>Nome</p>
            <input
              name="nome"
              type="text"
              placeholder="Seu nome"
              onChange={
                ({ target }) => setRegister({ ...register, name: target.value })
              }
              value={ register.name }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            <p>Email</p>
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={
                ({ target }) => setRegister({ ...register, email: target.value })
              }
              value={ register.email }
              data-testid="common_register__input-email"
            />
          </label>
          <label htmlFor="email">
            <p>Senha</p>
            <input
              name="senha"
              type="password"
              placeholder="Senha"
              onChange={ ({ target }) => setRegister({
                ...register,
                password: target.value,
              }) }
              value={ register.password }
              data-testid="common_register__input-password"
            />
          </label>
          <div className="btn-cadastro">
            <button
              type="submit"
              disabled={ validationRegister() }
              onClick={ handleClick }
              data-testid="common_register__button-register"
            >
              CADASTRAR
            </button>
          </div>
        </form>
        <div
          data-testid="common_login__element-invalid-register"
          className={ error ? 'span-error' : 'span-error-disable' }
        >
          <h4>{errorRegistration}</h4>
        </div>
      </div>
    </div>
  );
}

export default Registration;
