import { useState,useEffect } from "react";
import axios from "axios";

const Prestadores = () => {
    const [prestadores, setPrestadores] = useState([]);
    useEffect(() => {
        console.log("Llamando a:", `${import.meta.env.VITE_API_URL}/prestadores`)
        //axios.get(`${API_URL}/prestadores`)
        axios.get(`https://traditum-production-f345.up.railway.app/api/prestadores`)
            .then(response => {
                setPrestadores(response.data);
                console.log(response);
            })
            .catch(error => {
                console.error("Error al cargar prestadores:", error);
            })
    }, []);

    console.log(prestadores);
    
  return (
    <div>A ver si asi si</div>
  )
}

export default Prestadores