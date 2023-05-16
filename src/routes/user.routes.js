import { Router } from 'express';
import { getUsers, updateUser , getUserById , createUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

// ? endpoints for user routes (getUsers, getUserById, createUser, updateUser, deleteUser, getUsers)

router.get('/api/getUsers',getUsers);
router.get('/api/getUser/:id',getUserById);
router.post('/api/createUser', createUser);
router.put('/api/updateUser/:id',updateUser);
router.delete('/api/deleteUser/:id', deleteUser);

export default router;

