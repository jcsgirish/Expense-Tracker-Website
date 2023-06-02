import { Fragment,useContext,Redirect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DummyScreen from './Components/Layout/DummyPage';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
import ProfileDetails from './Components/Pages/ProfileDetails';
import ForgetPasswordPage from './Components/Pages/ForgetPassword';
import Expenses from './Components/Pages/Expenses';
import { expContext } from './Store/ExpenseContext';



function App() {

  let ctx=useContext(expContext);
  return (

    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/forget'>
          <ForgetPasswordPage/>
        </Route>

        <Route  exact path='/profile'>
          <DummyScreen />
        </Route>
        <Route  exact path='/details'>
          <ProfileDetails />
        </Route>

        <Route exact path='/exps'>
          <Expenses/>
       
        </Route>

      </Switch>

    </Fragment>
  );
}

export default App;