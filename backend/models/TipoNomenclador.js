import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";

const TipoNomenclador = sequelize.define('TipoNomenclador',{
    id_tipoNomenclador:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
    },
    id_financiadora:{
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Financiadora,
            key: 'id_financiadora',
        },
    },
    descripcion:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    fech_creacion:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece la fecha de la creacion del tipo de nomenclador
    },
},{
    tableName: 'tipos_nomencladores',
    timestamps: false,
});

// Relacion Belongs to Financiadora
TipoNomenclador.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});

export default TipoNomenclador;