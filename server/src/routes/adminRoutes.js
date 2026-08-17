import { Router } from 'express';
import { listRecruiters, updateRecruiterStatus } from '../controllers/adminController.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, allowRoles('admin'));
router.get('/recruiters', listRecruiters);
router.patch('/recruiters/:id/status', updateRecruiterStatus);

export default router;
