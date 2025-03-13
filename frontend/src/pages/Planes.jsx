import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../config/config';

const Planes = () => {
    const [planesCober, setPlanesCober] = useState([]);
    const [planesBristol, setPlanesBristol] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
        table: null
    });

    useEffect(() => {
        axios.get(`${API_URL}/planes`)
            .then(response => {
                setPlanesCober(response.data.planesCober);
                setPlanesBristol(response.data.planesBristol);
            })
            .catch(error => {
                console.error("Error al cargar planes:", error);
            });
    }, []);

    const handleSort = (key, tableType) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.table === tableType && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction, table: tableType });

        const sortedPlanes = tableType === 'cober' 
            ? [...planesCober].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
                return 0;
            })
            : [...planesBristol].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
                return 0;
            });

        tableType === 'cober' ? setPlanesCober(sortedPlanes) : setPlanesBristol(sortedPlanes);
    };

    const getSortIcon = (columnName, tableType) => {
        if (sortConfig.key !== columnName || sortConfig.table !== tableType) {
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
            <div className="grid md:grid-cols-2 gap-6">
                {/* Tabla Planes Cober */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                        <h2 className="text-xl font-bold">Planes Cober</h2>
                        <button 
                            onClick={() => {/* TODO: Agregar lógica */}}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                            Nuevo Plan Cober
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('id_plan', 'cober')}
                                    >
                                        <span className="flex items-center">
                                            ID
                                            {getSortIcon('id_plan', 'cober')}
                                        </span>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('descripcion', 'cober')}
                                    >
                                        <span className="flex items-center">
                                            Nombre
                                            {getSortIcon('descripcion', 'cober')}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {planesCober.map((plan) => (
                                    <tr key={plan.id_plan} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.id_plan}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">{plan.descripcion}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                    </div>
                </div>

                {/* Tabla Planes Bristol */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                        <h2 className="text-xl font-bold">Planes Bristol</h2>
                        <button 
                            onClick={() => {/* TODO: Agregar lógica */}}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                            Nuevo Plan Bristol
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('id_plan', 'bristol')}
                                    >
                                        <span className="flex items-center">
                                            ID
                                            {getSortIcon('id_plan', 'bristol')}
                                        </span>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('descripcion', 'bristol')}
                                    >
                                        <span className="flex items-center">
                                            Nombre
                                            {getSortIcon('descripcion', 'bristol')}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {planesBristol.map((plan) => (
                                    <tr key={plan.id_plan} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.id_plan}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">{plan.descripcion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Planes;