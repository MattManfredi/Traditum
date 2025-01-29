import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";

const Provincia = sequelize.define('Provincia',{
    id_provincia:{
        type: DataTypes.CHAR(1),
        allowNull: false,
        primaryKey: true,
    },
    descripcion:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},{
    tableName: 'provincia',
    timestamps: false,
});

export default Provincia;
