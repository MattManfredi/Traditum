import { DataTypes } from "sequelize";
import {sequelize} from '../config/config.js';
import TipoPrestador from "./TipoPrestador.js";
import Provincia from "./Provincia.js";



const Prestador = sequelize.define('Prestador', {
    id_prestador: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
    },
    id_tipoPrestador:{
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
        references: {
            model: TipoPrestador,
            key: 'id_tipoPrestador',
        },
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    fech_alta: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fech_baja: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tipo_matricula: {
        type: DataTypes.STRING(2),
        allowNull: true,
    },
    numero_matricula: {
        type: DataTypes.STRING(6),
        allowNull: true,
    },
    numero_propio: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    id_identificadorPrestador: {
        type: DataTypes.STRING(5),
        allowNull: true,
    },
    domicilio: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    localidad: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    id_provincia: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        references: {
            model: Provincia,
            key: 'id_provincia',
        }
    },
    codPostal: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    telefono:{
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    clasificacion: {
        type: DataTypes.STRING(2),
        allowNull: true,
    },
}, {
    tableName: 'prestadores',
    timestamps: false,
});

// Relacion Belongs to
Prestador.belongsTo(TipoPrestador, {foreignKey: 'id_tipoPrestador'});

// Relacion: Un prestador puede tener muchos planes
// Prestador.hasMany(PrestadorPlan, {foreignKey: 'id_prestador'});
// Prestador.hasMany(PrestadorPractica, {foreignKey: 'id_prestador'});

export default Prestador;