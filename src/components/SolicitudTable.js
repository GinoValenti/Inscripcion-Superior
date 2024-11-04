import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "primereact/resources/themes/lara-light-cyan/theme.css";

const SolicitudTable = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DB_URL}solicitudInscripcion`);
                setData(response.data);
                console.log("Data fetched successfully:", response.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                alert("Hubo un error al cargar los datos. Intente nuevamente.");
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (DNI) => {
        try {
            await axios.delete(`${process.env.REACT_APP_DB_URL}solicitudInscripcion/${DNI}`);
            setData(data.filter(item => item.DNI !== DNI));
            alert("Solicitud eliminada exitosamente.");
        } catch (error) {
            console.error("Error al eliminar la solicitud:", error);
            alert("Hubo un error al eliminar la solicitud. Intente nuevamente.");
        }
    };
    
    const handleEdit = (solicitud) => {
        console.log('Editando solicitud con DNI:', solicitud.DNI); // Esto debe mostrarse en la consola
        navigate(`/editar-solicitud/${solicitud.DNI}`); // Usar navigate para redirigir
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button label="Editar" icon="pi pi-pencil" onClick={() => handleEdit(rowData)} className="editbuttons p-button-secondary" />
                <Button label="Eliminar" icon="pi pi-trash" onClick={() => handleDelete(rowData.DNI)} className="editbuttons p-button-danger" />
            </div>
        );
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', marginTop: "50px" }}>
            <DataTable paginator rows={5} stripedRows tableStyle={{ minWidth: '50rem' }} value={data}>
                <Column sortable field="DNI" header="DNI"></Column>
                <Column sortable field="nombre" header="Nombre"></Column>
                <Column sortable field="apellido" header="Apellido"></Column>
                <Column sortable field="telefono" header="Teléfono"></Column>
                <Column sortable field="email" header="Email"></Column>
                <Column sortable field="direccion" header="Dirección"></Column>
                <Column body={actionBodyTemplate} header="Acciones" style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </div>
    );
}

export default SolicitudTable;
