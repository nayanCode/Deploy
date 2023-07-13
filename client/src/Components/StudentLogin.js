import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import {authenticateLogin,existStudent} from '../service/api'
import { useNavigate  } from "react-router-dom";
import ParticlesComponent from './ParticlesComponent';
//import Box from '@mui/material/Box';
import "./Loginstyle.css";
const StudentLogin = () => {
  const navigate = useNavigate();

  const [ email, setemail ] = useState();
  const [ password, setpassword ] = useState();

  const loginInitialValues = {
    email: email,
    password: password
  };
 
  

const loginUser = async(event) => {
  
  event.preventDefault();
  console.log(loginInitialValues);
  let response = await authenticateLogin(loginInitialValues);
  if(response)  navigate(`/studenthome/${email}`);
  else return ;
  // if(!response) return;
}
   // const classes = useStyles();
    return (
      <div >
        <Container component="main" maxWidth="sm" sx={{marginTop:'135px'}}> 
        <CssBaseline />
       
        <div className="paper">
        {/* <form className="formcss" > */}
          <Avatar className="avatar">
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
            <TextField
            onChange={(e) => {setemail(e.target.value)}}
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
            onChange={(e) => {setpassword(e.target.value)}}
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
              value="upload" 
              variant="contained"
              color="primary"
              onClick={(e) => loginUser(e)}
              //onClick={SubmitOnClick}
            >
              Sign In
            </Button>
        
          {/* </form> */}
        </div>
        {/* <Box mt={8}>
         
        </Box> */}
        
      </Container>
      <ParticlesComponent id="tsparticles" />
      </div>
    )
}
export default StudentLogin;