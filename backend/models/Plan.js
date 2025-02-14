import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";

const Plan = sequelize.define('Plan',{
    id_plan:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
    },
    id_financiadora:{
        type: DataTypes.STRING(11),
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
    fech_alta:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    fech_baja: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    id_grupo: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    tipo_plan: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    clasificacion: {
        type: DataTypes.STRING(7),
        allowNull: true,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece la fecha de la creacion del plan 
    },
},{
    tableName: 'planes',
    timestamps: false,
});

// Relacion Belongs to Financiadora
Plan.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});

export default Plan;