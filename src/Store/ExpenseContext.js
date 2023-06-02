import React, { createContext, useState } from 'react'

const expContext = createContext();
const ExpenseContext = (props) => {
  const userLoginStatus=localStorage.getItem("token")
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(userLoginStatus);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profileInfo, setProfileInfo] = useState({ myName: "", myUrl: "" });
  const [expenses, setExpenses] = useState([]);
  return (
    <expContext.Provider value={{ login, setLogin, token, setToken, profileInfo, setProfileInfo, expenses, setExpenses,isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </expContext.Provider>
  )
}

export default ExpenseContext;
export { expContext }