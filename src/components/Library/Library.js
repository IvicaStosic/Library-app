import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";

const Library = (props) => {
  const [books, setBooks] = useState();

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/feed/books", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status !== 200) {
          throw new Error("Failed to fetch books");
        }
        let resData = await res.json();
        // console.log(resData.books);
        // console.log(resData.message);
        setBooks(resData.books);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const showDetailsHandler = () => {
    setShow(true);
  };

  const closeDetailsHandler = () => {
    setShow(false);
  };

  // console.log(props.books);
  let pathname = "Library";
  if (props.location.pathname === "/library") {
    pathname = "My Library";
  }

  let booksList;
  // console.log(books);
  if (loading) {
    booksList = <Spinner />;
  } else if (books && !loading) {
    booksList = books.map((book) => (
      <Book
        key={book._id}
        bookId={book._id}
        title={book.title}
        author={book.author}
        description={book.description}
        privacy={book.private}
        pathname={pathname}
        showDetails={showDetailsHandler}
        closeDetails={closeDetailsHandler}
      />
    ));
  }

  let book;
  if (show) {
    book = <h1>Title</h1>;
  }

  return (
    <div>
      {pathname}
      {booksList}
      <Modal show={show} modalClosed={closeDetailsHandler}>
        {book}
      </Modal>
    </div>
  );
};

export default Library;
