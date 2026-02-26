import express from 'express';
import { isAdmin, requireLogin } from '../middlewares/auth.js';
import {
  getAdminDashboard,
  getAdminAnalytics,
  getAllComplaints,
  updateComplaintStatus,
  getAllFeedbacks
} from '../controllers/adminController.js';

const router = express.Router();

// Protect all admin routes
router.use(requireLogin, isAdmin);

// Admin dashboard home
router.get('/admin_dashboard', getAdminDashboard);

// Admin analytics page
router.get('/admin_analytics', getAdminAnalytics);

// All complaints
router.get('/admin_complaints', getAllComplaints);
router.post('/admin_update_complaint/:id', updateComplaintStatus);

// All feedback
router.get('/admin_feedback', getAllFeedbacks);

export default router;