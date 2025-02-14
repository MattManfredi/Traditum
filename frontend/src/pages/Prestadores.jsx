import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Prestadores = () => {
    const [prestadores, setPrestadores] = useState([]);
    const [filteredPrestadores, setFiltredPrestadores] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/api/prestadores") // URL para los prestadores, devuelve un JSON con un array de prestadores
            .then(response =>{
                setPrestadores(response.data);
            })
    }, []);

    useEffect(() => {
        const filtered = prestadores.filter((prestador) => 
            prestador.nombre.toLowerCase().includes(searchName.toLowerCase()) &&
            prestador.id_prestador.toString().includes(searchId.toString())
        );
        setFiltredPrestadores(filtered);
    }, [searchName, searchId, prestadores]);

    
  return (
    <div>
        <h2>Prestadores</h2>
         {/* Campos de búsqueda */}
         <div>
                <input
                    type="text"
                    placeholder="Buscar por Nombre"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
            </div>

            {/* Tabla de prestadores */}
        <table>
            <thead>
                <tr>
                    <th>ID Prestador</th>
                    <th>Nombre</th>
                    <th>Domicilio</th>
                    <th>Localidad</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                    {filteredPrestadores.map(prestador => (
                        <tr key={prestador.id_prestador}>
                            <td>{prestador.id_prestador}</td>
                            <td>{prestador.nombre}</td>
                            <td>{prestador.domicilio}</td>
                            <td>{prestador.localidad}</td>
                            <td>{prestador.telefono}</td>
                            <td>
                                <button onClick={() => navigate(`/prestadores/${prestador.id_prestador}`)}>
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Prestadores