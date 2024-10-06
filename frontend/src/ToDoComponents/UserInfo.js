import React from 'react'
import './UserInfo.css'
import { handleError, handleSuccess } from '../Components/util';
import { useNavigate } from 'react-router-dom';


function UserInfo({setIsAuthenticated}) {
    const userName=localStorage.getItem('loggedInUser')
    const navigate=useNavigate();

    const handleLogout= async(e)=>{
        e.preventDefault();
  
        try {
          const url = "http://localhost:8080/api/auth/logout";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            }
          });
          const result = await response.json();
    
          const { success, message, error } = result;
          if (success) {
            handleSuccess(message);
            localStorage.removeItem("token"); 
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("userId");
            setIsAuthenticated(false)
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else if (error) {
            const details = error?.details[0]?.message;
            handleError(details);
          } else if (!success) {
            handleError(message);
          }
          console.log("ROHIT result", result);
        } catch (err) {
          handleError(err);
        }
    }
  return (
    // <div className='UserInfoContainer'>
    <>
    <h1 className='WelcomeMessage'>Welcome {userName}</h1>
    {/* <h4 className='textMedium'>Manage your Task</h4> */}
    <button onClick={handleLogout} className='todo-button'>Logout</button>
    
    </>
    // </div>
  )
}

export default UserInfo