import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Box from '@mui/material/Box';

import "./Loginstyle.css";

const AdminLogin = () => {
   // const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm" sx={{marginTop:'135px'}}> 
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="formcss" noValidate>
            <TextField
            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            //   onChange={(event)=>{
            //     setuserEmail(event.target.value);
            //   }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            //   onChange={(event)=>{
            //     setuserpassword(event.target.value);
            //   }}
            />
           <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
              //onClick={SubmitOnClick}
            >
              Sign In
            </Button>
        
          </form>
        </div>
        {/* <Box mt={8}>
         
        </Box> */}
      </Container>
    )
}

export default AdminLogin;