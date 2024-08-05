import dotenv from 'dotenv';
dotenv.config();
import connectToMongo from './db.js'; // Ensure this file exports connectToMongo correctly
import express from 'express';
import cors from 'cors';
import path from 'path';

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace with your frontend domain for better security
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Serve React App for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`NoteHub backend listening on port ${port}`);
});
