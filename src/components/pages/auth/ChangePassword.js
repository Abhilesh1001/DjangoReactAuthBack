import { TextField, Button, Box, Alert, Grid, Typography } from "@mui/material";
import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChangeUserPasswordMutation } from "../../../services/userAuthApi";
import { getToken } from "../../../services/LocalStorageService";


function ChangePassword() {
    const [server_error,setServerError] = useState({})
    const [server_msg,setServerMSG] = useState({})
    const [changeUserPassword] = useChangeUserPasswordMutation()
    const {access_token} = getToken()

    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            password: data.get('password'),
            password2 : data.get('password2')
        }
        const res = await changeUserPassword({actualData,access_token})
        // console.log(actualData)
        if(res.error){
            setServerMSG({})
            setServerError(res.error.data.errors)
            // console.log(res.error.data.errors)
        }
        if(res.data){
            console.log('res',res.data)
            setServerError({})
            setServerMSG(res.data)

            document.getElementById("password-reset-form").reset()
        }
       
    }
    const myData = useSelector(state =>state.user)
    // console.log('Changed Password',myData)

    return (
        <>

            <Grid container justifyContent='center'>
                <Grid item sm={6} xs={12}>
                    <h1>Change Password</h1>
                    <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
                        <TextField required fullWidth margin='normal' id='password' name='password' type='password' label='Password' />
                        {server_error.password ? <Typography style={{fontSize: 12,color: 'red', paddingLeft:10}}>{server_error.password[0]}</Typography>:""}
                        <TextField required fullWidth margin='normal' id='password2' name='password2' type='Password' label='New Confirm Password' />
                        {server_error.password2 ? <Typography style={{fontSize: 12,color: 'red', paddingLeft:10}}>{server_error.password2[0]}</Typography>:""}
                        <Box textAlign={'center'}>
                            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 3, px: 5 }}>Save</Button>
                        </Box>
                        {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
                        {server_msg.msg?<Alert severity='success'>{server_msg.msg}</Alert>:""}
                        {/* {server_msg.?<Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""} */}
                    </Box>

                </Grid>

            </Grid>

        </>
    )
}

export default ChangePassword
