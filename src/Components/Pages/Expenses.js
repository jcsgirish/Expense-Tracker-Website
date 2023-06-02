import React, { useContext, useRef, useEffect } from 'react';
import { expContext } from '../../Store/ExpenseContext';

const Expenses = () => {

  const ctx = useContext(expContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          'https://expense-8a8d1-default-rtdb.firebaseio.com/expense.json'
        );

        if (response.ok) {
          const data = await response.json();
          const expenses = Object.keys(data).map((key) => ({
            key: key,
            ...data[key],
          }));
          ctx.setExpenses(expenses);
        } else {
          throw new Error('Failed to fetch expenses');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, []);



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

        const filteredExpenses = ctx.expenses.filter((expense) => expense.key !== item.key);
ctx.setExpenses(filteredExpenses);
        
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

          const updatedExpenses = ctx.expenses.map((expense) =>
          expense.key === item.key ? updatedItem : expense
        );
        ctx.setExpenses(updatedExpenses);
          
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
          ctx.setExpenses([...ctx.expenses, newExpenseWithKey]);
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
        <h1>Enter your expense</h1>
        <form className="row gy-2 gx-3 align-items-center">
        <div className="col-auto">
          <label className="visually-hidden" htmlFor="expenseamount">
            Expense amount:
          </label>
          <div className="input-group">
            <div className="input-group-text"> Expense amount:</div>
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
        <div className="col-auto"></div>
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
        </form>
      </div>
      {ctx.expenses.length > 0 && <h1 className="text-center">Expenses</h1>}
      <div className="row text-center ">
        {ctx.expenses.map((item) => {
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
                <button className="btn btn-danger mx-1 my-1" onClick={() => deleteHandler(item)}>
                  DELETE
                </button>
                <button className="btn btn-secondary mx-1 my-1" onClick={() => editHandler(item)}>
                  EDIT
                </button>
              </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expenses;
