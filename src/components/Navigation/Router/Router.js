import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Library from "../../Library/Library";
import AddBook from "../../AddBook/AddBook";
import EditBook from "../../EditBook/EditBook";
import User from "../../User/User";
import Signup from "../../Auth/Signup/Signup";
import { AuthContext } from "../../context/Auth-context/Auth-context";

const Router = (props) => {
  const auth = useContext(AuthContext);
  const isAuth = auth.isAuth;

  let routes = (
    <Switch>
      <Route path='/signup' component={Signup} />
      <Redirect to='/signup' />
    </Switch>
  )

  if (isAuth) {
    routes = (
      <Switch>
        <Route path='/add_book' component={AddBook} />
        <Route path='/edit_book' component={EditBook} />
        <Route path='/user' component={User} />
        <Route path='/' component={Library} />
        <Route />
      </Switch>
    )
  }

  return (
    <React.Fragment>
      {routes}
    </React.Fragment>
  );
};

export default Router;
