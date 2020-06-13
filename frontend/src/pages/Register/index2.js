import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import api from '../../services/api';
import './styles.css';

import LogoImg from '../../assets/logoImg.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cities, setCities] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      whatsapp,
      city: selectedCity,
      uf: selectedUf,
      password,
      confirmPassword
    };

    console.log(data);

    try {
      await api.post('users', data);

      alert(`Cadastro feito com suceso!`);

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

            <div className="field">
              <select 
                name="uf" 
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