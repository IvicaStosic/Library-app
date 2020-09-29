import React from "react";
import classes from "./Book.module.css";
import Button from "../UI/Button/Button";

const Book = (props) => {
  const book = {
    id: props.bookId,
    title: props.title,
    author: props.author,
    description: props.description,
    privacy: props.privacy,
  };

  const pickBook = e => {
    props.showDetails()
    props.viewDetails(book.id)
  }

  let buttonGroup = (
    <Button btnType="Success" clicked={pickBook}>
      DETAILS...
    </Button>
  );
  if (props.pathname === "My Library") {
    buttonGroup = (
      <div>
        <Button btnType="Success" clicked={pickBook}>
          DETAILS...
        </Button>
        <Button btnType="Success" link={"/edit_book"} {...book}>
          EDIT
        </Button>
        <Button btnType="Danger" link={"/delete_book"} {...book}>
          DELITE
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.Book}>
      <h3 className={classes.Title}>{book.title}</h3>
      <h3>Author: {props.author}</h3>
      {buttonGroup}
    </div>
  );
};

export default Book;
