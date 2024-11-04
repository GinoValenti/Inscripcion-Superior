import React from 'react';
import './App.css'; 
import Solicitud from "./components/CreateSolicitud"; 
import SolicitudTable from './components/SolicitudTable';
import Navegacion from './components/Nav';
import Login from './components/Login';
import Gracias from './components/Agradecimiento';
import ProtectedRoute from './components/ProtectedRoute';
import EditarSolicitud from './components/EditarSolicitud';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EstadisticasInscriptos from './components/Estadisticas';
function App() {
  return (
    <BrowserRouter> 
      <Navegacion />
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/estadisticas" element={<EstadisticasInscriptos></EstadisticasInscriptos>}></Route>
        <Route path='/' element={<Solicitud />} />
        <Route 
          path='/tabla' 
          element={<ProtectedRoute element={<SolicitudTable />} />} 
        />
        <Route path="/editar-solicitud/:DNI" element={<EditarSolicitud />} /> {/* Ruta para editar */}
         <Route path="/gracias" element={<Gracias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
