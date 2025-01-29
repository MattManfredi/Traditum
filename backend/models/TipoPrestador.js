import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";

const TipoPrestador = sequelize.define('TipoPrestador',{
    id_tipoPrestador:{
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
    },
    id_financiadora:{
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Financiadora',
            key: 'id_financiadora',
        },
    },
    descripcion:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fech_creacion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece el valor predeterminado en la fecha del momento
    },
},{
    tableName: 'tipoPrestador',
    timestamps: false,
});

TipoPrestador.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});

export default TipoPrestador;