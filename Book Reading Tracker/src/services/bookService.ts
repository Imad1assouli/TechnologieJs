import { MongoClient, ObjectId } from 'mongodb';
import { Book } from '../models/bookModel';

class BookService {
  private client: MongoClient;
  private dbName: string;

  constructor(client: MongoClient, dbName: string) {
    this.client = client;
    this.dbName = dbName;
  }

  async addBook(book: Book): Promise<void> {
    const db = this.client.db(this.dbName);
    await db.collection('books').insertOne(book);
  }

  async getAllBooks(): Promise<Book[]> {
    const db = this.client.db(this.dbName);
    return await db.collection('books').find().toArray().then((books: any[]) => 
        books.map((book: any) => ({ ...book, _id: book._id ? new ObjectId(book._id) : undefined }))
    );
  }

  async deleteBook(bookId: ObjectId): Promise<void> {
    const db = this.client.db(this.dbName);
    await db.collection('books').deleteOne({ _id: bookId });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default BookService;
