import React from 'react';
import logo from '../../assets/react.svg';
import './header.css';

const Header = ({ userName, onLogout }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{userName ? `Bienvenido, ${userName}` : 'Por favor inicia sesión'}</h1>
      {userName && <button onClick={onLogout}>Salir</button>}
    </header>
  );
};

export default Header;