import express from 'express';
import { getTeachers, createTeacher } from '../controllers/teacher.controller.js';

const router = express.Router();

router.get('/teachers', getTeachers);
router.post('/teachers', createTeacher);

export default router;
