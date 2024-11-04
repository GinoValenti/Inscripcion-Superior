import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EstadisticasInscriptos = () => {
    const [data, setData] = useState([]);
    const [edades, setEdades] = useState([]);
    const [inscriptosPorEstado, setInscriptosPorEstado] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DB_URL}solicitudInscripcion`);
                setData(response.data);
                procesarData(response.data);
                console.log("Data fetched successfully:", response.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                alert("Hubo un error al cargar los datos. Intente nuevamente.");
            }
        };

        fetchData();
    }, []);

    const procesarData = (data) => {
        
        // Calcular edades a partir de la fecha de nacimiento
        const edades = data.map(item => {
            const birthYear = new Date(item.fecha_nacimiento).getFullYear();
            const age = new Date().getFullYear() - birthYear;
            return { age };
        });
        setEdades(edades);

        // Agrupar inscriptos por estado
        const inscriptosPorEstado = data.reduce((acc, item) => {
            acc[item.estado] = (acc[item.estado] || 0) + 1;
            return acc;
        }, {});
        setInscriptosPorEstado(Object.entries(inscriptosPorEstado).map(([estado, cantidad]) => ({ estado, cantidad })));
    };

    return (
        <div>
            <h2>Estadísticas de Inscriptos</h2>

     

            <h3>Distribución de Edades</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie 
                        data={edades} 
                        dataKey="age" 
                        nameKey="age" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        fill="#82ca9d" 
                        label
                    >
                        {edades.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <h3>Inscriptos por Estado</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inscriptosPorEstado}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="estado" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EstadisticasInscriptos;
