import React, { useEffect, useCallback } from "react";
import { useState, useContext } from "react";
import Input from "../UI/Input/Input";
import { updateObject } from "../../shared/util/utility";
import { Redirect } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from "./BookForm.module.css";
import Spinner from "../UI/Spinner/Spinner";
import { AuthContext } from "../context/Auth-context/Auth-context";

const BookForm = (props) => {
  const auth = useContext(AuthContext);
  const token = auth.token;
  // const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsInVzZXJJZCI6IjVmNWQ0OGQ4ODA2NGQ2NTNlNDQ5M2JhNCIsImlhdCI6MTU5OTk0OTAyNSwiZXhwIjoxNTk5OTUyNjI1fQ.7v8p1-h-ySV330H2tNMlTFOVeoufqifAce8536C8z5s";
  console.log(token);
  const bookDefault = {
    author: props.author ? props.author : "*Author",
    title: props.title ? props.title : "*Title",
    description: props.description ? props.description : "Short description...",
    privacy: props.privacy ? props.privacy : null,
  };

  const bookDefaultValue = {
    author: props.author ? props.author : "",
    title: props.title ? props.title : "",
    description: props.description ? props.description : "",
    privacy: props.privacy ? props.privacy : true,
  };

  const [bookData, setBookData] = useState({
    author: "",
    title: "",
    description: "",
    privacy: true,
  });

  const [bookForm, setBookForm] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: bookDefault.title,
      },
      value: bookDefaultValue.title,
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
        placeholder: bookDefault.author,
      },
      value: bookDefaultValue.author,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        placeholder: bookDefault.description,
      },
      value: bookDefaultValue.description,
      validation: {},
      valid: true,
      touched: false,
    },
    privacy: {
      elementType: "input",
      name: "privacy",
      elementConfig: {
        type: "checkbox",
        checked: !bookDefaultValue.privacy,
      },
      value: bookDefaultValue.privacy,
      validation: {},
      valid: true,
      label: "Make book visible to others?",
    },
  });

  const [editMode, setEditMode] = useState(false);

  const [fireRedirect, setFireRedirect] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let addOrEdit = () => {
      if (props.link === "/edit_book") {
        setEditMode(true);
        setBookData({
          title: props.title,
          author: props.author,
          description: props.description,
          privacy: props.privacy,
        });
      } else if (props.pathname === "addBook") {
        setEditMode(false);
      } else if (props.link === "/delete_book") {
        deleteBookHandler();
      }
    };
    addOrEdit();
  }, [
    props.pathname,
    bookData.title,
    props.author,
    props.description,
    props.privacy,
    props.title,
  ]);

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedConfig = updateObject(
      bookForm[inputIdentifier].elementConfig,
      {
        checked: e.target.checked,
      }
    );
    const updatedFormElement = updateObject(bookForm[inputIdentifier], {
      value:
        bookForm[inputIdentifier].name === "privacy"
          ? !e.target.checked
          : e.target.value,
      touched: true,
      elementConfig: updatedConfig,
    });
    const updatedBookForm = updateObject(bookForm, {
      [inputIdentifier]: updatedFormElement,
    });

    setBookForm(updatedBookForm);
  };

  const addBookHandler = (e) => {
    e.preventDefault();
    const formData = bookData;
    console.log("Add book handler " + formData.author);
    for (let formElementIdentifier in bookForm) {
      formData[formElementIdentifier] = bookForm[formElementIdentifier].value;
    }
    setBookData(formData);
    fetchBooks();
  };

  const deleteBookHandler = async () => {
    let url = `http://localhost:8080/feed/book/${props.id}`;
    console.log(url);
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Deleting a book failed!");
      }
      setLoading(false);
      setFireRedirect(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:8080/feed/book";
      let method = "POST";
      console.log(editMode);
      if (editMode) {
        url = `http://localhost:8080/feed/book/${props.id}`;
        method = "PUT";
      }
      console.log(method);
      console.log(bookData);
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ book: bookData }),
      });
      console.log(res);
      if (res.status !== 200 && res.status !== 201) {
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
        },
      });
      setLoading(false);
      setFireRedirect(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const formElements = [];
  for (let key in bookForm) {
    formElements.push({
      id: key,
      config: bookForm[key],
    });
  }

  let form = (
    <form onSubmit={addBookHandler} className={classes.BookForm}>
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
      <Button btnType="Success" type="submit">
        SUBMIT
      </Button>
    </form>
  );
  let spinner;
  if (loading) {
    spinner = <Spinner />;
  }

  return (
    <div>
      {spinner}
      {form}
      {fireRedirect && <Redirect to="/library" />}
    </div>
  );
};

export default BookForm;
