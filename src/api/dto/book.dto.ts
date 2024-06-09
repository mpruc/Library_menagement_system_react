export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  yearOfPublish: number;
  availableCopies: number;
}
export interface CreateBookResponseDto {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  yearOfPublish: number;
  availableCopies: number;
}
