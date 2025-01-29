import express from 'express';
import {getPlanes, getPlanesById, createPlan, updatePlan, deletePlan} from '../controllers/planesController.js';

const router = express.Router();

router.get('/', getPlanes); // Obtener todos los planes
router.get('/:id', getPlanesById); // Obtener un plan por ID
router.post('/',createPlan); // Crear un plan
router.put('/:id', updatePlan); // Actualizar un plan
router.delete('/:id',deletePlan); // Eliminar un plan

export default router;