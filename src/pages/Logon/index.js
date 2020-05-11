import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import covidImg from '../../assets/logoImg.png';

export default function Logon() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const response = await api.post('sessions', { email, password });
    
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userEmail', response.data.email);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogin} >
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Seu Email"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />

          <input 
            type="password" 
            placeholder="Sua Senha"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#451269" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={covidImg} alt="Covid"/>
    </div>
  );
}