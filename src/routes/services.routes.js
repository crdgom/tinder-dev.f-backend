import { Router } from 'express';
import { createService } from '../controllers/services.controller.js';

const router = Router();

// ? endpoints for user routes (getUsers, getUserById, createUser, updateUser, deleteUser, getUsers)

/* router.get('/api/getCompanies',getCompanies);
router.get('/api/getCompany/:id',getCompanyById); */
router.post('/api/createService', createService);
/* router.put('/api/updateCompany/:id',updateCompany);
router.delete('/api/deleteCompany/:id', deleteCompany); */

export default router;