import { Fragment } from 'react';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
function App() {
  return (
    <Fragment>
      <Navbar/>
      <Login/>
    </Fragment>
  );
}

export default App;