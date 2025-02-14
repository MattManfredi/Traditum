import { useEffect, useState } from "react";
import axios from "axios";

const Planes = () => {
    const [planesCober, setPlanesCober] = useState([]);
    const [planesBristol, setPlanesBristol] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/planes") // URL para los planes, devuelve un JSON con dos arrays: planesCober y planesBristol
            .then(response => {
                setPlanesCober(response.data.planesCober);
                setPlanesBristol(response.data.planesBristol);
            })
            .catch(error => console.error("Error al obtener los planes", error));
    }, []);

    return (
        <div>
            <h2>Lista de Planes Cober</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {planesCober.map((plan) => (
                        <tr key={plan.id_plan}>
                            <td>{plan.id_plan}</td>
                            <td>{plan.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Lista de Planes Bristol</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {planesBristol.map((plan) => (
                        <tr key={plan.id_plan}>
                            <td>{plan.id_plan}</td>
                            <td>{plan.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Planes;
