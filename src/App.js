import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
import ProfileDetails from './Components/Pages/ProfileDetails';
import DummyScreen from './Components/Layout/DummyPage';

function App() {
  return (
    
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<DummyScreen />} />
        <Route path="/details" element={<ProfileDetails />} />
      </Routes>
      <Login />
    </Fragment>
  
  );
}


export default App;
