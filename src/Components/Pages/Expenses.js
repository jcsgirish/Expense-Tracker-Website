import React, { useContext, useRef, useEffect } from 'react';
import { expContext } from '../../Store/ExpenseContext';

const Expenses = () => {
  const ctx = useContext(expContext);

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
          let finalData = [];
          for (const key in data) {
            finalData.push(data[key]);
          }
          ctx.setExpenses(finalData);
        } else {
          throw new Error('Failed to load previous expenses');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ctx]);

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
          let data = await response.json();
          console.log(data)
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
        {ctx.expenses.map((expense, index) => {
          return (
            <div key={index} className="card w-25 col-4 mx-3 my-3">
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
                  <span className="text-primary">
                    {expense.expenseCategory}
                  </span>
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expenses;
