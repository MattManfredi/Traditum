import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../components/DataTable";

const PrestadorDetalle = () => {
    const { id } = useParams();
    const [prestador, setPrestador] = useState(null);
    const [cambiosRealizadosPlanesNomenclador, setCambiosRealizadosPlanesNomenclador] = useState(false); // Nuevo estado para habilitar el botón de guardar cambios Planes Nomenclador
    const [cambiosPrestador, setCambiosPrestador] = useState(false); // Nuevo estado para habilitar el botón de guardar cambios Prestador

    // FALTA AGREGAR LOS BOTONES GUARDAR Y CANCELAR PARA EL PRESTADOR

    // DEBERIA SEPARAR EN COMPONENTES MAS CHICOS CADA PARTE DE LA PAGINA


    // Estados para almacenar los datos originales y detectar cambios
    const [datosOriginalesPlanesNomenclador, setDatosOriginalesPlanesNomenclador] = useState(null);
    const [datosOriginalesPrestador, setDatosOriginalesPrestador] = useState(null);

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
                const datosInicialesPlanesNomenclador = {
                    nomencladoresAsignados: response.data.nomencladores_asignados,
                    nomencladoresNoAsignados: response.data.nomencladores_no_asignados,
                    planesCoberAsignados: response.data.planes_asignados_cober,
                    planesCoberNoAsignados: response.data.planes_no_asignados_cober,
                    planesBristolAsignados: response.data.planes_asignados_bristol,
                    planesBristolNoAsignados: response.data.planes_no_asignados_bristol,
                };

                setDatosOriginalesPlanesNomenclador(datosInicialesPlanesNomenclador);
                setDatosOriginalesPrestador(response.data.prestador);
                // Inicializamos los estados con los datos obtenidos
                setNomencladoresAsignados(datosInicialesPlanesNomenclador.nomencladoresAsignados);
                setNomencladoresNoAsignados(datosInicialesPlanesNomenclador.nomencladoresNoAsignados);
                setPlanesCoberAsignados(datosInicialesPlanesNomenclador.planesCoberAsignados);
                setPlanesCoberNoAsignados(datosInicialesPlanesNomenclador.planesCoberNoAsignados);
                setPlanesBristolAsignados(datosInicialesPlanesNomenclador.planesBristolAsignados);
                setPlanesBristolNoAsignados(datosInicialesPlanesNomenclador.planesBristolNoAsignados);
            } catch (error) {
                console.error("Error al obtener el prestador:", error);
            }
        };

        fetchPrestador();
    }, [id]);

    // **Detectar cambios en los Planes Nomenclador**
    useEffect(() => {
        if (!datosOriginalesPlanesNomenclador) return;
        const datosActuales = {
            nomencladoresAsignados,
            nomencladoresNoAsignados,
            planesCoberAsignados,
            planesCoberNoAsignados,
            planesBristolAsignados,
            planesBristolNoAsignados,
        };
        // Comparar los datos actuales con los originales
        const haCambiado = JSON.stringify(datosOriginalesPlanesNomenclador) !== JSON.stringify(datosActuales);
        setCambiosRealizadosPlanesNomenclador(haCambiado);
    }, [nomencladoresAsignados, nomencladoresNoAsignados, planesCoberAsignados, planesCoberNoAsignados, planesBristolAsignados, planesBristolNoAsignados, datosOriginalesPlanesNomenclador]);

    // **Funciones para mover elementos entre asignados y no asignados**
    const asignarElemento = (elemento, setOrigen, setDestino) => {
        setOrigen(prev => prev.filter(e => e !== elemento));
        setDestino(prev => [...prev, elemento]);
    };

    // **Función para sincronizar cambios con el backend**
    const actualizarPrestadorPlanesNomenclador = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/prestadores/${id}`, {
                planes_asignados_cober: planesCoberAsignados,
                planes_no_asignados_cober: planesCoberNoAsignados,
                planes_asignados_bristol: planesBristolAsignados,
                planes_no_asignados_bristol: planesBristolNoAsignados,
                nomencladores_asignados: nomencladoresAsignados,
                nomencladores_no_asignados: nomencladoresNoAsignados
            });
            console.log(response);
            alert(response.data);

            // Actualizamos los datos originales después de guardar
            setDatosOriginalesPlanesNomenclador({
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
        if (!datosOriginalesPlanesNomenclador) return;
        setCambiosRealizadosPlanesNomenclador(false);
        setNomencladoresAsignados(datosOriginalesPlanesNomenclador.nomencladoresAsignados);
        setNomencladoresNoAsignados(datosOriginalesPlanesNomenclador.nomencladoresNoAsignados);
        setPlanesCoberAsignados(datosOriginalesPlanesNomenclador.planesCoberAsignados);
        setPlanesCoberNoAsignados(datosOriginalesPlanesNomenclador.planesCoberNoAsignados);
        setPlanesBristolAsignados(datosOriginalesPlanesNomenclador.planesBristolAsignados);
        setPlanesBristolNoAsignados(datosOriginalesPlanesNomenclador.planesBristolNoAsignados);
    };

       // Función para manejar cambios en los datos del prestador
       const handlePrestadorChange = (campo, valor) => {
        setPrestador(prev => ({
            ...prev,
            [campo]: valor
        }));
        setCambiosPrestador(true);
    };

    // Función para guardar cambios del prestador
    const guardarCambiosPrestador = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/prestadores/${id}`, prestador);
            setDatosOriginalesPrestador(prestador);
            alert(response.data);
            setCambiosPrestador(false);
        } catch (error) {
            console.error("Error al guardar cambios del prestador:", error);
            alert("Error al guardar los cambios del prestador");
        }
    };

    // Función para cancelar cambios del prestador
    const cancelarCambiosPrestador = () => {
        setPrestador(datosOriginalesPrestador);
        setCambiosPrestador(false);
    };

    if (!prestador) return <div>Cargando...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase text-center">Detalles del Prestador</h2>
            <div className="grid gap-4 mb-6 w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto" >
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">CUIT</label>
                    <input
                        value={prestador.id_prestador}
                        onChange={(e) => handlePrestadorChange('id_prestador', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Nombre</label>
                    <input
                        value={prestador.nombre}
                        onChange={(e) => handlePrestadorChange('nombre', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Fecha Alta</label>
                    <input
                        type="date"
                        value={prestador.fech_alta}
                        onChange={(e) => handlePrestadorChange('fech_alta', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Domicilio</label>
                    <input
                        value={prestador.domicilio}
                        onChange={(e) => handlePrestadorChange('domicilio', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Localidad</label>
                    <input
                        value={prestador.localidad}
                        onChange={(e) => handlePrestadorChange('localidad', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Código Postal</label>
                    <input
                        value={prestador.codPostal}
                        onChange={(e) => handlePrestadorChange('codPostal', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Teléfono</label>
                    <input
                        value={prestador.telefono}
                        onChange={(e) => handlePrestadorChange('telefono', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            

                <div className="flex gap-4 mb-8 mx-auto">
                    <button 
                        onClick={guardarCambiosPrestador} 
                        disabled={!cambiosPrestador}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Guardar
                    </button>
                    <button 
                        onClick={cancelarCambiosPrestador} 
                        disabled={!cambiosPrestador}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto mb-8">
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
                <div className="flex gap-4 mb-8 justify-center">
                    <button 
                        onClick={actualizarPrestadorPlanesNomenclador} 
                        disabled={!cambiosRealizadosPlanesNomenclador}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                        Guardar  
                    </button>
                    <button 
                        onClick={cancelarCambios} 
                        disabled={!cambiosRealizadosPlanesNomenclador}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                        Cancelar 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrestadorDetalle;
