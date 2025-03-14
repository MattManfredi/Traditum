import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from '../config/config';

const Prestadores = () => {
    const [prestadores, setPrestadores] = useState([]);
    const [filteredPrestadores, setFilteredPrestadores] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchId, setSearchId] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Cargar prestadores
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${API_URL}/prestadores`)
            .then(response => {
                setPrestadores(response.data);
                console.log(response);
                setFilteredPrestadores(response.data);
            })
            .catch(error => {
                console.error("Error al cargar prestadores:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Filtrar prestadores
    useEffect(() => {
        const filtered = prestadores.filter((prestador) => 
            prestador.nombre.toLowerCase().includes(searchName.toLowerCase()) &&
            prestador.id_prestador.toString().includes(searchId.toString())
        );
        setFilteredPrestadores(filtered);
    }, [searchName, searchId, prestadores]);

     // Función para manejar el ordenamiento
     const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedPrestadores = [...filteredPrestadores].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredPrestadores(sortedPrestadores);
    };

    // Función para mostrar la flecha de ordenamiento
    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) {
            return (
                <svg className="w-4 h-4 inline-block ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }
        
        return sortConfig.direction === 'asc' ? (
            <svg className="w-4 h-4 inline-block ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 inline-block ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    return (
        <div className="container mx-auto px-4">
            {isLoading ? (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-700">Cargando prestadores...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Encabezado y Búsqueda */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Prestadores</h1>
                        <Link 
                            to="/prestadores/nuevo"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Nuevo Prestador
                        </Link>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg 
                                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Buscar por CUIT..."
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg 
                                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Tabla de Prestadores */}
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('id_prestador')}
                                            >
                                                <span className="flex items-center">
                                                    CUIT
                                                    {getSortIcon('id_prestador')}
                                                </span>
                                            </th>
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSort('nombre')}
                                            >
                                                <span className="flex items-center">
                                                    Nombre
                                                    {getSortIcon('nombre')}
                                                </span>
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredPrestadores.map((prestador) => (
                                            <tr key={prestador.id_prestador} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prestador.id_prestador}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">{prestador.nombre}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button 
                                                        onClick={() => navigate(`/prestadores/${prestador.id_prestador}`)}
                                                        className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                                    >
                                                        Ver Detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Prestadores