import React,{useState,useEffect} from 'react'
import {Button, CssBaseline, Grid, Typography} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { getToken, removeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from "../../../src/features/authSlice";
import {useGetLoggedUserQuery} from '../../services/userAuthApi'
import { setUserInfo, unSetuserInfo } from "../../features/userSlice";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {access_token} = getToken()
    const {data,isSuccess} = useGetLoggedUserQuery(access_token)
    console.log(data)
    const [userData,setUserData] = useState({
      email : '',
      name : ''
    })
    const handleLogout=()=>{
      dispatch(unSetuserInfo({'name':'','email':''}))
      dispatch(unSetUserToken({access_token : null}))
      removeToken()

      navigate('/login')
  }  
    
    // Store user data in local state
    useEffect(()=>{
      if(data && isSuccess){
        setUserData({
          email: data.email,
          name : data.name 
        })
      }
    },[data,isSuccess])
    useEffect(()=>{
      if(data && isSuccess){
        dispatch(setUserInfo({
          email : data.email,
          name : data.name
        }))
      }
    })

  return (

    <>
    <CssBaseline />
    
    <Grid container>
    <Grid item sm={4} sx={{backgroundColor:'grey' , p:5 ,color:'white'}}>
    <h1>DashBoard</h1>
    <Typography>Email :{userData.email}</Typography>
    <Typography>Name : {userData.name}</Typography>
    <Button variant='contained' color = 'warning' sx={{mt:8}} onClick={handleLogout}>Logout</Button>
    </Grid>

    <Grid item sm={8}>
        <ChangePassword/>
    </Grid>
    </Grid>
    </>
  )
}

export default Dashboard
