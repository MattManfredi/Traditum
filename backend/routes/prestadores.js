
import express from 'express';
// import {getPrestadores, getPrestadorById, createPrestador, updatePrestador, deletePrestador} from '../controllers/prestadoresController.js';

import { getPrestadores } from '../controllers/prestadoresController.js';
import { getPrestadorById } from '../controllers/prestadoresController.js';
import { createPrestador } from '../controllers/prestadoresController.js';
import { updatePrestador } from '../controllers/prestadoresController.js';
import { deletePrestador } from '../controllers/prestadoresController.js';

const router = express.Router();

router.get('/', getPrestadores); // Obtener todos los prestadores
router.get('/:id', getPrestadorById); // Obtener un prestador por ID
router.post('/', createPrestador); // Crear un prestador
router.put('/:id', updatePrestador); // Actualizar un prestador
router.delete('/:id', deletePrestador); // Eliminar un prestador

export default router;