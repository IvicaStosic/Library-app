import React, { useEffect, useState } from "react";
import Book from "../Book/Book";

const Library = (props) => {
  const [books, setBooks] = useState();

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
        console.log(resData.books);
        console.log(resData.message);
        setBooks(resData.books);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  console.log(props.books);
  let pathname = "Library";
  if (props.location.pathname === "/library") {
    pathname = "My Library";
  }

  let booksList;
  console.log(books);
  if (books) {
    booksList = books.map((book) => (
      <Book
        key={book._id}
        title={book.title}
        author={book.author}
        description={book.description}
        privacy={book.private}
        pathname={pathname}
      />
    ));
  }

  return (
    <div>
      {pathname}
      {booksList}
    </div>
  );
};

export default Library;
