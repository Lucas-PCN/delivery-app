import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import validateEmail from '../ultils/verifyEmail';
import getCars from '../ultils/localStorage';

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
  });

  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [sellers, setSellers] = useState([]);

  const [error, setErro] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState({
    seller: '',
    sellerId: 1,
    address: '',
    number: '',
    totalPrice: 0,
  });

  console.log('passou por aqui', cart);
  useEffect(() => {
    const onLoadPage = () => {
      const products = getCars();
      setCart(products);
    };
    onLoadPage();
  }, []);

  const context = useMemo(() => ({
    login,
    error,
    token,
    user,
    errorMessage,
    buttonDisable,
    cart,
    register,
    sellers,
    checkout,
    setLogin,
    setErro,
    setToken,
    setErrorMessage,
    setButtonDisable,
    setRegister,
    setCart,
    setCheckout,
    setUser,
    setSellers,
  }), [
    login,
    error,
    token,
    errorMessage,
    buttonDisable,
    register,
    cart,
    checkout,
    user,
    sellers,
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
