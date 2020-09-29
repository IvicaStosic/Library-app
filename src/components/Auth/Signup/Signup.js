import React, { useState, useContext } from "react";
import { updateObject } from "../../../shared/util/utility";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import classes from "./Signup.module.css";
import { AuthContext } from "../../context/Auth-context/Auth-context";
import { Redirect } from "react-router-dom";

const Signup = (props) => {
  const auth = useContext(AuthContext);

  const login = (t, id) => {
    auth.signin(t, id);
  };

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

  const [signinForm, setSigninForm] = useState({
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
  });

  const [isSignup, setIsSignup] = useState(true);

  const [fireRedirect, setFireRedirect] = useState(false);

  const inputChangeHandler = (e, elementName) => {
    if (isSignup) {
      const updatedSignupForm = updateObject(signupForm, {
        [elementName]: updateObject(signupForm[elementName], {
          value: e.target.value,
          touched: true,
        }),
      });
      setSignupForm(updatedSignupForm);
    } else {
      const updatedSigninForm = updateObject(signinForm, {
        [elementName]: updateObject(signinForm[elementName], {
          value: e.target.value,
          touched: true,
        }),
      });
      setSigninForm(updatedSigninForm);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isSignup) {
      try {
        const res = await fetch("http://localhost:8080/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signinForm.username.value,
            password: signinForm.password.value,
          }),
        });
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        let resData = await res.json();
        console.log(resData);
        login(resData.token, resData.userId);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        // const remainingMilliseconds = 60 * 60 * 1000;
        const remainingMilliseconds = 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        console.log(remainingMilliseconds);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        // setAutoLogout(remainingMilliseconds);
        setFireRedirect(true);
      } catch (err) {
        console.log(err);
        // setIsAuth(false);
      }
    } else {
      try {
        const res = await fetch("http://localhost:8080/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signupForm.username.value,
            email: signupForm.email.value,
            password: signupForm.password.value,
          }),
        });
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        let resData = await res.json();
        console.log(resData.message);
        setIsSignup(!isSignup);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const switchAuthHandler = () => {
    setIsSignup(!isSignup);
  };

  let form;
  const formElements = [];

  if (isSignup) {
    for (let key in signupForm) {
      formElements.push({
        id: key,
        config: signupForm[key],
      });
    }

    form = (
      <form onSubmit={submitHandler} className={classes.Signup}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            touched={formElement.config.touched}
            change={(e) => inputChangeHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success" type="submit">
          SUBMIT
        </Button>
      </form>
    );
  } else {
    for (let key in signinForm) {
      formElements.push({
        id: key,
        config: signinForm[key],
      });
    }

    form = (
      <form onSubmit={submitHandler} className={classes.Signup}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            touched={formElement.config.touched}
            change={(e) => inputChangeHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success" type="submit">
          SUBMIT
        </Button>
      </form>
    );
  }

  return (
    <div>
      <h1>{isSignup ? "SIGNUP" : "SIGNIN"}</h1>
      {form}
      <Button btnType="Danger" clicked={switchAuthHandler}>
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
      {fireRedirect && <Redirect to="/library" />}
    </div>
  );
};

export default Signup;
