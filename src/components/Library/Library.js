import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import { AuthContext } from "../context/Auth-context/Auth-context";
import { useContext } from "react";

const Library = (props) => {
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsInVzZXJJZCI6IjVmNWQ0OGQ4ODA2NGQ2NTNlNDQ5M2JhNCIsImlhdCI6MTU5OTk0OTAyNSwiZXhwIjoxNTk5OTUyNjI1fQ.7v8p1-h-ySV330H2tNMlTFOVeoufqifAce8536C8z5s";
  const auth = useContext(AuthContext);
  const token = auth.token;

  const [books, setBooks] = useState();

  const [book, setBook] = useState();

  const [creator, setCreator] = useState();

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  let pathname = "Library";
  if (props.location.pathname === "/library") {
    pathname = "My Library";
  }

  useEffect(() => {
    if (token) {
      const fetchBooks = async () => {
        if (pathname === "Library") {
          try {
            const res = await fetch("http://localhost:8080/feed/books", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            });
            console.log(res);
            if (res.status !== 200) {
              throw new Error("Failed to fetch books");
            }
            let resData = await res.json();
            // console.log(resData.message);
            setBooks(resData.books);
            setLoading(false);
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        } else if (pathname === "My Library") {
          try {
            const res = await fetch("http://localhost:8080/feed/own_books", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
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
        }
      };

      fetchBooks();
    }
  }, [pathname, token]);

  const showDetailsHandler = () => {
    setShow(true);
  };

  const closeDetailsHandler = () => {
    setShow(false);
  };

  // console.log(props.books);
  const viewDetailsHandler = (b) => {
    fetchSpecific(b);
  };

  const fetchSpecific = async (b) => {
    try {
      const res = await fetch(`http://localhost:8080/feed/specific/${b}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        throw new Error("Failed to fetch books");
      }
      let resData = await res.json();
      // console.log(resData.books);
      // console.log(resData.message);
      setBook(resData.book);
      setCreator(resData.creator);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  let detailedBook;
  if (show && book) {
    detailedBook = (
      <React.Fragment>
        <h1>{book.title}</h1>
        <h3>Author: {book.author}</h3>
        <p>Description: {book.description}</p>
        <p>Added by: {creator}</p>
      </React.Fragment>
    );
  }

  let booksList;
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
        viewDetails={viewDetailsHandler}
      />
    ));
  }
  console.log(book);

  return (
    <div>
      {pathname}
      {booksList}
      <Modal show={show} modalClosed={closeDetailsHandler}>
        {detailedBook}
      </Modal>
    </div>
  );
};

export default Library;
