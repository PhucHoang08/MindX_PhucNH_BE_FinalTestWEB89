import express from 'express';
import { getPositions, createPosition } from '../controllers/teacherPosittion.controller.js';

const router = express.Router();

router.get('/teacher-positions', getPositions);
router.post('/teacher-positions', createPosition);

export default router;
