import { useState,useEffect } from "react";
import axios from "axios";

const Practicas = () => {
    const [practicas,setPracticas] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/practicas") // URL para las practicas, devuelve un JSON con un array de practicas
            .then(response => {
                setPracticas(response.data);                
            })
            .catch(error => console.error("Error al obtener las practicas", error));
    }, []);

    
  return (
    <div>
        <h2>Practicas</h2>
        <table>
            <thead>
                <tr>
                    <th>ID Practica</th>
                    <th>ID Tipo Nomenclador</th>
                    <th>Descripcion</th>
                    <th>Sexo</th>
                    <th>Edad Desde</th>
                    <th>Edad Hasta</th>
                </tr>
            </thead>
            <tbody>
                {practicas.map((practica)=>(
                    <tr key={practica.id_practica}>
                        <td>{practica.id_practica}</td>
                        <td>{practica.id_tipoNomenclador}</td>
                        <td>{practica.descripcion}</td>
                        <td>{practica.sexo}</td>
                        <td>{practica.edad_desde}</td>
                        <td>{practica.edad_hasta}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Practicas