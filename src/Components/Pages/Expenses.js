import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../Store';
import { themeActions } from '../../Store';



function CalculateTotalExpense(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
      sum = sum + parseInt(array[i].expenseAmount);
  }
  return sum;
}










const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  const totalExpense=useSelector(state=>state.expense.totalExpense)


  const handleDownloadExpense = (item) => {
    const expenseData = [
      ['Amount', item.expenseAmount],
      ['Description', item.expenseDesc],
      ['Category', item.expenseCategory],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + expenseData.map(row => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expense_${item.key}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleActive = (e) => {
    e.preventDefault();
    if (CalculateTotalExpense(expenses) >= 10000) {
      dispatch(themeActions.setMode());
    } else {
      alert('Total expense should be at least 10000 to activate premium');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        'https://expense-8a8d1-default-rtdb.firebaseio.com/expense.json'
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const expenses = Object.keys(data).map((key) => ({
            key: key,
            ...data[key],
          }));
          dispatch(expenseActions.setExpenses(expenses));
        } else {
          // Handle the case when data is empty or null
          console.log('No expenses found.');
        }
      } else {
        throw new Error('Failed to fetch expenses');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteHandler = async (item) => {
    try {
      console.log('Deleting item:', item);

      const res = await fetch(
        `https://expense-8a8d1-default-rtdb.firebaseio.com/expense/${item.key}.json`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Delete response:', res);

      if (res.ok) {
        alert('Expense Deleted Successfully');

        const filteredExpenses = expenses.filter((expense) => expense.key !== item.key);
        // Set filtered expenses in the Redux store using dispatch
        dispatch(expenseActions.setExpenses(filteredExpenses));
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editHandler = async (item) => {
    try {
      const updatedAmount = prompt('Enter updated amount:', item.expenseAmount);
      const updatedDesc = prompt('Enter updated description:', item.expenseDesc);
      const updatedCategory = prompt('Enter updated category:', item.expenseCategory);

      if (updatedAmount && updatedDesc && updatedCategory) {
        const updatedItem = {
          ...item,
          expenseAmount: updatedAmount,
          expenseDesc: updatedDesc,
          expenseCategory: updatedCategory,
        };

        const res = await fetch(
          `https://expense-8a8d1-default-rtdb.firebaseio.com/expense/${item.key}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
          }
        );

        if (res.ok) {
          alert('Expense updated successfully');

          const updatedExpenses = expenses.map((expense) =>
            expense.key === item.key ? updatedItem : expense
          );
          // Set updated expenses in the Redux store using dispatch
          dispatch(expenseActions.setExpenses(updatedExpenses));
        } else {
          throw new Error('Failed to update expense');
        }
      } else {
        alert('Please enter valid values for all fields');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const enteredAmount = useRef();
  const enteredDesc = useRef();
  const enteredCategory = useRef();

  const handleSubmitExpense = async (e) => {
    e.preventDefault();

    const newAddedExpense = {
      expenseAmount: enteredAmount.current.value,
      expenseDesc: enteredDesc.current.value,
      expenseCategory: enteredCategory.current.value,
    };

    if (
      newAddedExpense.expenseAmount &&
      newAddedExpense.expenseDesc &&
      newAddedExpense.expenseCategory
    ) {
      try {
        const response = await fetch(
          'https://expense-8a8d1-default-rtdb.firebaseio.com/expense.json',
          {
            method: 'POST',
            body: JSON.stringify(newAddedExpense),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newExpenseWithKey = {
            ...newAddedExpense,
            key: data.name,
          };
          alert('Expense added successfully');
          // Update expenses in the Redux store using dispatch
          dispatch(expenseActions.setExpenses([...expenses, newExpenseWithKey]));
        } else {
          throw new Error('Failed to add expense');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please fill in all the data');
    }
  };

  return (
    <div className="container">
      <div className="row gx-3 gy-2 align-items-center mx-5 my-5">
  <h1 >Enter your expense</h1>
  <form className="row gy-2 gx-3 align-items-center">
    <div className="col-auto">
      <label className="visually-hidden" htmlFor="expenseamount">
        Expense amount:
      </label>
      <div className="input-group">
        <div className="input-group-text">Expense amount:</div>
        <input
          type="text"
          className="form-control"
          ref={enteredAmount}
          id="expenseamount"
        />
      </div>
    </div>
    <div className="col-auto">
      <label className="visually-hidden" htmlFor="description">
        Description:
      </label>
      <div className="input-group">
        <div className="input-group-text">Description:</div>
        <input
          type="text"
          className="form-control"
          ref={enteredDesc}
          id="description"
        />
      </div>
    </div>
    <div className="col-auto">
      <label className="visually-hidden" htmlFor="category">
        Category:
      </label>
      <div className="input-group">
        <select
          className="form-select"
          defaultValue="choose a category"
          ref={enteredCategory}
          id="category"
        >
          <option value="choose a category" disabled>
            Category
          </option>
          <option value="movie">Movie</option>
          <option value="food">Food</option>
          <option value="electricity">Electricity</option>
          <option value="fuel">Fuel</option>
        </select>
      </div>
    </div>
    <div className="col-auto">
      <button
        type="submit"
        className="btn btn-primary"
        id="onSubmit"
        onClick={handleSubmitExpense}
      >
        Submit
      </button>
    </div>
    <div className="col-auto">
      {CalculateTotalExpense(expenses) >= 10000 && (
        <button className="btn btn-warning" onClick={handleActive}>
          Go Premium
        </button>
      )}
    </div>
  </form>
</div>

      {expenses.length > 0 && <h1 className="text-center">Expenses</h1>}
      <div className="row text-center">
        {expenses.map((item) => {
          return (
            <div key={item.key} className="card w-25 col-4 mx-3 my-3">
              <div className="card-body">
                <h5 className="card-title">
                  Amount:
                  <span className="text-primary">{item.expenseAmount}</span>
                </h5>
                <h5 className="card-title">
                  Description:
                  <span className="text-primary">{item.expenseDesc}</span>
                </h5>
                <h5 className="card-title">
                  Category:
                  <span className="text-primary"> {item.expenseCategory}</span>
                </h5>
                <span>
                  <button
                    className="btn btn-danger mx-1 my-1"
                    onClick={() => deleteHandler(item)}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-secondary mx-1 my-1"
                    onClick={() => editHandler(item)}
                  >
                    EDIT
                  </button>
                  <button
                  className="btn btn-primary mx-1 my-1"
                  onClick={() => handleDownloadExpense(item)}>
                  <i className="bi bi-download"></i>
                </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {expenses.length > 0 && (
        <h1 className="text-center">Total Expense Amount: ${CalculateTotalExpense(expenses)}</h1>
      )}
      </div>
     
  );
};

export default Expenses;