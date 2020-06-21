import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

import '../global.css';

const Routes = () => {
  const { signed } = useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;