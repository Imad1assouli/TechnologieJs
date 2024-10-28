import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import BookService from '../services/bookService';
import { Book } from '../models/bookModel';

const router = express.Router();
const bookService = new BookService(new MongoClient('mongodb://localhost:27017'), 'bookTracker');

router.post('/', async (req, res) => {
  try {
    const bookData: Book = req.body;
    await bookService.addBook(bookData);
    res.status(201).json(bookData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

router.delete('/:id', async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  try {
    await bookService.deleteBook(bookId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;
