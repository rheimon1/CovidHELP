import React from 'react';

import { useAuth } from '../../contexts/auth';

import './styles.css';

export default function SignIn() {
  const { signIn } = useAuth();

  async function handleSign() {
    signIn();
  }

  return (
    <div className="container">
      <button type="button" onClick={handleSign} >
        Sign In
      </button>
    </div>
  )
};
