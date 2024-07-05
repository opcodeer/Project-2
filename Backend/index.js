import dotenv from 'dotenv';
import connectToMongo from './db.js'; // Assuming db.js exports connectToMongo as default
import express from 'express';
import cors from 'cors';
import path from 'path';
dotenv.config();
connectToMongo(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace with your frontend domain
  credentials: true
}));
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/build")));

// Routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Serve React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
