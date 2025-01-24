import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://blog-backend-icsf.onrender.com/api/auth/login",
      inputs
    );
    // console.log(res);

    localStorage.setItem("access-token", res.data.token);

    setCurrentUser(res.data.userData);
  };

  const logout = async () => {
    const res = await axios.post(
      "https://blog-backend-icsf.onrender.com/api/auth/logout"
    );
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(
    () => {
      //it ensures that localstorage is sync with the currentuser state when user login and logout
      // if (currentUser === null) {
      //   localStorage.removeItem("user");
      // } else {
      localStorage.setItem("user", JSON.stringify(currentUser));
    },
    // }
    [currentUser]
  );

  // const getAuthHeaders = () => {
  //   const token = localStorage.getItem("access-token");
  //   return token ? {Authorization: `Bearer ${token}`} : {};
  // }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
