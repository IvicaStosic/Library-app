import React from "react";
import classes from "./Book.module.css";
import BookForm from "../BookForm/BookForm";

const Book = (props) => {
  const editBook = props.children;

  let button = <button>more...</button>;
  if (props.pathname === "My Library") {
    button = (
      <div>
        <button>more...</button>
        <button onCLick={editBook}>edit</button>
      </div>
    );
  }

  const bookData = <BookForm editBook={editBook} />;

  return (
    <div className={classes.Book}>
      <h3 className={classes.Title}>Title: {props.title}</h3>
      <h3>author: {props.author}</h3>
      {button}
    </div>
  );
};

export default Book;
