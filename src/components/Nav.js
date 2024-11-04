import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link , useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navegacion = ({ nombreUsuario }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['nombre', 'rol']);
const navigate = useNavigate()
  const handleLogout = () => {
    removeCookie('nombre');
    removeCookie('rol');
    alert('Sesión cerrada'); // Notificar al usuario que la sesión se ha cerrado
    window.location.reload(); // Opcional: recargar la página
navigate("/")
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inscripcion</Nav.Link>
            {cookies.rol === "admin" && <><Nav.Link as={Link} to="/tabla">Tabla</Nav.Link><Nav.Link as={Link} to="/estadisticas">Estadisticas</Nav.Link></>}
          </Nav>
          <Nav>
            {cookies.nombre ? (
              <NavDropdown title={cookies.nombre} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;
