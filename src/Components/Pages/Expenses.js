import React, { useContext, useRef } from 'react'
import { expContext } from '../../Store/ExpenseContext';

let exps = [
    {
        expenseAmount: 100,
        expenseDesc: "KGF",
        expenseCatagory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "HERA PHERI",
        expenseCategory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "BHAUBALI",
        expenseCategory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "PATHAAN",
        expenseCategory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "RRR",
        expenseCategory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "DON",
        expenseCategory: "movie"
    },
    {
        expenseAmount: 100,
        expenseDesc: "ALLADIN",
        expenseCategory: "movie"
    }
]
const Expenses = () => {
    const ctx = useContext(expContext);
    const enteredaAmount = useRef();
    const enteredaDesc = useRef();
    const enteredaCategory = useRef();
    const handleSubmitExpense = (e) => {
        e.preventDefault();
        const newAddedExpense = {
            expenseAmount: enteredaAmount.current.value,
            expenseDesc: enteredaDesc.current.value,
            expenseCatagory: enteredaCategory.current.value
        }
        if (enteredaAmount.current.value.length > 0 && enteredaDesc.current.value.length > 0 && enteredaCategory.current.value.length > 0) {
            console.log(newAddedExpense);
            ctx.setExpenses([...ctx.expenses, newAddedExpense])
        } else {
            alert("please fill all the data")
        }
    }
    return (
        <div className='container'>
            <div className="row gx-3 gy-2 align-items-center mx-5 my-5">
                <h1>Enter your expense</h1>
                <form className="row gy-2 gx-3 align-items-center">
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="expenseamount">Expenseamount:</label>
                        <div className="input-group">
                            <div className="input-group-text"> Expense amount:</div>
                            <input type="text" className="form-control" ref={enteredaAmount} id="expenseamount" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="description">description:</label>
                        <div className="input-group">
                            <div className="input-group-text">Description:</div>
                            <input type="text" className="form-control" ref={enteredaDesc} id="description" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="category">Description:</label>
                        <div className="input-group">
                        <select className="form-select" defaultValue="choose a catagory" ref={enteredaCategory} id="category">
  <option value="choose a catagory" disabled>Category</option>
  <option value="movie">Movie</option>
  <option value="food">Food</option>
  <option value="electricity">Electricity</option>
  <option value="fuel">Fuel</option>
</select>

                        </div>
                    </div>
                    <div className="col-auto">
                    </div>
                    <div className="col-auto">
                        <button type="submit"  className="btn btn-primary" id="onSubmit" onClick={handleSubmitExpense}>Submit</button>
                    </div>
                </form>
            </div>
            {ctx.expenses.length>0 && <h1 className='text-center'>Expenses</h1>}
            <div className='row text-center '>{ctx.expenses.map((expense,index) => {
                return <div key={index} className="card w-25 col-4 mx-3 my-3">
                    <div className="card-body">
                        <h5 className="card-title">Amount:<span className='text-primary'>{expense.expenseAmount}    </span></h5>
                        <h5 className="card-title">Description:<span className='text-primary'>{expense.expenseDesc} </span></h5>
                        <h5 className="card-title">Category:<span className='text-primary'>{expense.expenseCatagory}</span> </h5>
                    </div>
                </div>
            })}</div>
        </div>
    )
}

export default Expenses