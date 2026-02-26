import Feedback from '../models/feedbackModel.js';
import Complaint from '../models/complaintModel.js';
import User from '../models/userModel.js';

// Render Admin Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const totalUsers = await User.countDocuments();
    const recentComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

    res.render('admin_dashboard', {
      Page_Title: 'Admin Dashboard',
      card1_name: 'Total Complaints',
      card2_name: 'Resolved Complaints',
      card3_name: 'Pending Complaints',
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      totalUsers,
      recentComplaints
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render Admin Analytics Page
export const getAdminAnalytics = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const totalUsers = await User.countDocuments();

    res.render('admin_analytics', {
      Page_Title: 'Admin Analytics',
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      totalUsers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get all complaints for admin
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name');

    res.render('admin_complaints', {
      Page_Title: 'All Complaints',
      complaints
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update complaint status (admin only)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Complaint.findByIdAndUpdate(req.params.id, { status });
    res.redirect('/admin_complaints');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
// Render all feedbacks for admin
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name');

    res.render('admin_feedback', {
      Page_Title: 'All Feedbacks',
      feedbacks
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};