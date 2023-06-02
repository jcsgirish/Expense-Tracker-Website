import React, { useContext, useRef, useEffect, useState } from 'react';
import { expContext } from '../../Store/ExpenseContext';
import { v4 as uuidv4 } from 'uuid';

const Expenses = () => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const ctx = useContext(expContext);

  const handleDelete = async (expense) => {
    console.log(expense);
    try {
      let response = await fetch(
        `https://expense-8a8d1-default-rtdb.firebaseio.com/expense/${expense.id}.json`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        alert('Deleted successfully');
        const newExpenses = ctx.expenses.filter((item) => item.id !== expense.id);
        ctx.setExpenses(newExpenses);
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (expense) => {
    console.log(expense);
    const editedExpense = {
      expenseAmount: enteredAmount.current.value,
      expenseDesc: enteredDesc.current.value,
      expenseCategory: enteredCategory.current.value,
    };
    try {
      let response = await fetch(
        `https://expense-8a8d1-default-rtdb.firebaseio.com/expense/${expense.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(editedExpense),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        alert('Edited successfully');
      } else {
        throw new Error('Failed to edit expense');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          'https://expense-8a8d1-default-rtdb.firebaseio.com/expense.json',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          let finalData = Object.values(data || {});
          ctx.setExpenses(finalData);
        } else {
          throw new Error('Failed to load previous expenses');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const enteredAmount = useRef();
  const enteredDesc = useRef();
  const enteredCategory = useRef();

  const handleSubmitExpense = async (e) => {
    e.preventDefault();

    const newAddedExpense = {
        id:uuidv4(),
      expenseAmount: enteredAmount.current.value,
      expenseDesc: enteredDesc.current.value,
      expenseCategory: enteredCategory.current.value,
    };
    if (
      enteredAmount.current.value.length > 0 &&
      enteredDesc.current.value.length > 0 &&
      enteredCategory.current.value.length > 0
    ) {
      try {
        let response = await fetch(
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
          alert('Expense added successfully');
          ctx.setExpenses([...ctx.expenses, newAddedExpense]);
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
        {ctx.expenses.map((expense) => {
          return (
            <div key={expense.id} className="card w-25 col-4 mx-3 my-3">
              <div className="card-body">
                <h5 className="card-title">
                  Amount:
                  <span className="text-primary">{expense.expenseAmount}</span>
                </h5>
                <h5 className="card-title">
                  Description:
                  <span className="text-primary">{expense.expenseDesc}</span>
                </h5>
                <h5 className="card-title">
                  Category:
                  <span className="text-primary"> {expense.expenseCategory}</span>
                </h5>
                <span>
                  <button className="btn btn-danger mx-1 my-1" onClick={() => handleDelete(expense)}>
                    DELETE
                  </button>
                  <button className="btn btn-secondary mx-1 my-1" onClick={() => handleEdit(expense)}>
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
