import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';


const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['nombre']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/alumno/login', {
        nombre,
        contraseña,
      });

      if (response.data.alumno.nombre) {
        setCookie('nombre', response.data.alumno.nombre);
        setCookie("rol", response.data.alumno.rol);
        alert(`Bienvenido, ${response.data.alumno.nombre}!`);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className='formLogin' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='buttonLogin' type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
