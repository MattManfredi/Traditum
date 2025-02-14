import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import TipoPrestador from "./TipoPrestador.js";
import Financiadora from "./Financiadora.js";
import TipoNomenclador from "./TipoNomenclador.js";
import Practica from "./Practica.js";
import Prestador from "./Prestador.js";

const PrestadorPractica = sequelize.define('PrestadorPractica',{
    id_financiadora: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Financiadora,
            key: 'id_financiadora',
        },
    },
    id_tipoPrestador: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        references: {
            model: TipoPrestador,
            key: 'id_tipoPrestador'
        },
    },
    id_prestador: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
    },
    id_tipoNomenclador: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        references: {
            model: TipoNomenclador,
            key: 'id_tipoNomenclador'
        },
    },
    id_practica: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Practica,
            key: 'id_practica'
        },
    },
    fech_creacion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece la fecha de la creacion del prestador practica
    },
},{
    tableName: 'prestadores_practicas',
    timestamps: false,
});

// // Lazy import de Prestador.js para evitar dependencia circular
// const Prestador = (await import("./Prestador.js")).default;

// Relacion Belongs to Prestadores, TipoPrestador, TipoNomenclador, Financiadora, Practica
PrestadorPractica.belongsTo(Prestador, {foreignKey: 'id_prestador'});
PrestadorPractica.belongsTo(TipoPrestador, {foreignKey: 'id_tipoPrestador'});
PrestadorPractica.belongsTo(TipoNomenclador, {foreignKey: 'id_tipoNomenclador'});
PrestadorPractica.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});
PrestadorPractica.belongsTo(Practica, {foreignKey: 'id_practica'});

export default PrestadorPractica;