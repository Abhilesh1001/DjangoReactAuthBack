import { TextField, Button, Box, Alert, Grid,Typography } from "@mui/material";
import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../../services/userAuthApi";


function ResetPassword() {
    const [server_error,setServerError] = useState({})
    const [server_msg,setServerMSG] = useState({})
    const [sendPasswordResetEmail,{isLoading}] = useSendPasswordResetEmailMutation()
    
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        
        const actualData = {
            "email": data.get("email"),
        }
        console.log(actualData)
        // console.log(actualData)
        const res = await sendPasswordResetEmail(actualData)
        if(res.error){
            console.log(res.error)
            setServerMSG({})
            setServerError(res.error.data.errors)
        }
        if(res.data){
            setServerError({})
            setServerMSG(res.data)
            document.getElementById('password-reset-email-form').reset()
        }
        
    }

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item sm={6} xs={12}>
                    <h1>Reset Password</h1>
                    <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
                        <TextField required fullWidth margin='normal' id='email' name='email' label='Email Address' />
                        {server_error.email?<Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography>:''}
                        <Box textAlign={'center'}>
                            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 3, px: 5 }}>Send</Button>
                        </Box>
                        {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
                        {server_msg.msg?<Alert severity='success'>{server_msg.msg}</Alert>:""}
                    </Box>

                </Grid>

            </Grid>

        </>
    )
}

export default ResetPassword
