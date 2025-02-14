import Practica from "../models/Practica.js";
import {Sequelize} from "sequelize";

// Obtener todas las practicas
export const getPracticas = async (req,res) => {
    try {
        const practicas = await Practica.findAll();
        return res.json(practicas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las prácticas' });
    }
};

// Obtener una practica por ID
export const getPracticasById = async (req,res) =>{
    try{
        const practica = await Practica.findByPk(req.params.id);
        if(!practica){
            return res.status(404).json({error: 'No se encontro la practica'});
        }
        return res.json(practica);
    }catch (error){
        return res.status(500).json({ error: 'Error al obtener la practica'});
    }
};

// Crear nueva practica
export const createPractica = async (req,res) =>{
    try{
        const {id_practica} = req.body;
        const existePractica = await Practica.findByPk(id_practica);
        if(existePractica){
            return res.status(409).json({error: 'La practica ya existe'});
        }
        const nuevaPractica = Practica.create(req.body);
        return res.status(201).json(nuevaPractica);
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        return res.status(500).json({ error: 'Error al crear la practica'});
    }
};

// Actualizar una practica
export const updatePractica = async (req,res) =>{
    try{
        const practica = await Practica.findByPk(req.params.id);
        if(!practica){
            return res.status(404).json({error: 'No se encontro la practica'});
        }
        await practica.update(req.body);
        return res.json(practica);
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        return res.status(500).json({error: "Error al actualizar la practica"});
    }
}

// Eliminar una practica
export const deletePractica = async (req,res) =>{
    try{
        const practica = await Practica.findByPk(req.params.id);
        if(!practica){
            return res.satatus(404).json({error: 'No se econtro la practica'});
        }
        await practica.destroy();
        return res.json({message: 'Practica eliminada correctamente'});

    }catch(error){
        return res.status(500).json({error: 'Error al eliminar la practica'});
    }
}