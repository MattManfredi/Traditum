import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import Financiadora from "./Financiadora";

const TipoClasificacion = sequelize.define('TipoClasificacion',{
    id_clasificacion:{
        type: DataTypes.STRING(2),
        primaryKey: true,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    id_financiadora:{
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
        references:{
            model: Financiadora,
            key: 'id_financiadora',
        }
    }
},{});

// Relacion con Financiadora
TipoClasificacion.belongsTo(Financiadora, {foreignKey: 'id_financiadora'});

export default TipoClasificacion;