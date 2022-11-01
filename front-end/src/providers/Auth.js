import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import validateEmail from '../ultils/verifyEmail';

export const AuthContext = React.createContext({});

const MAX_PASSWORD = 6;
export function AuthProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [token, setToken] = useState('');
  const [error, setErro] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);

  const context = useMemo(() => ({
    login,
    error,
    token,
    errorMessage,
    buttonDisable,
    setLogin,
    setErro,
    setToken,
    setErrorMessage,
    setButtonDisable,
  }), [
    login,
    error,
    token,
    errorMessage,
    buttonDisable,
  ]);

  useEffect(() => {
    const isValidEmal = validateEmail(login.email);

    if (isValidEmal && login.password.length >= MAX_PASSWORD) {
      setButtonDisable(false);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
