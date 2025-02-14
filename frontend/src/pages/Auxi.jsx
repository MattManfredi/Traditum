import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../components/DataTable";

const PrestadorDetalle = () => {
    const { id } = useParams();
    const [prestador, setPrestador] = useState(null);
    const [cambiosRealizadosPlanesNomenclador, setCambiosRealizadosPlanesNomenclador] = useState(false); // Nuevo estado para habilitar el botón

    // Estados para almacenar los datos originales y detectar cambios
    const [datosOriginales, setDatosOriginales] = useState(null);

    // Estados para manejar cambios en el frontend
    const [nomencladoresAsignados, setNomencladoresAsignados] = useState([]);
    const [nomencladoresNoAsignados, setNomencladoresNoAsignados] = useState([]);
    const [planesCoberAsignados, setPlanesCoberAsignados] = useState([]);
    const [planesBristolAsignados, setPlanesBristolAsignados] = useState([]);
    const [planesCoberNoAsignados, setPlanesCoberNoAsignados] = useState([]);
    const [planesBristolNoAsignados, setPlanesBristolNoAsignados] = useState([]);

    useEffect(() => {
        const fetchPrestador = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/prestadores/${id}`);
                setPrestador(response.data.prestador);

                // Guardamos los datos originales para comparar cambios
                const datosIniciales = {
                    nomencladoresAsignados: response.data.nomencladores_asignados,
                    nomencladoresNoAsignados: response.data.nomencladores_no_asignados,
                    planesCoberAsignados: response.data.planes_asignados_cober,
                    planesCoberNoAsignados: response.data.planes_no_asignados_cober,
                    planesBristolAsignados: response.data.planes_asignados_bristol,
                    planesBristolNoAsignados: response.data.planes_no_asignados_bristol,
                };

                setDatosOriginales(datosIniciales);

                // Inicializamos los estados con los datos obtenidos
                setNomencladoresAsignados(datosIniciales.nomencladoresAsignados);
                setNomencladoresNoAsignados(datosIniciales.nomencladoresNoAsignados);
                setPlanesCoberAsignados(datosIniciales.planesCoberAsignados);
                setPlanesCoberNoAsignados(datosIniciales.planesCoberNoAsignados);
                setPlanesBristolAsignados(datosIniciales.planesBristolAsignados);
                setPlanesBristolNoAsignados(datosIniciales.planesBristolNoAsignados);
            } catch (error) {
                console.error("Error al obtener el prestador:", error);
            }
        };

        fetchPrestador();
    }, [id]);

    // **Detectar cambios en los datos**
    useEffect(() => {
        if (!datosOriginales) return;

        const datosActuales = {
            nomencladoresAsignados,
            nomencladoresNoAsignados,
            planesCoberAsignados,
            planesCoberNoAsignados,
            planesBristolAsignados,
            planesBristolNoAsignados,
        };

        // Comparar los datos actuales con los originales
        const haCambiado = JSON.stringify(datosOriginales) !== JSON.stringify(datosActuales);
        setCambiosRealizadosPlanesNomenclador(haCambiado);
    }, [nomencladoresAsignados, nomencladoresNoAsignados, planesCoberAsignados, planesCoberNoAsignados, planesBristolAsignados, planesBristolNoAsignados, datosOriginales]);

    // **Funciones para mover elementos entre asignados y no asignados**
    const asignarElemento = (elemento, setOrigen, setDestino) => {
        setOrigen(prev => prev.filter(e => e !== elemento));
        setDestino(prev => [...prev, elemento]);
    };

    // **Función para sincronizar cambios con el backend**
    const actualizarPrestador = async () => {
        try {
            const actualizacion = await axios.put(`http://localhost:3000/api/prestadores/${id}`, {
                planes_asignados_cober: planesCoberAsignados,
                planes_no_asignados_cober: planesCoberNoAsignados,
                planes_asignados_bristol: planesBristolAsignados,
                planes_no_asignados_bristol: planesBristolNoAsignados,
                nomencladores_asignados: nomencladoresAsignados,
                nomencladores_no_asignados: nomencladoresNoAsignados
            });
            console.log(actualizacion);
            alert(actualizacion.data);

            // Actualizamos los datos originales después de guardar
            setDatosOriginales({
                nomencladoresAsignados,
                nomencladoresNoAsignados,
                planesCoberAsignados,
                planesCoberNoAsignados,
                planesBristolAsignados,
                planesBristolNoAsignados,
            });

            setCambiosRealizadosPlanesNomenclador(false);
        } catch (error) {
            console.error("Error al actualizar el prestador:", error);
            alert("Hubo un error al guardar los cambios");
        }
    };

     // **Función para cancelar cambios y restaurar los datos originales**
     const cancelarCambios = () => {
        if (!datosOriginales) return;

        setNomencladoresAsignados(datosOriginales.nomencladoresAsignados);
        setNomencladoresNoAsignados(datosOriginales.nomencladoresNoAsignados);
        setPlanesCoberAsignados(datosOriginales.planesCoberAsignados);
        setPlanesCoberNoAsignados(datosOriginales.planesCoberNoAsignados);
        setPlanesBristolAsignados(datosOriginales.planesBristolAsignados);
        setPlanesBristolNoAsignados(datosOriginales.planesBristolNoAsignados);

        setCambiosRealizadosPlanesNomenclador(false);
    };

    if (!prestador) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Prestador</h2>
            <p>ID: {prestador?.id_prestador}</p>
            <p>Nombre: {prestador?.nombre}</p>
            <p>Fecha Alta: {prestador?.fech_alta}</p>
            <p>Domicilio: {prestador?.domicilio}</p>
            <p>Localidad: {prestador?.localidad}</p>
            <p>Codigo Postal: {prestador?.codPostal}</p>
            <p>Telefono: {prestador?.telefono}</p>
            <button onClick={actualizarPrestador} disabled={true}>
                Guardar Cambios
            </button>
            <button onClick={cancelarCambios} disabled={true}>
                Cancelar
            </button>
            <DataTable
                title="Nomencladores"
                assigned={nomencladoresAsignados}
                notAssigned={nomencladoresNoAsignados}
                onAssign={(item) => asignarElemento(item, setNomencladoresNoAsignados, setNomencladoresAsignados)}
                onUnassign={(item) => asignarElemento(item, setNomencladoresAsignados, setNomencladoresNoAsignados)}
            />

            <DataTable
                title="Planes Cober"
                assigned={planesCoberAsignados}
                notAssigned={planesCoberNoAsignados}
                onAssign={(item) => asignarElemento(item, setPlanesCoberNoAsignados, setPlanesCoberAsignados)}
                onUnassign={(item) => asignarElemento(item, setPlanesCoberAsignados, setPlanesCoberNoAsignados)}
            />

            <DataTable
                title="Planes Bristol"
                assigned={planesBristolAsignados}
                notAssigned={planesBristolNoAsignados}
                onAssign={(item) => asignarElemento(item, setPlanesBristolNoAsignados, setPlanesBristolAsignados)}
                onUnassign={(item) => asignarElemento(item, setPlanesBristolAsignados, setPlanesBristolNoAsignados)}
            />

            {/* Botón solo se habilita si hay cambios */}
            <button onClick={actualizarPrestador} disabled={!cambiosRealizadosPlanesNomenclador}>
                Guardar Cambios
            </button>
            <button onClick={cancelarCambios} disabled={!cambiosRealizadosPlanesNomenclador}>
                Cancelar
            </button>
        </div>
    );
};

export default PrestadorDetalle;
