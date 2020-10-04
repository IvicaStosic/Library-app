import React, { useState, createContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
