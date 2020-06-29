import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import './styles.css';

//import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { user, signOut } = useAuth();

  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    api.get('profile').then(response => {
      if(mounted) {
        setOrders(response.data);
      }
    });

      return () => mounted = false;
  }, [orders])

  async function handleDeleteOrder(id) {
    try {
      await api.delete(`orders/${id}`);

      setOrders(orders.filter(order => order.id !== id))
    } catch (error) {
      alert('Erro ao deletar pedido, tente novamente.');
    }
  }

  function handleLogout() {
    signOut();
  }

  // <img src={logoImg} alt="Covid"/> -->

  return (
    <div className="profile-container">
      <header>
        
        <span>{user?.name}</span>

        <Link className="button" to="/orders/new">Cadastrar pedido</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#fc6963" />
        </button>
      </header>

      <h1>Pedidos cadastrados</h1>

      <ul>
        {orders.map(order => ( 
          <li key={order.id}>
            <strong>PEDIDO</strong>
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