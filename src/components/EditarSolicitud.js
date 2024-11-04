import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';

const EditarSolicitud = () => {
    const { DNI } = useParams(); // Captura el DNI de los parámetros
    console.log("DNI recibido:", DNI); // Debería mostrar el DNI correcto
    const navigate = useNavigate(); 
    const [solicitud, setSolicitud] = useState({
        nombre: '',
        apellido: '',
        DNI: '',
        direccion: '',
        fecha_nacimiento: '',
        telefono: '',
        email: '',
        estado:""
    });

    useEffect(() => {
        const fetchSolicitud = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DB_URL}solicitudInscripcion/${DNI}`);
                setSolicitud(response.data);
            } catch (error) {
                console.error("Error al obtener la solicitud:", error);
                alert("Hubo un error al cargar la solicitud. Intente nuevamente.");
            }
        };

        fetchSolicitud();
    }, [DNI]);

    const handleChange = (e) => {
        setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
    };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Asegúrate de que 'solicitud' sea un objeto y no una cadena JSON
        await axios.put(`${process.env.REACT_APP_DB_URL}solicitudInscripcion/${DNI}`, solicitud);
        alert("Solicitud actualizada exitosamente!");
        navigate('/tabla'); // Redirige a la tabla después de editar
    } catch (error) {
        console.error("Error al actualizar la solicitud:", error);
        alert("Hubo un error al actualizar la solicitud. Intente nuevamente.");
    }
};


    return (
        <Container className="mt-5">
            <h2>Editar Solicitud</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={solicitud.nombre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" value={solicitud.apellido} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" name="DNI" value={solicitud.DNI} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="direccion" value={solicitud.direccion} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" name="telefono" value={solicitud.telefono} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={solicitud.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="estado">
    <Form.Label>Estado</Form.Label>
    <Form.Select style={{ marginBottom: '10px' }} name="estado" value={solicitud.estado} onChange={handleChange}>
        <option value="pendiente">Pendiente</option>
        <option value="en_proceso">En Proceso</option>
        <option value="completado">Completado</option>
    </Form.Select>
</Form.Group>

                <Button variant="primary" type="submit">Actualizar</Button>
            </Form>
        </Container>
    );
};

export default EditarSolicitud;
