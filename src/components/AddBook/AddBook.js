import React from "react";
import BookForm from "../BookForm/BookForm";

const AddBook = (props) => {
  return (
    <div>
      <h3>Add Book</h3>
      <BookForm pathname="addBook" {...props} />
    </div>
  );
};

export default AddBook;
