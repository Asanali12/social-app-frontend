import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

import { Routing } from './Routes';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <div className="App">
        <div className="navbar">
          <Link to="user/5">
            Тестовый профиль
          </Link>
          <Link to="/profile">
            Профиль
          </Link>
          <Link to="/friends">
            Друзья
          </Link>
          <Link to="/login">
            Войти
          </Link>
          <Link to="/register">
            Регистрация
          </Link>
        </div>
      <Routing />
    </div>
  );
}

export default App;
