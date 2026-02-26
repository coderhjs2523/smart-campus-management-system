import Feedback from '../models/feedbackModel.js';

// Render Feedback Page
export const getFeedbackPage = (req, res) => {
  res.render('feedback', { Page_Title: 'Feedback' });
};

// Handle Feedback Submission
export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    const feedback = new Feedback({
      user: req.session.userId,
      name,
      email,
      message,
      rating
    });

    await feedback.save();

    res.render('Form_submit', { Page_Title: 'Feedback Submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

