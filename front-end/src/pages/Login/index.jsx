import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LogoImage from '../../images/logo.png';
import { AuthContext } from '../../providers/Auth';
import './style.css';

function Login() {
  const history = useHistory();
  const { login, setLogin, error } = useContext(AuthContext);

  function handleClick() {
    history.push('/register');
  }

  // function handleSubmit() {

  // }

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
              onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="email">
            <p>Senha</p>
            <input
              name="senha"
              type="text"
              placeholder="Senha"
              onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
              data-testid="common_login__input-password"
            />
          </label>
          <div className="btn-login">
            <button
              type="button"
              onClick={ () => handleSubmit() }
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
        className={ (error === false) ? 'span-error-disable' : 'span-error' }
      >
        <h4>Email or senha inválidos</h4>
      </div>
    </div>
  );
}

export default Login;
