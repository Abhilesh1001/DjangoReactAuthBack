import { TextField, Button , Box , Alert,Typography,CircularProgress } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { NavLink ,useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/userAuthApi";
import { getToken, storeToken } from "../../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../features/authSlice";

function UserLogin() {

    const [server_error,setServerError] = useState({})
    const navigate = useNavigate();
    const [loginUser,{isLoading}] = useLoginUserMutation()
    const dispatch = useDispatch()  

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email:data.get('email'),
            password:data.get('password'),
        }
        // console.log(actualData)
        const res = await loginUser(actualData)
        if(res.error){
            setServerError(res.error.data.errors)
            // console.log(res.error.data.errors)
        }
        if(res.data){
            console.log(res.data.token)
            storeToken(res.data.token)
            let {access_token} = getToken()
            dispatch(setUserToken({access_token:access_token}))
            navigate('/dashboard')
        }
    }
    let {access_token} = getToken()
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token,dispatch])
  
    return (
    <>
    <Box component='form' noValidate sx = {{mt:1}} id = 'login-form' onSubmit= {handleSubmit}>
    <TextField required fullWidth margin = 'normal' id = 'email' name = 'email' label = 'Email Address'/>
    {server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography>:''}
    <TextField required fullWidth margin = 'normal' id = 'password' name = 'password' type = 'password' label = 'Password'/>
    {server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>:''}
    <Box textAlign={'center'}>
        {isLoading?<CircularProgress/>:<Button type = 'submit' variant = 'contained' sx= {{mt:3,mb:3, px: 5}}>Login</Button>}
    </Box>
    <NavLink to = '/sendpasswordresetemail'>Forget Password</NavLink>
    {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
    </Box>
    </>
  )
}

export default UserLogin
