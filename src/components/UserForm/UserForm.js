import React, { useState } from "react";
import Input from "../UI/Input/Input";

const UserForm = (props) => {
  const [userForm, setUserForm] = useState({
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "New password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: 'Your new password:'
    },
    newPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Repeat new password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: 'Confirm new password:'
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: 'Your new E-Mail:'
    },
    location: {
      elementType: "input",
      elementConfig: {
        type: "location",
        placeholder: "Location",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
      label: 'Your new location:'
    },
    /**
     * ! TODO finish privacy field and then rest of component
     */
    privacy: {
      elementType: "input",
      elementConfig: {
        type: "checkbox",
      },
      value: true,
      validation: {},
      valid: true,
      label: 'Make e-mail public?'
    },
  });
  const formElements = [];
  for (let key in userForm) {
    formElements.push({
      id: key,
      config: userForm[key],
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

export default UserForm;
