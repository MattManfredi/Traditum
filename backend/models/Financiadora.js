import { DataTypes } from "sequelize";
import {sequelize} from '../config/config.js';

const Financiadora = sequelize.define('Financiadora', {
    id_financiadora: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece el valor predeterminado en la fecha del momento
    },
},{
    tableName: 'financiadora',
    timestamps: false,
});

export default Financiadora;