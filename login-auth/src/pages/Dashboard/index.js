import React from 'react';

import { useAuth } from '../../contexts/auth';

import './styles.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    signOut();
  }

  return (
    <div className="container">
      <p>{user?.name}</p>
      <button type="button" onClick={handleSignOut} >
        Sign out
      </button>
    </div>
  )
};
