import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LogoImage from '../../images/logo.png';
import { AuthContext } from '../../providers/Auth';

import IconEmail from '../../images/icons/mail.svg';
import IconUser from '../../images/icons/user.svg';

import './style.css';

function Login() {
  const history = useHistory();

  const {
    login,
    setLogin,
    error,
    buttonDisable,
    setErro,
    setToken,
    errorMessage,
    setErrorMessage,
  } = useContext(AuthContext);

  function handleRegister() {
    history.push('/register');
  }

  function handleSubmit() {
    axios.post('http://localhost:3001/login', {
      email: login.email,
      password: login.password,
    }).then((res) => {
      setToken(res.data.token);
      history.push('/customer/products');
    }).catch((err) => {
      setErro(true);
      setErrorMessage(err.message);
    });
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="info">
          <img src={ LogoImage } alt="LogoImage" />
        </div>
        <div className="form-login">
          <label htmlFor="email">
            <img src={ IconEmail } alt="Icon Email" />
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="email">
            <img src={ IconUser } alt="Icon User" />
            <input
              name="senha"
              type="password"
              placeholder="Senha"
              onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
              data-testid="common_login__input-password"
            />
          </label>
          <div className="btn-login">
            <button
              type="button"
              onClick={ () => handleSubmit() }
              disabled={ buttonDisable }
              data-testid="common_login__button-login"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={ () => handleRegister() }
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </div>
        </div>
      </div>
      <div
        data-testid="common_login__element-invalid-email"
        className={ (error === false) ? 'span-error-disable' : 'span-error' }
      >
        <h4>{ errorMessage }</h4>
      </div>
    </div>
  );
}

export default Login;
