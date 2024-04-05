import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store/features/users/actions";
import { Navigate, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLogout = ()=>{
    dispatch(logout);
    navigate('/');
  }
  const token = window.localStorage.getItem('__token');
  if(token)  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <div>dashboard</div>
      <Button variant="contained" onClick = {handleLogout}>Logout</Button>
    </div>
  );

  return( <Navigate to={'/'} />)
};

export default Dashboard;
