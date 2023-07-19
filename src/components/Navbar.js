import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'


export default function Navbar() {
  const {access_token} = getToken()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Geek:Shop
            </Typography>
            <Button component={NavLink} to='/' sx={{ color: 'white' , textTransform:'none'}} style= {({isActive})=>{return {backgroundColor: isActive ? 'red' : ''}}}>Home</Button>
            
            <Button component={NavLink} to='contact'  style= {({isActive})=>{return {backgroundColor: isActive ? 'red' : ''}}}sx={{ color: 'white' , textTransform:'none'}} >Contact</Button>
            {access_token?<Button component={NavLink} to='login'  style= {({isActive})=>{return {backgroundColor: isActive ? 'red' : ''}}}sx={{ color: 'white' , textTransform:'none'}} >DashBoard</Button> : <Button component={NavLink} to='login'  style= {({isActive})=>{return {backgroundColor: isActive ? 'red' : ''}}}sx={{ color: 'white' , textTransform:'none'}} >Login/Regestration</Button> }

          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
