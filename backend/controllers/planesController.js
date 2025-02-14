import Plan from "../models/Plan.js";
import {Sequelize} from "sequelize";

// Obtener todos los planes
export const getPlanes = async (req,res)=>{
    try{
        const planes = await Plan.findAll();
        const planesCober = planes.filter(plan => plan.id_financiadora === '30598797478');
        const planesBristol = planes.filter(plan => plan.id_financiadora === '30707972552');
        return res.json({planesCober, planesBristol});
    }catch(error){
        return res.status(500).json({error: 'Error al obtener los planes'});
    }
};

// Obtener un plan por ID
export const getPlanById = async (req,res) =>{
    try{
        const plan = await Plan.findByPk(req.params.id);
        if(!plan){
            return res.status(404).json({error: 'No se econtro el plan'});
        }
        return res.json(plan);
    }catch (error){
        return res.status(500).json({error: 'Error al obtener el plan'});
    }
};

// Crear nuevo plan
export const createPlan = async (req,res)=>{
    try{
        const {id_plan} = req.body;
        // Verificar si el plan existe
        const existePlan = await Plan.findByPk(id_plan);
        if (existePlan){
            return res.status(409).json({error: 'El plan ya existe'})
        }
        const nuevoPlan = await Plan.create(req.body);
        return res.status(201).json(nuevoPlan);
    }catch(error){
        if (error instanceof Sequelize.ValidationError){
            return res.status(400).json({error: error.errors.map(e=>e.message)});
        }
        return res.status(500).json({error: 'Error al crear el plan'});
    }
};

// Actualizar plan existente
export const updatePlan = async (req,res)=>{
    try{
        const plan = await Plan.findByPk(req.params.id);
        if(!plan){
            return res.status(404).json({error: 'No se encontro el plan'});
        }
        await plan.update(req.body);
        return res.json(plan);
    }catch(error){
        if (error instanceof Sequelize.ValidationError){
            return res.status(400).json({error: error.errors.map(e=>e.message)});
        }
        return res.status(500).json({error: 'Error al actualizar el plan'});
    }
};

// Eliminar un plan
export const deletePlan = async (req,res)=>{
    try{
        const plan = await Plan.findByPk(req.params.id);
        if (!plan){
            return res.status(404).json({error: 'No se encontro el plan'});
        }
        await plan.destroy();
        return res.json({message: 'Plan eliminado correctamente'});
    }catch(error){
        return res.status(500).json({error: 'Error al eliminar el plan'});
    }
};