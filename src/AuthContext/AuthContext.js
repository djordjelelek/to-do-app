import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [logIn, setLogIn] = useState(
    localStorage.getItem("token") !== null ? true : false
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") !== null
      ? localStorage.getItem("userId")
      : ""
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") !== null ? localStorage.getItem("token") : ""
  );
  return (
    <AuthContext.Provider
      value={{ logIn, setLogIn, token, setToken, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
