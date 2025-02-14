import express from 'express';
import {getPracticas, getPracticasById, createPractica, updatePractica, deletePractica} from '../controllers/practicasController.js';

const router = express.Router();

router.get('/', getPracticas); // Obtener todas las practicas
router.get('/:id', getPracticasById); // Obtener una practica por ID
router.post('/', createPractica); // Crear una practica
router.put('/:id', updatePractica); // Actualizar una practica
router.delete('/:id', deletePractica); // Eliminar una practica



export default router;