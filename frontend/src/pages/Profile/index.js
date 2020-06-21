import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import './styles.css';

//import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setincidents] = useState([]);
  const { user, signOut } = useAuth();

  const history = useHistory();

  useEffect(() => {
    //let mounted = true;
    api.get('profile').then(response => {
      //if(mounted) {
        setincidents(response.data);
      //}
    })

    //return () => mounted = false;
  }, [incidents]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`);
      setincidents(incidents.filter(incident => incident.id !== id)) 
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

        <Link className="button" to="/incidents/new">Cadastrar pedido</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#451269" />
        </button>
      </header>

      <h1>Pedidos cadastrados</h1>

      <ul>
        {incidents.map(incident => ( 
          <li key={incident.id}>
            <strong>PEDIDO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}