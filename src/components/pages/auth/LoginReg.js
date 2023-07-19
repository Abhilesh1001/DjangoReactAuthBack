import React, { useState } from 'react'
import { Grid, Card, Typography, Tabs, Tab, Box } from '@mui/material'
import png from '../../../Images/png.png'
import UserLogin from './UserLogin';
import Regestration from './Regestration';
const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
        <div role='tabpanel' hidden={value !== index}>
            {
                value === index && (
                    <Box>{children}</Box>
                )
            }
        </div>
    )
}
const LoginReg = () => {
    const [value, setValue] = useState(0)
    const handleOnchange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Grid container sx={{ height: '90vh' }}>
                <Grid item lg={7} sm={5} sx={{
                    backgroundImage: `url(${png})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', sm: 'block' }
                }}>
                </Grid>
                <Grid item lg={5} sm={7}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                        <Box>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                <Tabs textColor='secondary' indicatorColor='secondary' onChange={handleOnchange} value={value}>
                                    <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }} ></Tab>
                                    <Tab label='Regeatration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0} ><UserLogin /></TabPanel>
                            <TabPanel value={value} index={1}><Regestration /></TabPanel>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginReg
