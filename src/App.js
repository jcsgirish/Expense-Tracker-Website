import { Fragment,useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DummyScreen from './Components/Layout/DummyPage';
import Navbar from './Components/Layout/NavBar';
import Login from './Components/Pages/Login';
import ProfileDetails from './Components/Pages/ProfileDetails';
import ForgetPasswordPage from './Components/Pages/ForgetPassword';
import Expenses from './Components/Pages/Expenses';
import { useSelector, Provider } from 'react-redux';
import store from './Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const token = useSelector(state => state.authentication.token);
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  const expenses = useSelector(state => state.expense.expenses);
  const mode = useSelector(state => state.theme.mode || false);

  return (
    <Provider store={store}>
      <div
        className={mode ? 'bg-black text-light' : ''}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '110vh',
          width: '100vw',
          zIndex: -1,
        }}>
        </div>
    
      <Navbar />
      <div>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route> 
          <Route exact path='/forget'>
            <ForgetPasswordPage />
          </Route>
          <Route exact path='/profile'>
            {token ? <DummyScreen /> : <Redirect to='/' />}
          </Route>
           <Route exact path='/details'>
            <ProfileDetails />
          </Route>
          <Route exact path='/expenses'>
            {token ? <Expenses /> : <Redirect to='/' />}
          </Route>
        </Switch>
        </div>
    </Provider>
  );
}

export default App;
