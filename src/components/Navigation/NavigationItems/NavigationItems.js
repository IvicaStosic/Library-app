import React, { useContext } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { AuthContext } from "../../context/Auth-context/Auth-context";
import Button from "../../UI/Button/Button";

const NavigationItems = (props) => {
  const authContext = useContext(AuthContext);
  const isAuth = authContext.isAuthenticated;

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <ul className={classes.NavigationItems}>
      {isAuth ? (
        <NavigationItem exact link="/">
          Open Library
        </NavigationItem>
      ) : null}
      {isAuth ? (
        <NavigationItem link="/library">My Library</NavigationItem>
      ) : null}
      {isAuth ? (
        <NavigationItem link="/add_book">Add Book</NavigationItem>
      ) : null}
      {isAuth ? <NavigationItem link="/user">Avatar</NavigationItem> : null}
      {isAuth ? null : <NavigationItem link="/signup">Signup</NavigationItem>}
      {isAuth ? (
        <Button btnType="Danger" clicked={logoutHandler}>
          Logout
        </Button>
      ) : null}
    </ul>
  );
};

export default NavigationItems;
