import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import DummyScreen from './Components/Layout/DummyPage';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
import ProfileDetails from './Components/Pages/ProfileDetails';
function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/profile'>
          <DummyScreen />
        </Route>
        <Route exact path='/details'>
          <ProfileDetails />
        </Route>

      </Switch>

    </Fragment>
  );
}

export default App;