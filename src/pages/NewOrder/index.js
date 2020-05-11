import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft  } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoImg.png';

export default function NewOrder() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const userEmail = localStorage.getItem('userEmail');

  async function handleNewOrder(e) {
    e.preventDefault();

    const data = {
      title,
      description,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: userEmail
        }
      })

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar pedido, tente novamente.')  
    }
  }

  return(
    <div className="new-order-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Covid"/>

          <h1>Cadastrar novo pedido</h1>
          <p>Descreva seu pedido detalhadamente para que outras pessoas se solidarizem</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#451269" />
            Voltar para página principal
          </Link>
        </section>

        <form onSubmit={handleNewOrder}>
          <input 
            placeholder="Título do Pedido"
            value={title}
            onChange={e => setTitle(e.target.value)} 
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}