import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LogoImage from '../../images/logo.png';
import IconEmail from '../../images/icons/mail.svg';
import IconUser from '../../images/icons/user.svg';
import IconLok from '../../images/icons/lock.svg';

import './style.css';
import { AuthContext } from '../../providers/Auth';

function Registration() {
  const history = useHistory();

  const {
    register,
    setRegister,
    errroRegister,
    setErrorRegister,
    errroRegisterMessage,
    setErrorRegisterMessage,
  } = useContext(AuthContext);

  const validationRegister = () => {
    const MIN_PASSWORD = 5;
    const MIN_FULL_NAME = 11;
    const { name, password, email } = register;
    const passwordCheck = password.length > MIN_PASSWORD;
    const fullNameCheck = name.length > MIN_FULL_NAME;
    const emailCheck = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return !(passwordCheck && emailCheck && fullNameCheck);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', {
        name: register.name,
        email: register.email,
        password: register.password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data));
        history.push('/customer/products');
      })
      .catch((err) => {
        setErrorRegister(true);
        setErrorRegisterMessage(err.message);
        // document.location.reload();
      });
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <div className="info">
          <img src={ LogoImage } alt="LogoImage" />
          <div className="form-description">
            <h2>Faça o seu cadastro de forma rápida e fácil.</h2>
          </div>
        </div>
        <form className="form-register">
          <label htmlFor="nome">
            <img src={ IconUser } alt="Icon User" />
            <input
              name="nome"
              type="text"
              placeholder="Nome completo"
              onChange={
                ({ target }) => setRegister({ ...register, name: target.value })
              }
              value={ register.name }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            <img src={ IconEmail } alt="Icon Email" />
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
            <img src={ IconLok } alt="Icon Password" />
            <input
              name="senha"
              type="password"
              placeholder="+5 senha"
              onChange={ ({ target }) => setRegister({
                ...register,
                password: target.value,
              }) }
              value={ register.password }
              data-testid="common_register__input-password"
            />
          </label>
          <div className="btn-create">
            <button
              type="submit"
              disabled={ validationRegister() }
              onClick={ handleClick }
              data-testid="common_register__button-register"
            >
              Cadastro
            </button>
          </div>
        </form>
      </div>
      <div
        data-testid="common_register__element-invalid_register"
        className={ errroRegister ? 'span-error' : 'span-error-disable' }
      >
        <h4>
          {errroRegisterMessage}
        </h4>
      </div>
    </div>
  );
}

export default Registration;
