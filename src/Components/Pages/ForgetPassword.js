import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom';
import './Login.css'

const ForgetPasswordPage = () => {
    const enteredEmail=useRef();
    const history=useHistory();
    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            let responce = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        "requestType":"PASSWORD_RESET",
                        "email":enteredEmail.current.value
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (responce.ok) {
                let data = await responce.json();
                console.log("Authantication Token:",data);
                let errorMessage = 'Password reset request has been sent';
                alert(errorMessage);
                history.push("/")
            } else {
                alert("Check the email which you have entered")
                throw new Error("something went wrong");
            }
        } catch (error) {
            console.log(error)
        }
       
    }
    return (
        <div>
            <section className='auth'>
                <h3 className='text-center'>Change Password</h3>
            <h6 className='my-3'>Enter the Registered email</h6>
            <form >
                <div className="control">
                    <input type='email' id='email' placeholder='Email' ref={enteredEmail}/>
                </div>
                <div >
                    <button className="btn btn-primary border w-100" onClick={submitHandler}>Send Link</button>
                </div>
            </form>
            </section>
        </div>
    )
}

export default ForgetPasswordPage