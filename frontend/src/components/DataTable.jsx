/* eslint-disable react/prop-types */
const DataTable = ({ title, assigned, notAssigned, onAssign, onUnassign }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 uppercase text-center">{title}</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* Lista de No Asignados */}
                <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">No Asignados</h4>
                    <div className="max-h-60 overflow-y-auto">
                        {notAssigned.map((item) => (
                            <div 
                                key={item} 
                                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                            >
                                <span className="text-gray-600">{item}</span>
                                {console.log(item)}
                                <button
                                    onClick={() => onAssign(item)}
                                    className="invisible group-hover:visible bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                                >
                                    Asignar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lista de Asignados */}
                <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">Asignados</h4>
                    <div className="max-h-60 overflow-y-auto">
                        {assigned.map((item) => (
                            <div 
                                key={item} 
                                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                            >
                                <span className="text-gray-600">{item}</span>
                                <button
                                    onClick={() => onUnassign(item)}
                                    className="invisible group-hover:visible bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                >
                                    Desasignar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
