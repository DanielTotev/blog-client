import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

const AuthConext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });
  const history = useHistory();
  const isLoggedIn = () => userData.token != null;
  const saveAuthData = ({ token, username }) => {
    setUserData({ token, username });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
  const logout = () => {
    localStorage.clear();
    setUserData({ token: null, username: null });
    history.push("/login");
  };
  const canPerformEditOrDelete = (username) => userData.username === username;
  return (
    <AuthConext.Provider
      value={{
        isLoggedIn,
        saveAuthData,
        userData,
        logout,
        canPerformEditOrDelete,
      }}
    >
      {children}
    </AuthConext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthConext);
  return auth;
};
