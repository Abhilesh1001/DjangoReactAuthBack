import { TextField, Button, Box, Alert, Grid,Typography } from "@mui/material";
import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../../services/userAuthApi";

function SendPasswordResetEmail() {
    const [server_error,setServerError] = useState({})
    const [server_msg,setServerMSG] = useState({})
    const [resetPassword] = useResetPasswordMutation()
    const {id,token} =useParams()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        
        const actualData = {
            password: data.get('password'),
            password2 : data.get('password2')
        }
        console.log(actualData)
        // console.log(actualData)
        const res = await resetPassword({actualData,id,token}) 
        // if(res.error){
        //     setServerMSG({})
        //     setServerError(res.error.data.errors)
        // }
        if(res.data){
            console.log(res.data)
            setServerError({})
            setServerMSG(res.data)
            document.getElementById('password-reset-form').reset()
            setTimeout(()=>{
                navigate("/login")
            },3000)
        }
        
    }

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item sm={6} xs={12}>
                    <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
                        <TextField required fullWidth margin='normal' id='password' name='password' type='password' label='Password' />
                        {server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>:''}
                        <TextField required fullWidth margin='normal' id='password2' name='password2' type='Password' label='New Confirm Password' />
                        {server_error.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography>:''}
                        <Box textAlign={'center'}>
                            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 3, px: 5 }}>Save</Button>
                        </Box>
                        {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
                        {server_msg.msg?<Alert severity='success'>{server_msg.msg}</Alert>:""}
                    </Box>

                </Grid>

            </Grid>

        </>
    )
}

export default SendPasswordResetEmail
