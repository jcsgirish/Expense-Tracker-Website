import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store';

const Navbar = () => {
  const history = useHistory();
  const token = useSelector((state) => state.authentication.token);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
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
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          > */}
            {/* <span className="navbar-toggler-icon"></span>
          </button> */}
          <div id="navbarSupportedContent">
            <ul>
              <a style={{ fontSize: '3rem' }}>ExpenseTracker</a>
            </ul>
            {token && ( 
              <>
                <ul className="navbar-nav ms-auto me-0">
                  <li className="nav-item" style={{ marginRight: '10px' }}>
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/Expenses"
                      style={{ 
                        fontWeight: 'bold',
                        backgroundColor: 'yellow',
                        marginBottom: '2rem',
                        borderRadius: '2rem',
                        display: 'flex', 
                        justifyContent: 'center' 
                      }}
                    >
                      Add Your Expense 
                    </NavLink>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
