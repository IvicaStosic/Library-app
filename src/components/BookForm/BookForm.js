import React from "react";
import { useState } from "react";
import Input from "../UI/Input/Input";

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
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
    },
    privacy: {
      elementType: "input",
      elementConfig: {
        type: "checkbox",
      },
      value: true,
      validation: {},
      valid: true,
      label: "Make book visible to others?",
    },
  });

  const formElements = [];
  for (let key in bookForm) {
    formElements.push({
      id: key,
      config: bookForm[key],
    });
  }

  let form = (
    <form>
      {formElements.map((e) => {
        return (
          <Input
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            value={e.config.value}
            touched={e.config.touched}
            label={e.config.label}
          >
            <button>Submit</button>
          </Input>
        );
      })}
    </form>
  );

  return <div>{form}</div>;
};

export default BookForm;
