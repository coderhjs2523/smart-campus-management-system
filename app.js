import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Session middleware
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

// Make session available in views (for User_Name, etc.)
app.use((req, res, next) => {
  res.locals.userName = req.session.userName;
  res.locals.userRole = req.session.userRole;
  next();
});

// Use routes
app.use('/', userRoutes);
app.use('/', complaintRoutes);
app.use('/', feedbackRoutes);
app.use('/', adminRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { Page_Title: '404 Not Found' });
});

// Start server
const PORT = process.env.PORT || 1906;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});