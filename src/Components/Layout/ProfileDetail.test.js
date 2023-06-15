import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../Store';
import '@testing-library/jest-dom';
import ProfileDetails from '../Pages/ProfileDetails';
import App from '../../App';

describe('Expense Component', () => {
  test('testing Welcome to expense tracker!!! word', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProfileDetails />
        </Router>
      </Provider>
    );
    const expenseWord = screen.getByText(/Welcome to expense tracker/, { exact: false });
    expect(expenseWord).toBeInTheDocument();
  });

  test('testing Full details word', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProfileDetails />
        </Router>
      </Provider>
    );
    const expenseWord = screen.getByText(/Full/, { exact: false });
    expect(expenseWord).toBeInTheDocument();
  });
});
