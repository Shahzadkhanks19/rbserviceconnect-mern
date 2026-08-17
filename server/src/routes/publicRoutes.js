import { Router } from 'express';
import { getEmployerOverview } from '../controllers/publicController.js';

const router = Router();

router.get('/employers/overview', getEmployerOverview);

export default router;
