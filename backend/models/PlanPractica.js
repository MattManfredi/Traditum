import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Financiadora from "./Financiadora.js";
import Plan from "./Plan.js";
import TipoNomenclador from "./TipoNomenclador.js";
import Practica from "./Practica.js";
import Admision from "./Admision.js";

const PlanPractica = sequelize.define("PlanPractica", {
    id_financiadora: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Financiadora,
            key: "id_financiadora",
        },
    },
    id_plan: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Plan,
            key: "id_plan",
        },
    },
    id_tipoNomenclador: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        references: {
            model: TipoNomenclador,
            key: "id_tipoNomenclador",
        },
    },
    id_practica: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Practica,
            key: "id_practica",
        },
    },
    periodo_carencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    req_auditoria: {
        type: DataTypes.STRING(2),
        allowNull: true,
    },
    copago: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    tope_diario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tope_semanal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tope_mensual: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tope_trimestral: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tope_semestral: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tope_anual: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo_copago: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    id_admision: {
        type: DataTypes.CHAR(1),
        primaryKey: true,
        allowNull: false,
        references: {
            model: Admision,
            key: "id_admision",
        },
    },
    cant_bonificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_diario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_semanal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_mensual: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_trimestral: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_semestral: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    topeXprestador_anual: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fech_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    tableName: "planes_practicas",
    timestamps: false, // No utilizamos createdAt y updatedAt automáticos
});

// Relaciones opcionales si necesitas trabajar con ellas explícitamente
PlanPractica.belongsTo(Financiadora, { foreignKey: "id_financiadora" });
PlanPractica.belongsTo(Plan, { foreignKey: "id_plan" });
PlanPractica.belongsTo(TipoNomenclador, { foreignKey: "id_tipoNomenclador" });
PlanPractica.belongsTo(Practica, { foreignKey: "id_practica" });
PlanPractica.belongsTo(Admision, { foreignKey: "id_admision" });

export default PlanPractica;
