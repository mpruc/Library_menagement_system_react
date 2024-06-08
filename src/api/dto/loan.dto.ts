export interface CreateLoanDto {
  bookId: number;
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
  bookId: number;
  user: number;
  loanDate: string;
  dueDate: string;
  returnDate?: string | null;
}
