import express from 'express';
import multer from 'multer';
import path from 'path';
import { requireLogin } from '../middlewares/auth.js';
import { getRaiseComplaint, submitComplaint, getMyComplaints } from '../controllers/complaintController.js';

const router = express.Router();

// Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// Raise complaint page (protected)
router.get('/raise_complaint', requireLogin, getRaiseComplaint);

// Handle complaint form submission (protected)
router.post('/submit', requireLogin, upload.single('problem_image'), submitComplaint);

// My complaints page (protected)
router.get('/my_complaint', requireLogin, getMyComplaints);

export default router;