import React, { useState } from "react";
import { useEffect } from "react";

export const AuthContext = React.createContext({
  userId: "",
  token: "",
  isAuthenticated: false,
  signin: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
      setUserId(localStorage.userId);
      setIsAuth(true);
      const expiryDate = localStorage.getItem("expiryDate");
      if (new Date(expiryDate) <= new Date()) {
        logoutHandler();
      }

      const remainingMilliseconds =
        new Date(expiryDate).getTime() - new Date().getTime();
      // setAutoLogout(remainingMilliseconds);
      console.log(remainingMilliseconds);
      setTimeout(() => {
        logoutHandler();
      }, remainingMilliseconds);
    } else {
      setIsAuth(false);
    }
  }, []);

  const signinHandler = (t, id) => {
    setIsAuth(true);
    setUserId(id);
    setToken(t);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        signin: signinHandler,
        logout: logoutHandler,
        isAuth: isAuth,
        token: token,
        userId: userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
