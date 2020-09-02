import React from "react";
import BookForm from "../BookForm/BookForm";

const EditBook = (props) => {
  const book = props.location.state.book;
  console.log(props.location);
  return (
    <div>
      <h3>EDIT BOOK</h3>
      <BookForm pathname="editBook" {...book} {...props} />
    </div>
  );
};

export default EditBook;
