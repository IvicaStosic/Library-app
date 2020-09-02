import React from "react";
import classes from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = (props) => {
  let pathname;
  let book;
  if (props.link === "/edit_book") {
    pathname = props.link;
    book = props;
  } else if (props.link === "/delete_book") {
    pathname = "/edit_book";
    book = props;
  }

  return !props.link ? (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  ) : (
    <Link
      className={[classes.Button, classes[props.btnType]].join(" ")}
      to={{ pathname: pathname, state: { book: book } }}
    >
      {props.children}
    </Link>
  );
};
export default Button;
