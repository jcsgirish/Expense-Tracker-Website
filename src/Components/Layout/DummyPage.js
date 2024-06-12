
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'
// //import { expContext } from '../../Store/ExpenseContext';
// const DummyScreen = () => {
//   const token = useSelector(state => state.authentication.token);
  
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       let responce = await fetch(
//         'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             "requestType": "VERIFY_EMAIL",
//             "idToken": token
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )
  
//       if (responce.ok) {
//         let data = await responce.json();
//         console.log("Authantication Token:", data);
//         alert("Please verify your account link has been sent to your mail")
//       } else {
//         let errorMessage = 'Sending Verify Link failed!';
//         alert(errorMessage);
//         throw new Error("Something went wrong");
//       }
//     } catch (error) {
//       console.log(error)
//     }
   
//   }
//   return (
//     <div className='my-2  mx-2 row'>
//       <h1 className="fst-italic col-md-8"  >
//         Welcome to expanse tracker!!!
//       </h1>
//       {/* <span className='fst-italic bg-warning col-md-4 my-2'>Your profie is incomplete<Link className='text-primary' to="/details">Complete now</Link></span>
//       <hr /> */}
//       <div>
//         <button className="btn btn-primary w-25" onClick={handleVerify}>Veify Your E-mail</button>
//       </div>
//     </div>
//   )
// }

// export default DummyScreen