import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logoImg.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cities, setCities] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const history = useHistory();

  function handleSelectUf(event) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    axios
    .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response => {
      const cityNames = response.data.map(city => city.nome);
        
      setCities(cityNames);
    })
  }, [selectedUf])

  async function handleRegister(e) {
    e.preventDefault();
    
    const data = {
      name,
      email,
      password,
      confirmPassword,
      whatsapp,
      city: selectedCity,
      uf: selectedUf,
    };

    if (!name || !email || !whatsapp  || !password || !confirmPassword) {
      setError('Preencha todos os dados para continuar!');
      alert('Preencha todos os dados para continuar!');
    } else {
      try {
        await api.post('users', data)
        alert('Cadastro feito com sucesso!');
        history.push('/');
      } catch (error) {
        alert("Falha no cadastro, tente novamente.")
        history.push('/register')
      }
    }
    
  }

  return (
    <div className="register-container">
      <section className="form">
        <img src={logo} alt="Covid"/>
        <form onSubmit={handleRegister}>
          <h1>Faça seu cadastro e entre na plataforma</h1>

          { error && <p>{error}</p> }
          <fieldset>
            <div className="field">
              
              <input
                name="name"
                type="text"
                placeholder="Nome Completo"
                value={name} 
                id="name"
                onChange={e => setName(e.target.value)} />
            </div>

            <div className="field-group">
            <div className="field">
              <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="field">
              <input 
                type="text"
                placeholder="WhatsApp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)} 
              />
            </div>
            </div>
            <div className="field-group">
              <div className="field">
                <select
                  id="uf" 
                  value={selectedUf} 
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <select 
                    name="city" 
                    id="city"
                    value={selectedCity}
                    onChange={handleSelectCity}
                  >
                    <option value="0">Selecione uma cidade</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <input 
                  type="password" 
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="field">
                <input 
                  type="password" 
                  placeholder="Confirme sua senha"
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                />
              </div>
            </div>
          </fieldset>
          <div className="field-button">
            <button type="submit" >Cadastrar</button>
          </div>
          <hr />
          <Link className="back-link" to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>             
        </form>  
      </section>      
    </div>
  );
}