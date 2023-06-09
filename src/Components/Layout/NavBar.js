import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store';

const Navbar = () => {
  const history = useHistory();
  const token = useSelector(state => state.authentication.token);
  const IsLoggedIn = useSelector((state) => state.authentication.IsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(authActions.loginFalse());
    dispatch(authActions.setIsloggedIn(false));
    dispatch(authActions.setToken(null));
    history.push('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Expenses">
                  Expenses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  About Us
                </NavLink>
              </li>
            </ul>
            { token && ( // Only show the logout button if the user is logged in
              <form className="form-inline my-2 my-lg-0">
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
