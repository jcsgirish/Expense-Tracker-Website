import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import './Login.css'

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.authentication.login);
  const token = useSelector((state) => state.authentication.token);

  const handleLogin = () => {
    if (login) {
      dispatch(authActions.loginFalse());
    } else {
      dispatch(authActions.loginTrue());
    }
  };

  let enteredpass = useRef();
  let enteredEmail = useRef();
  let enteredConfirmPass = useRef();

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!login) {
      if (
        enteredEmail.current.value.length > 0 &&
        enteredpass.current.value.length > 0 &&
        enteredConfirmPass.current.value.length > 0
      ) {
        if (enteredpass.current.value === enteredConfirmPass.current.value) {
          let response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
            {
              method: 'POST',
              body: JSON.stringify({
                email: enteredEmail.current.value,
                password: enteredpass.current.value,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            let data = await response.json();
            console.log('Authentication Token:', token);
            dispatch(authActions.setToken(data.idToken));
            localStorage.setItem('token', data.idToken);
            alert('User has signed up');
            console.log('User has signed up');
          } else {
            let errorMessage = 'Authentication failed!';
            alert(errorMessage);
          }
        } else {
          alert('Password and confirm passwords are not matching');
        }
      } else {
        alert('Please fill in all the data');
      }
    } else {
      if (
        enteredEmail.current.value.length > 0 &&
        enteredpass.current.value.length > 0
      ) {
        let response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail.current.value,
              password: enteredpass.current.value,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          let data = await response.json();
          console.log('Authentication Token:', data.idToken);
          dispatch(authActions.setToken(data.idToken));
          alert('Logged in successfully');
          console.log('Logged in successfully');
          try {
            let response = await fetch(
              'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
              {
                method: 'POST',
                body: JSON.stringify({
                  idToken: data.idToken,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            if (response.ok) {
              let data = await response.json();
              console.log(data.users[0]);
              // data=JSON.parse( data.users[0].photoUrl)
              // ctx.setProfileInfo(data);
              // let newdata=JSON.parse(data.users[0].photoUrl)
              dispatch(authActions.setProfileInfo({ myName: data.users[0].displayName, myUrl: data.users[0].photoUrl }))
              alert('Request successful');
            } else {
              throw new Error('Failed');
            }
          } catch (error) {
            console.log(error);
          }
          history.push('/profile');
        } else {
          let errorMessage = 'Authentication failed!';
          alert(errorMessage);
        }
      } else {
        alert('Please fill in all the data');
      }
    }
  };

  return (
    <div>
      
        <section className="auth">
          <h2 className="my-3">{!login ? 'Sign Up' : 'Log In'}</h2>
          <form>
            <div className="control">
              <input type="email" id="email" placeholder="Email" ref={enteredEmail} />
            </div>
            <div className="control">
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                ref={enteredpass}
              />
            </div>
            {!login && (
              <div className="control">
                <input
                  type="password"
                  id="Password"
                  required
                  placeholder="Confirm Password"
                  ref={enteredConfirmPass}
                />
              </div>
            )}
            <div>
              <button className="btn btn-primary border w-100" onClick={submitHandler}>
                {!login ? 'Sign Up' : 'Login'}
              </button>
              {!login && (
                <Link type="button" className="nav-link active border border-primary rounded p-1 mt-2" to="/forget">
                  Forgot Password?
                </Link>
              )}
            </div>
          </form>
          <div>
            <button
              onClick={handleLogin}
              type="button"
              className="btn btn-outline-success my-3 w-100"
            >
              {!login ? 'Have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
        </section>
    
    </div>
  );
};

export default Login;
