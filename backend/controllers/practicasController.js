import Practica from "../models/Practica";

// Obtener todas las practicas
export const getPracticas = async (req,res) => {
    try {
        const practicas = await Practica.findAll();
        res.json(practicas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las prácticas' });
    }
};

// Obtener una practica por ID
export const getPracticasById = async (req,res) =>{
    try{
        const practica = await Practica.findByPk(req.params.id);
        if(!practica){
            res.status(404).json({error: 'No se encontro la practica'});
            res.json(practica);
        }
    }catch (error){
        res.status(500).json({ error: 'Error al obtener la practica'});
    }
}