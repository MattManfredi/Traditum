import Prestador from "../models/Prestador.js";
import Plan from "../models/Plan.js";
import Practica from "../models/Practica.js";
import TipoNomenclador from "../models/TipoNomenclador.js";
import PrestadorPractica from "../models/PrestadorPractica.js";
import PrestadorPlan from "../models/PrestadorPlan.js";



export const getPrestadores = async (req, res) => {
    try {
        const prestadores = await Prestador.findAll();
        return res.json(prestadores);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los prestadores' });
    }
};

export const getPrestadorById = async (req, res) => {
    try {
        // Buscar el prestador por ID        
        const prestador = await Prestador.findByPk(req.params.id);
        // Rechazar si no se encuentra el prestador
        if (!prestador) {
            return res.status(404).json({ error: "Prestador no encontrado" });
        }      
        // Obtener los planes Asignados al prestador
        const {planesCoberAsignados, planesBristolAsignados} = await obtenerPlanes(req.params.id);
        // Obtener los nomencladores asignados al prestador
        const nomencladoresAsignados = await obtenerNomenclador(req.params.id);
        // Descartar los planes que ya estan asignados y obtener los que no tienen asignados 
        const {planesNoAsignadosCober, planesNoAsignadosBristol} = await obtenerPlanesNoAsignados(planesCoberAsignados,planesBristolAsignados);
        // Descartar los nomencladores que ya estan asignados y obtener los que no tienen asignados
        const nomencladoresNoAsignados = await obtenerNomencladorNoAsignados(nomencladoresAsignados);
        return res.json({
            prestador,
            planes_asignados_cober: planesCoberAsignados,
            planes_no_asignados_cober: planesNoAsignadosCober,
            planes_asignados_bristol: planesBristolAsignados,
            planes_no_asignados_bristol: planesNoAsignadosBristol,
            nomencladores_asignados: nomencladoresAsignados,
            nomencladores_no_asignados: nomencladoresNoAsignados
        });

    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el prestador" });
    }
};

const obtenerPlanes = async (id_prestador) => {
    const prestadorPlanesCober = await PrestadorPlan.findAll({ where: { id_prestador: id_prestador, id_financiadora: '30598797478' } });
    const planesCoberAsignados = prestadorPlanesCober.map(pp => pp.id_plan);
    const prestadorPlanesBristol = await PrestadorPlan.findAll({ where: { id_prestador: id_prestador, id_financiadora: '30707972552' } });
    const planesBristolAsignados = prestadorPlanesBristol.map(pp => pp.id_plan);
    return {planesCoberAsignados, planesBristolAsignados};
};
const obtenerPlanesNoAsignados = async (planesCoberAsignados,planesBristolAsignados) => {
    const todosLosPlanesCober = await Plan.findAll({ where: { id_financiadora: '30598797478' }, attributes: ["id_plan","id_financiadora"] });
    const todosLosPlanesBristol = await Plan.findAll({ where: { id_financiadora: '30707972552' }, attributes: ["id_plan","id_financiadora"] });
    const planesNoAsignadosCober = todosLosPlanesCober.filter(plan => !planesCoberAsignados.includes(plan.id_plan)).map(plan => plan.id_plan);
    const planesNoAsignadosBristol = todosLosPlanesBristol.filter(plan => !planesBristolAsignados.includes(plan.id_plan)).map(plan => plan.id_plan);
    return {planesNoAsignadosCober, planesNoAsignadosBristol};
};

const obtenerNomenclador = async (id_prestador) => {
    const prestadorPracticas = await PrestadorPractica.findAll({ where: { id_prestador: id_prestador } });
    const nomencladoresAsignados = [...new Set(prestadorPracticas.map(pp => pp.id_tipoNomenclador))];
    return nomencladoresAsignados;
};

const obtenerNomencladorNoAsignados = async (nomencladoresAsignados) => {
    const todosTiposNomencladores = await TipoNomenclador.findAll();
    const nomencladoresNoAsignados = todosTiposNomencladores.filter(tipoNomenclador=> !nomencladoresAsignados.includes(tipoNomenclador.id_tipoNomenclador)).map(tipoNomenclador => tipoNomenclador.id_tipoNomenclador);
    return nomencladoresNoAsignados;
}

export const createPrestador = async (req, res) => {
    try{
        const {id_prestador} = req.body;
        const existePrestador = await Prestador.findByPk(id_prestador);
        if(existePrestador){
            return res.status(409).json({error: 'El prestador ya existe'});
        }
        const nuevoPrestador = await Prestador.create(req.body);
        return res.status(201).json(nuevoPrestador);
    }catch(error){
        return res.status(500).json({error: 'Error al crear el prestador'});
    }
};

export const updatePrestador = async (req, res) => {
    try{
        // const prestador = await Prestador.findByPk(req.params.id);
        // if(!prestador){
        //     return res.status(404).json({error: 'Prestador no encontrado'})
        // }
        // await prestador.update(req.body);
        
        
        return res.json('Esto deberia haber actualizado algo');
    }catch(error){
        return res.status(500).json({error: 'Error al actualizar el prestador'});
    }
};

export const deletePrestador = async (req, res) => {
    try{
        const prestador = await Prestador.findByPk(req.params.id);;
        if (!prestador){
            return res.status(404).json({error: 'Prestador no encontrado'});
        }
        await prestador.destroy();
        return res.json({message: 'Prestador eliminado correctamente'});
    }catch(error){
        return res.status(500).json({error: 'Error al eliminar el prestador'});
    }
};

export const addPlanToPrestador = async (req, res) => {};
export const addPracticaToPrestador = async (req, res) => {};
export const removePlanFromPrestador = async (req, res) => {};
export const removePracticaFromPrestador = async (req, res) => {};