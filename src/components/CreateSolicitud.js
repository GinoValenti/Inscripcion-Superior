import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Solicitud = () => {
  const [nombre, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [DNI, setDNI] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [id_carrera, setCarrera] = useState("");
  const [email, setEmail] = useState("");
  let titulo_secundario = "test";
  
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_DB_URL}solicitudInscripcion`, {
      nombre, apellido, DNI, direccion, fecha_nacimiento, telefono, id_carrera, email, titulo_secundario
    })
    .then(response => {
      console.log("Form submitted successfully", response.data);
      // Redirigir a la página de agradecimiento
      navigate('/gracias');
    })
    .catch(error => {
      console.error("There was an error submitting the form!", error);
      alert("Hubo un error al enviar la solicitud. Intente nuevamente.");
    });
  };

  return (
    <>
      <h1 className="text-center mt-5">Inscripción Superior</h1>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Row className="d-flex">
                <Col md={6} className="d-flex flex-column">
                  <Form.Group className="mb-3" >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      type="text" 
                      placeholder="Ingresa tu nombre" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>DNI</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDNI(e.target.value)} 
                      required 
                      type="number" 
                      placeholder="Ingrese su DNI" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control 
                      onChange={(e) => setFecha_nacimiento(e.target.value)} 
                      required 
                      type="date" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label htmlFor="carrera">Carrera</Form.Label>
                    <Form.Select 
                      id="carrera" 
                      onChange={(e) => setCarrera(e.target.value)} 
                      required
                    >
                      <option value="">Selecciona una carrera</option>
                      <option value="1">TÉCNICO SUPERIOR EN ANÁLISIS FUNCIONAL DE SISTEMAS INFORMÁTICOS</option>
                      <option value="2">TÉCNICO SUPERIOR EN DESARROLLO DE SOFTWARE</option>
                      <option value="3">TÉCNICO SUPERIOR EN INFRAESTRUCTURA DE TECNOLOGÍA DE LA INFORMACIÓN</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="d-flex flex-column">
                  <Form.Group className="mb-3" >
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                      onChange={(e) => setApellido(e.target.value)} 
                      required 
                      type="text" 
                      placeholder="Ingrese su apellido" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDireccion(e.target.value)} 
                      required 
                      type="text" 
                      placeholder="Ingrese su dirección" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control 
                      onChange={(e) => setTelefono(e.target.value)} 
                      required 
                      type="tel" 
                      placeholder="Ingrese su teléfono" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      type="email" 
                      placeholder="Ingrese su email" 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Solicitud;
