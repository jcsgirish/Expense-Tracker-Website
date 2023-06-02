import React, { createContext, useState } from 'react'

const expContext=createContext();
const ExpenseContext = (props) => {
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [profileInfo, setProfileInfo] = useState({myName:"",myUrl:""});
    const [expenses, setExpenses] = useState([]);

  return (
    <expContext.Provider value={{login,setLogin,token,setToken,profileInfo, setProfileInfo,expenses, setExpenses}}>
      {props.children}
    </expContext.Provider>
  )
}

export default ExpenseContext;
export {expContext}