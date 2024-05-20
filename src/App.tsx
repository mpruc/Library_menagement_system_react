import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./login-form/LoginForm";
import BooksList from "./books-list/BooksList";
import SingleBook from "./single-book/SingleBook";
import MainPage from "./main-page/MainPage";
import Loans from "./loans/Loans";
import BookDetails from "./book-details/BookDetails";
import Reviews from "./reviews/Reviews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
    </Router>
  );
}

export default App;
