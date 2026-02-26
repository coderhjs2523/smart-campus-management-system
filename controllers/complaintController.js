import Complaint from '../models/complaintModel.js';

// Render Raise Complaint Page
export const getRaiseComplaint = (req, res) => {
  res.render('raise_complaint', { Page_Title: 'Raise Complaint' });
};

// Handle Complaint Form Submission
export const submitComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    let problem_image = '';
    if (req.file) {
      problem_image = req.file.filename; 
    }

    const complaint = new Complaint({
      user: req.session.userId,
      title,
      description,
      category,
      priority,
      problem_image,
      status: 'Pending',
    });

    await complaint.save();

    res.render('Form_submit', { Page_Title: 'Complaint Submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render My Complaints Page
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.session.userId }).sort({ createdAt: -1 });

    res.render('my_complaint', {
      Page_Title: 'My Complaints',
      complaints
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};