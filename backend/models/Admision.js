import { BelongsTo, DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";

const Admision = sequelize.define('Admision',{
    id_admision:{
        type: DataTypes.CHAR(1),
        primaryKey: true,
        allowNull: false,
    },
    id_financiadora:{
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Financiadora,
            key: 'id_financiadora',
        },
    },
    descripcion:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece la fecha de la creacion de la admision
    },
},{
    tableName: 'admisiones',
    timestamps: false,
});

// Relacion Belongs to Financiadora
BelongsTo(Financiadora, {foreignKey: 'id_financiadora'});

export default Admision;