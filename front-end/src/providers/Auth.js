import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({});

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

  const [error, setErro] = useState(false);

  const context = useMemo(() => ({
    login,
    error,
    setLogin,
    setErro,
    register,
    setRegister,
  }), [login, error, register]);

  console.log(login);
  return (
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
