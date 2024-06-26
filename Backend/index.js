import dotenv from 'dotenv';
import connectToMongo from './db.js'; // Assuming db.js exports connectToMongo as default
import express from 'express';
import cors from 'cors';
dotenv.config();
connectToMongo(); // Connect to MongoDB

const app = express();
const port = process.env.PORT | 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
