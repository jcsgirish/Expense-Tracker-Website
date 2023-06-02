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
  const ctx = useContext(expContext);
  const isLoggedIn = ctx.userLoggedIn;

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          {isLoggedIn ? <Redirect to="/exps" /> : <Login />}
        </Route>
        <Route exact path='/forget'>
          <ForgetPasswordPage />
        </Route>
        <Route exact path='/profile'>
          <DummyScreen />
        </Route>
        <Route exact path='/details'>
          <ProfileDetails />
        </Route>
        <Route exact path='/exps'>
         <Expenses /> 
          
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
