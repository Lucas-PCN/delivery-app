import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogoImage from '../../images/logo.png';

import './style.css';

function Login() {
  const history = useHistory();
  const [errorLogin] = useState(false);

  function handleClick() {
    history.push('/register');
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="info">
          <img src={ LogoImage } alt="LogoImage" />
        </div>
        <div className="form-login">
          <label htmlFor="email">
            <p>Email</p>
            <input
              name="email"
              type="text"
              placeholder="Email"
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="email">
            <p>Senha</p>
            <input
              name="senha"
              type="password"
              placeholder="Senha"
              data-testid="common_login__input-password"
            />
          </label>
          <div className="btn-login">
            <button
              type="button"
              data-testid="common_login__button-login"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={ () => handleClick() }
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </div>
        </div>
      </div>
      <div
        data-testid="common_login__element-invalid-email"
        className={
          (errorLogin === false) ? 'span-error-disable' : 'span-error'
        }
      >
        <h4>Email or senha inválidos</h4>
      </div>
    </div>
  );
}

export default Login;
