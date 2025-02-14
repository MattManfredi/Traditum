/* eslint-disable react/prop-types */
const DataTable = ({ title, assigned, notAssigned, onAssign, onUnassign }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th colSpan="2"><h3>{title}</h3></th>
                </tr>
                <tr>
                    <th>Asignados</th>
                    <th>No Asignados</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ul>
                            {assigned.length > 0 ? assigned.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button onClick={() => onUnassign(item)}>❌ Quitar</button>
                                </li>
                            )) : <p>Sin asignar</p>}
                        </ul>
                    </td>
                    <td>
                        <ul>
                            {notAssigned.length > 0 ? notAssigned.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button onClick={() => onAssign(item)}>✔ Agregar</button>
                                </li>
                            )) : <p>Sin asignar</p>}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default DataTable;
