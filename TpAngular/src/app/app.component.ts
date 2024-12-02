import { Component } from '@angular/core';
import { Book } from './shared/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP Angular Books';

  books: Book[] = [
    new Book(1, 'Book One', true),
    new Book(2, 'Book Two', false),
    new Book(3, 'Book Three', true)
  ];

  listBooks() {
    return this.books;
  }

  isBooksEmpty() {
    return this.books.length === 0;
  }

  toggleReadStatus(book: Book) {
    book.isRead = !book.isRead;
  }
}
