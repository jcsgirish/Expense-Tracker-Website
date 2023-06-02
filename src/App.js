import { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DummyScreen from './Components/Layout/DummyPage';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
import ProfileDetails from './Components/Pages/ProfileDetails';
import ForgetPasswordPage from './Components/Pages/ForgetPassword';
import Expenses from './Components/Pages/Expenses';
import { expContext } from './Store/ExpenseContext';

function App() {
  let ctx = useContext(expContext);
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/forget'>
          <ForgetPasswordPage />
        </Route>
        <Route exact path='/profile'>
          {ctx.token && <DummyScreen />}
          {!ctx.token && <Redirect to='/' />}
        </Route>
        <Route exact path='/details'>
          <ProfileDetails />
        </Route>
        <Route exact path='/Expensess'>
        <Expenses/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App