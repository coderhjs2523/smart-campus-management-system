// Require login
export const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Check if student
export const isStudent = (req, res, next) => {
  if (req.session.userRole !== 'student') {
    return res.status(403).send('Access denied');
  }
  next();
};

// Check if admin
export const isAdmin = (req, res, next) => {
  if (req.session.userRole !== 'admin') {
    return res.status(403).send('Access denied');
  }
  next();
};