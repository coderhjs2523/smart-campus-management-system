import Complaint from '../models/complaintModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// Render Home Page
export const getHome = (req, res) => {
  const recentComplaints = []; 
  res.render('index', { 
    Page_Title: 'Smart Campus', 
    userName: req.session.userName || 'Guest', 
    card3_name: 'Pending Complaints',
    recentComplaints 
  });
};

// Render Login Page
export const getLogin = (req, res) => {
  res.render('login', { Page_Title: 'Login' });
};

// Render Register Page
export const getRegister = (req, res) => {
  res.render('register', { Page_Title: 'Register', formData: {} });
};

// Handle User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm_password, role } = req.body;

    if (password !== confirm_password) {
      return res.render('register', { error: 'Passwords do not match', formData: { name, email } });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'Email already exists', formData: { name, email } });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).render('register', { error: 'Server error' });
  }
};

// Handle User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: "Invalid email or password" });
    }

    // Set session
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userRole = user.role;

    // Redirect based on role
    if (user.role === 'admin') {
      res.redirect('/admin_dashboard');
    } else {
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: "Server error" });
  }
};

// Render Student Dashboard
export const getDashboard = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments({ user: req.session.userId });
    const resolvedComplaints = await Complaint.countDocuments({ user: req.session.userId, status: 'Resolved' });
    const pendingComplaints = await Complaint.countDocuments({ user: req.session.userId, status: 'Pending' });
    const recentComplaints = await Complaint.find({ user: req.session.userId }).sort({ createdAt: -1 }).limit(5);

    res.render('dashboard', { 
      Page_Title: 'Student Dashboard',
      userName: req.session.userName,
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      recentComplaints
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.render('logout', { Page_Title: 'Logged Out' });
  });
};