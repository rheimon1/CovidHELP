import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import { getToken } from '../../services/auth';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [orders, setOrders] = useState([]);

  const history = useHistory();

  const token = getToken();

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: token,
      }
    }).then(response => {
      console.log(response.data);
      setOrders(response.data);
    })
  }, [token]);

  async function handleDeleteOrder(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: userEmail,
        }
      });

      setOrders(orders.filter(order => order.id !== id)) 
    } catch (error) {
      alert('Erro ao deletar pedido, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Covid"/>
        <span>Bem vindo, {userName}</span>

        <Link className="button" to="/incidents/new">Cadastrar pedido</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#451269" />
        </button>
      </header>

      <h1>Pedidos cadastrados</h1>

      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>PEDIDO:</strong>
            <p>{order.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{order.description}</p>

            <button onClick={() => handleDeleteOrder(order.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}