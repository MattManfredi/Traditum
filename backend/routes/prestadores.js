import express from 'express';
import {getPrestadores, getPrestadoresById, createPrestador, updatePrestador, deletePrestador} from '../controllers/prestadoresController.js';

const router = express.Router();

router.get('/', getPrestadores); // Obtener todos los prestadores
router.get('/:id', getPrestadoresById); // Obtener un prestador por ID
router.post('/', createPrestador); // Crear un prestador
router.put('/:id', updatePrestador); // Actualizar un prestador
router.delete('/:id', deletePrestador); // Eliminar un prestador

export default router;