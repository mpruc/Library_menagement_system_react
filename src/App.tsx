import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./login-form/LoginForm";
import BooksList from "./books-list/BooksList";
import SingleBook from "./single-book/SingleBook";
import MainPage from "./main-page/MainPage";
import Loans from "./loans/Loans";
import BookDetails from "./book-details/BookDetails";
import Reviews from "./reviews/Reviews";
import ApiProvider from "./api/dto/ApiProvider";
import BooksListLibrarian from "./books-list/BooksListLibrarian";
import SingleBookLibrarian from "./single-book/SingleBookLibrarian";
import BookDetailsLibrarian from "./book-details/BookDetailsLibrarian";
import MainPageLibrarian from "./main-page/MainPageLibrarian";
import AllBookDetails from "./book-details/AllBookDetails";
import RegistrationForm from "./register/RegistrationForm";
import Users from "./users/Users";
import LoansUser from "./loans/LoansUser";
import AddLoan from "./loans/AddLoan";
import DeleteLoan from "./loans/DeleteLoan";
import GetMe from "./users/GetMe";
import AddBook from "./books-list/AddBook";
import DeleteBook from "./books-list/DeleteBook";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import GetMeLibrarian from "./users/GetMeLibrarian";
import UpdateBook from "./books-list/UpdateBook";
import DeleteUser from "./users/DeleteUser";
import UpdateUser from "./users/UpdateUser";
import UpdateLoan from "./loans/UpdateLoan";

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/main_librarian" element={<MainPageLibrarian />} />
            <Route path="/all_bookdetails" element={<AllBookDetails />} />
            <Route path="/books-librarian" element={<BooksListLibrarian />} />
            <Route path="/books" element={<BooksList />} />
            <Route
              path="/book_librarian/:id"
              element={<SingleBookLibrarian />}
            />
            <Route path="/book/:id" element={<SingleBook />} />
            <Route
              path="/book-details_librarian/:id"
              element={<BookDetailsLibrarian />}
            />
            <Route path="/book-details/:id" element={<BookDetails />} />
            <Route path="/get_me" element={<GetMe />} />
            <Route path="/get_me_librarian" element={<GetMeLibrarian />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:id" element={<Reviews />} />
            <Route path="/loans" element={<LoansUser />} />
            <Route path="/loans_librarian" element={<Loans />} />
            <Route path="/add_user" element={<RegistrationForm />} />
            <Route path="/delete_user" element={<DeleteUser />} />
            <Route path="/update_user" element={<UpdateUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add_loan" element={<AddLoan />} />
            <Route path="/delete_loan" element={<DeleteLoan />} />
            <Route path="/update_loan" element={<UpdateLoan />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="/delete_book" element={<DeleteBook />} />
            <Route path="/update_book/:id" element={<UpdateBook />} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </Router>
  );
}

export default App;
