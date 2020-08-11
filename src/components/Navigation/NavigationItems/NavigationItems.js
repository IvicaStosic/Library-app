import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link='/'>Open Library</NavigationItem>
      <NavigationItem link='/library'>My Library</NavigationItem>
      <NavigationItem link='/add_book'>Add Book</NavigationItem>
      <NavigationItem link='/edit_book'>Edit Book</NavigationItem>
      <NavigationItem link='/user'>Avatar</NavigationItem>
      <li>Signup</li>
      <li>Login</li>
      <li>Logout</li>
    </ul>
  );
};

export default NavigationItems;
