import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element }) => {
  const [cookies] = useCookies(['rol']);

  // Verifica si el usuario es admin
  if (cookies.rol === 'admin') {
    return element; // Retorna el componente si el rol es admin
  } else {
    return <Navigate to="/login" />; // Redirige si no es admin
  }
};

export default ProtectedRoute;
