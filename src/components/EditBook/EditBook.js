import React from "react";
import BookForm from "../BookForm/BookForm";

const EditBook = (props) => {
  console.log(props.location.pathname);
  return (
    <div>
      <BookForm pathname="edit" />
    </div>
  );
};

export default EditBook;
