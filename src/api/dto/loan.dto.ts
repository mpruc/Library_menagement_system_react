export interface CreateLoanDto {
  book: number;
  user: number;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
}

export interface GetLoanResponseDto {
  loanId: number;
  bookId: {
    id: number;
  };
  user: {
    id: number;
  };
  loanDate: string;
  dueDate: string;
  returnDate?: string | null;
}

export interface CreateLoanResponseDto {
  loanId: number;
  book: number;
  user: number;
  loanDate: string;
  dueDate: string;
  returnDate?: string | null;
}
