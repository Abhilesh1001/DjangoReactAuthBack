import React,{useState}  from 'react'
import { TextField, FormControl, Checkbox, Button, Box, Alert, FormControlLabel,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from '../../../services/userAuthApi';
import { storeToken } from '../../../services/LocalStorageService';



function Regestration() {
    const [ server_error,setServerError] = useState({})
    const navigate = useNavigate();
    const [registerUser,{isLoading}]  =useRegisterUserMutation()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2 : data.get('password2'),
            tc: data.get('tc'),
        }
        const res = await registerUser(actualData)
        // console.log(res)
        if(res.error){
            setServerError(res.error.data.errors)
            // console.log(res.error.data.errors)
        }
        if(res.data){
            console.log(res.data)
            storeToken(res.data.token)
            navigate('/dashboard')
        }
    }


    return (
        <>
        {/* {server_error.name?console.log(server_error.name[0]):''} */}
        {/* {server_error.non_field_errors?console.log(server_error.non_field_errors[0]):""} */}
            <Box component='form' noValidate sx={{ mt: 1 }} id='regesteration-form' onSubmit={handleSubmit}>
                <TextField required fullWidth margin='normal' id='name' name='name' label='Name' />
                {server_error.name?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.name[0]}</Typography>:''}
                <TextField required fullWidth margin='normal' id='email' name='email' label='Email Address' />
                {server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography>:''}
                <TextField required fullWidth margin='normal' id='password' name='password' type='password' label='Password' />
                {server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>:''}
                <TextField required fullWidth margin='normal' id='password2' name='password2' type='Password_' label='Password Password' />
                {server_error.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography>:''}
                
                <FormControlLabel control = {<Checkbox value ={true} color = 'primary' name= 'tc' id = 'tc'/>} label = 'I agree to term and Condition'/>
                {server_error.tc?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.tc[0]}</Typography>:''}
                <Box textAlign={'center'}>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 3, px: 5 }}>Join</Button>
                </Box>
                {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
            </Box>

        </>
    )
}

export default Regestration
