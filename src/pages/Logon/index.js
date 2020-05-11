import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';



export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="Seu Email"/>
          <input type="password" placeholder="Sua Senha"/>

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#451269" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}