import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import LogoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
      password,
      confirmPassword
    };

    try {
      const response = await api.post('users', data);

      alert(`Cadastro feito com suceso: ${response.status}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

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
        </section>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome Completo"
              value={name}
              onChange={e => setName(e.target.value)} 
            />


            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input 
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <input 
                placeholder="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              />

              <input 
                placeholder="UF" 
                style={{ width: 80 }}
                value={uf}
                onChange={e => setUf(e.target.value)}
              />
            </div>

            <input
              type="password" 
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <input
              type="password" 
              placeholder="Confirme sua senha"
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
            />

            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  );
}