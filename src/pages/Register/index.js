import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import LogoImg from '../../assets/logo.svg';

export default function Register() {
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="CovidHelp"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro e entre na plataforma</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#451269" />
            Não tenho cadastro
          </Link>

          <form>
            <input placeholder="Nome Completo"/>
            <input type="email" placeholder="E-mail" />
            <input placeholder="WhatsApp"/>

            <div className="input-group">
              <input placeholder="Cidade" />
              <input placeholder="UF" style={{ width: 80 }} />
            </div>

            <input type="password" placeholder="Senha"/>
            <input type="password" placeholder="Confirme sua senha"/>

            <button className="button" type="submit">Cadastrar</button>
          </form>
        </section>
      </div>
    </div>
  );
}