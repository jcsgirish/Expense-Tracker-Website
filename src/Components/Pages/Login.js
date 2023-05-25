import React, { useRef } from "react";
import './Login.css';

const Login = () => {
  const enteredPass = useRef();
  const enteredEmail = useRef();
  const enteredConfirmPass = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (enteredPass.current.value === enteredConfirmPass.current.value) {
      let response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail.current.value,
            password: enteredPass.current.value,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        let data = await response.json();
    
       
        alert("User has Signed Up");
        console.log('User has Signed Up');
      } else {
        let errorMessage = 'Authentication Failed';
        alert(errorMessage);
      }
    } else {
      alert("Password and Confirm Password do not match");
    }
  };

  return (
    <div>
      <section className="auth">
        <h2 className="my-3">SignUp</h2>
        <form>
          <div className="control">
            <input type="email" id="email" placeholder="Email" ref={enteredEmail} />
          </div>
          <div className="control">
            <input type="password" id="Password" placeholder="Password" ref={enteredPass} />
          </div>
          <div  className="control" >
           <input type="password" id="password" placeholder="ConfirmPassword" ref={enteredConfirmPass} />
          </div>
          <div>
            <button className="btn btn-primary border w-100" onClick={submitHandler}>SignUp</button>
          </div>
        </form>
        <div>
          <button type="button" className="btn btn-outline-success my-3 w-100">Have an Account? Login</button>
        </div>
      </section>
    </div>
  );
};

export default Login;
