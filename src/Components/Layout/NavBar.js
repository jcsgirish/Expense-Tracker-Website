import React from 'react'
import { expContext } from '../../Store/ExpenseContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
    const history = useHistory();
    const ctx = useContext(expContext)
    const handleLogout = (e) => {
        e.preventDefault();
        history.push('/')
        ctx.setLogin(false);
        ctx.setToken(null);
        console.log('LoggedOut');
    
    
        
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active text-primary" aria-current="page" to="/">
                                    MyWebLink
                                    </NavLink>
                            </li>
                            <li className="nav-item">
  <NavLink className="nav-link active" aria-current="page"  to="/">Home</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link active" aria-current="page"  to="/Expensess">Expenses</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link active" aria-current="page" to="/">Products</NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link active" aria-current="page"  to="/">About Us</NavLink>
</li>

                        </ul>
                        {ctx.token && <form className="form-inline my-2 my-lg-0">
                            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                        </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Navbar