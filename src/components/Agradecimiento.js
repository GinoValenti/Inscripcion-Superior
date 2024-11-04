// Gracias.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Gracias = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>¡Gracias por enviar su formulario!</h1>
          <p>Nos estaremos comunicando con usted via email para informarle su situación.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Gracias;
