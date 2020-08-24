import React, { useEffect, useCallback, useMemo } from "react";
import { useState } from "react";
import Input from "../UI/Input/Input";
import { updateObject } from "../../shared/util/utility";

const BookForm = (props) => {
  const [bookForm, setBookForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Title",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    author: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Author",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        placeholder: "Short description...",
      },
      value: "",
      validation: {},
      valid: true,
      touched: false,
    },
    privacy: {
      elementType: "input",
      name: "privacy",
      elementConfig: {
        type: "checkbox",
      },
      value: true,
      validation: {},
      valid: true,
      label: "Make book visible to others?",
    },
  });

  const [bookData, setBookData] = useState({
    author: "",
    title: "",
    description: "",
    privacy: true,
  });

  const [editMode, setEditMode] = useState(false);

  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    if (editBook) {
      setEditMode(true);
    }
  }, []);

  let addOrEdit = useMemo(() => {
    if (props.pathname === "edit") {
      setEditMode(true);
    } else if (props.pathname === "add") {
      setEditMode(false);
    }
  }, []);

  const startBookEdit = (bookId) => {
    setEditMode(true);
    const loadedBook = bookData.books.find((b) => b.id === bookId);
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(bookForm[inputIdentifier], {
      value:
        bookForm[inputIdentifier].name === "privacy"
          ? !e.target.checked
          : e.target.value,
      touched: true,
    });
    const updatedBookForm = updateObject(bookForm, {
      [inputIdentifier]: updatedFormElement,
    });
    console.log("updatedBookForm " + updatedBookForm.privacy.value);
    setBookForm(updatedBookForm);
    console.log(bookForm.title.value);
  };

  const bookSubmitHandler = (e) => {
    e.preventDefault();
    const formData = bookData;
    for (let formElementIdentifier in bookForm) {
      formData[formElementIdentifier] = bookForm[formElementIdentifier].value;
    }
    setBookData(formData);
    console.log(bookData);
    console.log(formData);
    fetchBooks();
  };

  const fetchBooks = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/feed/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book: bookData }),
      });
      console.log(res);
      if (res.status !== 201) {
        throw new Error("Failed to add book");
      }
      let resData = await res.json();
      console.log(resData.message);
      setBookData({
        author: "",
        title: "",
        description: "",
        privacy: true,
      });
      setBookForm({
        ...bookForm,
        privacy: {
          ...bookForm.privacy,
          value: true,
          checked: false,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const formElements = [];
  for (let key in bookForm) {
    formElements.push({
      id: key,
      config: bookForm[key],
    });
  }

  let form = (
    <form onSubmit={bookSubmitHandler}>
      {formElements.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          touched={formElement.config.touched}
          label={formElement.config.label}
          checked={formElement.config}
          change={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );

  return <div>{form}</div>;
};

export default BookForm;
