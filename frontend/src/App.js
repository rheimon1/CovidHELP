import React from 'react';

import { AuthProvider } from './contexts/auth';

import './global.css';

import Routes from './routes/index';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;