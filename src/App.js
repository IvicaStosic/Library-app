import React, { useState, useCallback } from "react";
import "./App.css";
import Layout from "./components/UI/Layout/Layout";
import Router from "./components/Navigation/Router/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./components/context/Auth-context/Auth-context";
import { useEffect } from "react";

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    const expiration = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem("token", token);
    localStorage.setItem("expiryDate", expiration.toISOString());
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  }, []);

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    const savedToken = localStorage.getItem("token");

    if (expiryDate && savedToken && new Date(expiryDate) > new Date()) {
      login(savedToken, new Date(expiryDate));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        login: login,
        logout: logout,
        token: token,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <header className=""></header>
          <main>
            <Layout>
              <Router />
            </Layout>
          </main>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
