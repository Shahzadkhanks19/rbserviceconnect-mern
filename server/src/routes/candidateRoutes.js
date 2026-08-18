import { Router } from 'express';
import { allowRoles, requireAuth } from '../middleware/auth.js';
import {
  changePassword,
  createApplication,
  deleteResume,
  getOverview,
  getProfile,
  getRecommendedJobs,
  getSavedJobs,
  listApplications,
  saveJob,
  unsaveJob,
  updateAccount,
  updateProfile,
  updateResume,
  uploadResume,
  withdrawApplication,
} from '../controllers/candidateController.js';
import {
  createJobAlert,
  deleteJobAlert,
  getNotifications,
  getPrivacy,
  listJobAlerts,
  readAllNotifications,
  readNotification,
  updateJobAlert,
  updatePrivacy,
} from '../controllers/candidateEngagementController.js';

const router=Router();
router.use(requireAuth,allowRoles('candidate'));
router.get('/overview',getOverview);
router.get('/profile',getProfile);
router.put('/profile',updateProfile);
router.put('/resume',updateResume);
router.post('/resume/upload',uploadResume);
router.delete('/resume',deleteResume);
router.get('/saved-jobs',getSavedJobs);
router.put('/saved-jobs/:slug',saveJob);
router.delete('/saved-jobs/:slug',unsaveJob);
router.get('/applications',listApplications);
router.post('/applications',createApplication);
router.patch('/applications/:id/withdraw',withdrawApplication);
router.get('/recommended-jobs',getRecommendedJobs);
router.get('/job-alerts',listJobAlerts);
router.post('/job-alerts',createJobAlert);
router.put('/job-alerts/:id',updateJobAlert);
router.delete('/job-alerts/:id',deleteJobAlert);
router.get('/notifications',getNotifications);
router.patch('/notifications/read-all',readAllNotifications);
router.patch('/notifications/:id/read',readNotification);
router.get('/privacy',getPrivacy);
router.patch('/privacy',updatePrivacy);
router.patch('/account',updateAccount);
router.patch('/password',changePassword);
export default router;
