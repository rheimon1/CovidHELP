import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css';

import logo from '../../assets/logoImg.png';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!')
      alert('Preencha e-mail e senha para continuar!');
    } else {
      try{
        const response = await api.post('session', { email, password });
        
        const { id, name, token } = response.data; 

        localStorage.setItem('userName', name);
        localStorage.setItem('userID', id);

        login(token);
        
        history.push('/profile');
      } catch (err) {
        setError('Houve um problema com o login, verifique suas credenciais.')
        alert('Falha no login, tente novamente');
      }
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Covid"/>
        { error && <p>{error}</p> }
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
          <hr />
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#451269" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      
    </div>
  );
}