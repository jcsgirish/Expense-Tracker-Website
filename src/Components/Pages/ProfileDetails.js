import React, {  useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { expContext } from '../../Store/ExpenseContext';
import { Link } from  'react-router-dom'
import { authActions } from '../../Store';

const ProfileDetails = () => {
    const token = useSelector(state => state.authentication.token);
    const profileInfo = useSelector(state => state.authentication.profileInfo);
    const dispatch=useDispatch();

    let userName = useRef();
    let profileUrl = useRef();
   // const ctx=useContext(expContext);
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(userName.current.value, profileUrl.current.value);
        let responce = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken:token,
                    displayName: userName.current.value,
                    photoUrl: profileUrl.current.value,
                    deleteAttribute: "DISPLAY_NAME",
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (responce.ok) {
            let data = await responce.json();
            console.log("Token:", data.providerUserInfo);
            try {
                let responce = await fetch(
                    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAdYQmjZzT53zR_JV-z1O_To2WZobWiLs0',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            idToken:token,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                if (responce.ok) {
                    let data=await responce.json();
                    //ctx.setProfileInfo({Name:"Girish",ProfileUrl:data.users[0].photoUrl})
                    alert("request successfull")
                    dispatch(authActions.setProfileInfo({myName:data.displayName,myUrl:data.photoUrl}))
                    console.log("UserData",data.users[0].photoUrl);
                } else {
                    throw new Error("Failed")
                }
            } catch (error) {
                console.log(error)
            }

        } else {
            let errorMessage = 'failed!';
            alert(errorMessage);
        }
    }
    return (
        <div className='my-2  mx-2'>
            <h1 className="fst-italic" >
                Welcome to expanse tracker!!!
            </h1>
        </div>
    )
}

export default ProfileDetails