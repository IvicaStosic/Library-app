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

  let buttonGroup = (
    <Button btnType="Success" clicked={props.showDetails}>
      DETAILS...
    </Button>
  );
  if (props.pathname === "My Library") {
    buttonGroup = (
      <div>
        <Button btnType="Success" clicked={props.showDetails} {...book}>
          DETAILS...
        </Button>
        <Button btnType="Success" link={"/edit_book"} {...book}>
          EDIT
        </Button>
        <Button btnType="Success" link={"/delete_book"} {...book}>
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
