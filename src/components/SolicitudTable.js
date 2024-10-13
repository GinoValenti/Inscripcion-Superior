import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import "primereact/resources/themes/lara-light-cyan/theme.css";


const SolicitudTable = () => {
    const [data, setData] = useState([]); 

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

    console.log(data); 

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', marginTop: "50px" }}> {/* Ajusta el ancho máximo aquí */}
            <DataTable paginator rows={5} stripedRows tableStyle={{ minWidth: '50rem' }} value={data}>
                <Column sortable field="DNI" header="DNI"></Column>
                <Column sortable field="nombre" header="Nombre"></Column>
                <Column sortable field="apellido" header="Apellido"></Column>
                <Column sortable field="telefono" header="Teléfono"></Column>
                <Column sortable field="email" header="Email"></Column>
                <Column sortable field="direccion" header="Dirección"></Column>
            </DataTable>
        </div>
    );
}

export default SolicitudTable;

