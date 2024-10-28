import { ObjectId } from 'mongodb';

export enum Status {
  READ = "Read",
  REREAD = "Re-read",
  DNF = "DNF",
  CURRENTLY_READING = "Currently reading",
  RETURNED_UNREAD = "Returned Unread",
  WANT_TO_READ = "Want to read"
}

export enum Format {
  PRINT = "Print",
  PDF = "PDF",
  EBOOK = "Ebook",
  AUDIOBOOK = "AudioBook"
}

export class Book {
  public _id?: ObjectId;
  
  constructor(
    public title: string,
    public author: string,
    public pages: number,
    public status: Status,
    public price: number,
    public pagesRead: number = 0,
    public format: Format,
    public suggestedBy?: string,
    public finished: boolean = false
  ) {}

  currentlyAt(): string {
    const percentage = (this.pagesRead / this.pages) * 100;
    return `${percentage.toFixed(2)}%`;
  }

  updateReadingProgress(newPagesRead: number): void {
    this.pagesRead = newPagesRead;
    if (this.pagesRead >= this.pages) {
      this.finished = true;
      this.status = Status.READ;
    }
  }
}
