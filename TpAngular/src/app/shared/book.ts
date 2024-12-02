export class Book {
  id: number;
  name: string;
  isRead: boolean;
  constructor(id: number, name: string, isRead: boolean) {
    this.id = id;
    this.name = name;
    this.isRead = isRead;
  }
}

