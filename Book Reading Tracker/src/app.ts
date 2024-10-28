import express from 'express';
import path from 'path';
import bookController from './controllers/bookController';

const app = express();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// API route for books
app.use('/api/books', bookController);

// Root route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default app;
