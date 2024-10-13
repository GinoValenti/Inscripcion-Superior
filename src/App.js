import React from 'react';
import './App.css'; 
import Solicitud from "./components/CreateSolicitud"; 
import SolicitudTable from './components/SolicitudTable';
import Navegacion from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter> 
      <Navegacion />
      <Routes>
        <Route path='/' element={<Solicitud />} />
        <Route path='/tabla' element={<SolicitudTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
