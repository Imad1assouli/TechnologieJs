import app from './app';
import { MongoClient } from 'mongodb';
import BookService from './services/bookService';

const url = "mongodb://localhost:27017";
const dbName = "bookTracker";

const client = new MongoClient(url);
const bookService = new BookService(client, dbName);

client.connect().then(() => {
  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
}).catch(error => console.error('Failed to connect to MongoDB', error));
