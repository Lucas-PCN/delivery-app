import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import validateEmail from '../ultils/verifyEmail';
import getCars from '../ultils/localStorage';

export const AuthContext = React.createContext({});

const MAX_NAME = 12;
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
  const [adminUsers, setAdminUsers] = useState([]);
  const [buttonAdminCreateDisable, setButtonAdminCreateDisable] = useState(true);
  const [error, setErro] = useState(false);
  const [errorCreateAdmin, setErrorCreateAdmin] = useState(false);
  const [messageErrorAdminCreate, setMessageErrorAdminCreate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [cart, setCart] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [orderCustomer, setOrderCustomer] = useState([]);

  const [checkout, setCheckout] = useState({
    seller: '',
    sellerId: 1,
    address: '',
    number: '',
    totalPrice: 0,
  });

  const [adminCreateUser, setAdminCreateUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  useEffect(() => {
    const validEmal = validateEmail(adminCreateUser.email);

    if (
      adminCreateUser.name.length >= MAX_NAME
      && adminCreateUser.password.length >= MAX_PASSWORD
      && validEmal) {
      return setButtonAdminCreateDisable(false);
    }
    return setButtonAdminCreateDisable(true);
  }, [adminCreateUser]);

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
    adminUsers,
    adminCreateUser,
    buttonAdminCreateDisable,
    errorCreateAdmin,
    messageErrorAdminCreate,
    pedido,
    orderCustomer,
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
    setAdminUsers,
    setAdminCreateUser,
    setButtonAdminCreateDisable,
    setErrorCreateAdmin,
    setMessageErrorAdminCreate,
    setPedido,
    setOrderCustomer,
  }), [
    pedido,
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
    adminUsers,
    adminCreateUser,
    buttonAdminCreateDisable,
    errorCreateAdmin,
    messageErrorAdminCreate,
    orderCustomer,
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
