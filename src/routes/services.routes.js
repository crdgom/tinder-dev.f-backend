import { Router } from 'express';
import {getServices, getServiceById, createService, updateService } from '../controllers/services.controller.js';

const router = Router();

// ? endpoints for user routes (getUsers, getUserById, createUser, updateUser, deleteUser, getUsers)

router.get('/api/getServices',getServices);
router.get('/api/getService/:id',getServiceById);
router.post('/api/createService', createService);
router.put('/api/updateService/:id',updateService);


export default router;