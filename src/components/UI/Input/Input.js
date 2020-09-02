import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.change}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.change}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.validationError}>
        Please enter a valid {props.elementConfig.placeholder}!
      </p>
    );
  }

  return (
    <React.Fragment>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </React.Fragment>
  );
};

export default Input;
