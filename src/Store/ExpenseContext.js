import React, { createContext, useState } from 'react'

const expContext=createContext();
const ExpenseContext = (props) => {
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [profileInfo, setProfileInfo] = useState({Name:"",ProfileUrl:""});

  return (
    <expContext.Provider value={{login,setLogin,token,setToken,profileInfo, setProfileInfo}}>
      {props.children}
    </expContext.Provider>
  )
}

export default ExpenseContext;
export {expContext}