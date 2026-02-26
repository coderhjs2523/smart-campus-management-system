import express from 'express';
import { getHome, getLogin, getRegister, registerUser, loginUser, getDashboard, logoutUser } from '../controllers/userController.js';
import { requireLogin, isStudent } from '../middlewares/auth.js';

const router = express.Router();

// Home page (public)
router.get('/', getHome);

// Authentication pages (public)
router.get('/login', getLogin);
router.get('/register', getRegister);

// Handle form submissions (public)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Dashboard (protected, student only)
router.get('/dashboard', requireLogin, isStudent, getDashboard);

// Logout
router.get('/logout', logoutUser);

export default router;