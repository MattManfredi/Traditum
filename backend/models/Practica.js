import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import TipoNomenclador from "./TipoNomenclador.js";

const Practica = sequelize.define('Practica',{
    id_practica:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
    },
    id_tipoNomenclador:{
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        references: {
            model: TipoNomenclador,
            key: 'id_tipoNomenclador',
        },
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    id_codPropio: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    nivel_complejidad: {
        type: DataTypes.CHAR(1),
        allowNull: true,
    },
    id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_2TipoNomenclador: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    id_2Practica: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    id_3TipoNomenclador: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    id_3Practica: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: true
    },
    edad_desde: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    edad_hasta: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece la fecha de la creacion de la practica
    },
},{
    tableName: 'practicas',
    timestamps: false,
});

// Relacion Belongs to TipoNomenclador
Practica.belongsTo(TipoNomenclador, {foreignKey: 'id_tipoNomenclador'});

export default Practica;