import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.authentication.login);
  const token = useSelector((state) => state.authentication.token);
  const user = useSelector((state) => state.authentication.user);

  const handleLogin = () => {
    if (login) {
      dispatch(authActions.loginFalse());
    } else {
      dispatch(authActions.loginTrue());
    }
  };

  const enteredPass = useRef();
  const enteredEmail = useRef();
  const enteredConfirmPass = useRef();

  const history = useHistory();

  const credentialModifiedForRequest = (email) => {
    let modifiedEmail = '';
    for (let i = 0; i < email.length; i++) {
      if (email[i] !== '@' && email[i] !== '.') {
        modifiedEmail += email[i];
      }
    }
    return modifiedEmail;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(authActions.setuser(credentialModifiedForRequest(enteredEmail.current.value)));
    // console.log(user);
    dispatch(authActions.setuser(user));

    if (!login) {
      if (
        enteredEmail.current.value.length > 0 &&
        enteredPass.current.value.length > 0 &&
        enteredConfirmPass.current.value.length > 0
      ) {
        if (enteredPass.current.value === enteredConfirmPass.current.value) {
          try {
            const response = await fetch(
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
              const data = await response.json();
              // console.log('Authentication Token:', token);
              dispatch(authActions.setToken(data.idToken));
              localStorage.setItem('token', data.idToken);
              alert('User has signed up');
              // console.log('User has signed up');
              // Redirect to the profile page
              history.push('/profile');
            } else {
              const errorMessage = 'Authentication failed!';
              alert(errorMessage);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert('Password and confirm passwords do not match');
        }
      } else {
        alert('Please fill in all the fields');
      }
    } else {
      if (enteredEmail.current.value.length > 0 && enteredPass.current.value.length > 0) {
        try {
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
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
            const data = await response.json();
            // console.log('Authentication Token:', data.idToken);
            dispatch(authActions.setToken(data.idToken));
            alert('Logged in successfully');
            console.log('Logged in successfully');
            try {
              const response = await fetch(
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
                const data = await response.json();
                // console.log(data.users[0]);
                dispatch(authActions.setProfileInfo({ myName: data.users[0].displayName, myUrl: data.users[0].photoUrl }));
                alert('Request successful');
              } else {
                throw new Error('Failed');
              }
            } catch (error) {
              console.log(error);
            }
            // Redirect to the profile page
            history.push('/profile');
          } else {
            const errorMessage = 'Authentication failed!';
            alert(errorMessage);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Please fill in all the fields');
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
              ref={enteredPass}
            />
          </div>
          {!login && (
            <div className="control">
              <input
                type="password"
                id="confirmPassword"
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
              <Link
                type="button"
                className="nav-link active border border-primary rounded p-1 mt-2"
                to="/forget"
              >
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
