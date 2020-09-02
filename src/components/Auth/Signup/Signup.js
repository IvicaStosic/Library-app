import React, { useState } from "react";
import { updateObject } from "../../../shared/util/utility";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const Signup = (props) => {
  const [signupForm, setSignupForm] = useState({
    username: {
      elementType: "input",
      value: "",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      valid: false,
      touched: false,
    },
    repeatPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Repeat password",
      },
      value: "",
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  const inputChangeHandler = (e, elementName) => {
    const updatedSignupForm = updateObject(signupForm, {
      [elementName]: updateObject(signupForm[elementName], {
        value: e.target.value,
        touched: true,
      }),
    });
    setSignupForm(updatedSignupForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const switchAuthHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElements = [];
  for (let key in signupForm) {
    formElements.push({
      id: key,
      config: signupForm[key],
    });
  }

  let form = (
    <form onSubmit={submitHandler}>
      {formElements.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          touched={formElement.config.touched}
          changed={(e) => inputChangeHandler(e, formElement.id)}
        />
      ))}
      <Button btnType="Success">SUBMIT</Button>
    </form>
  );

  return (
    <div>
      <h1>{isSignup ? "SIGNUP" : "SIGNIN"}</h1>

      {form}

      <Button btnType="Danger">
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

export default Signup;
