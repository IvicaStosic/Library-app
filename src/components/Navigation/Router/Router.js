import React from "react";
import { Route, Switch } from "react-router-dom";
import Library from "../../Library/Library";
import AddBook from "../../AddBook/AddBook";
import EditBook from "../../EditBook/EditBook";
import User from "../../User/User";
import Signup from "../../Auth/Signup/Signup";

const Router = (props) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/add_book' component={AddBook} />
        <Route path='/edit_book' component={EditBook} />
        <Route path='/user' component={User} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Library} />
        <Route />
      </Switch>
    </React.Fragment>
  );
};

export default Router;
