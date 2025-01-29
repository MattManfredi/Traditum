import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";
import TipoPrestador from "./TipoPrestador.js";
import Prestador from "./Prestador.js";
import Plan from "./Plan.js";

const PrestadorPlan = sequelize.define('PrestadorPlan',{
    id_financiadora:{
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Financiadora,
            key: 'id_financiadora',
        },
    },
    id_tipoPrestador:{
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        references: {
            model: TipoPrestador,
            key: 'id_tipoPrestador',
        },
    },
    id_prestador: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Prestador,
            key: 'id_prestador',
        },
    },
    id_plan:{
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Plan,
            key: 'id_plan',
        },
    },
},{
    tableName: 'prestadorPlan',
    timestamps: false,
});

// Relacion Belongs to Financiadora, TipoPrestador, Prestador, Plan
PrestadorPlan.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});
PrestadorPlan.belongsTo(TipoPrestador, {foreignKey: 'id_tipoPrestador'});
PrestadorPlan.belongsTo(Prestador, {foreignKey: 'id_prestador'});
PrestadorPlan.belongsTo(Plan, {foreignKey: 'id_plan'});

export default PrestadorPlan;