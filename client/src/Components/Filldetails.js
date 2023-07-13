import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Fillformstyle.css";
import Button from '@mui/material/Button';
import axios from 'axios';
import {sentRequest} from '../service/api';
import {authenticateLogin,existStudent} from '../service/api'
import { makeStyles } from "@mui/styles";
import{useParams} from 'react-router-dom';

const useStyles = makeStyles({
  submitButton: {
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    }
});

const Filldetails = () => {
  const classes = useStyles();

  const [ name, setname ] = useState();
  const [ rollno, setrollno ] = useState();
  const [ yog, setyog ] = useState();

  var obj = useParams();
  const myJSON = JSON. stringify(obj); 
  var matchEmail = JSON.parse(myJSON);

  const requestInitialValues = {
    
    name: name,
    rollno: rollno,
    yearofgraduating:yog,
    date:new Date()

  };

  const newStatusDetails = {
    name: name,
    email:matchEmail.id,
    rollno: rollno,
    yearofgraduating: yog,
    status:'1',
    hash:'',
    date:new Date(),
    
  };

  console.log(matchEmail.id);
  

  const sentRequestButton = async(event) => {
   // console.log(requestInitialValues);

    let [someResult, anotherResult] = await Promise.all([existStudent(newStatusDetails), sentRequest(requestInitialValues)]);
    console.log(someResult);
    if(!anotherResult) return;
  
}

    return(
     <div>
      <form >
        <Box className="Maincontainer">
        
        <h1>Details Form</h1>
        <TextField className="inputupload" onChange={(e)=>{setname(e.target.value)}} label="Name" variant="outlined" margin="normal" sx={{width:'420px'}} />
        <TextField className="inputupload" onChange={(e)=>{setrollno(e.target.value)}}  label="Roll No." variant="outlined" margin="normal" sx={{width:'420px'}} />
        <TextField  className="inputupload" onChange={(e)=>{setyog(e.target.value)}} label="Year of graduating" variant="outlined" margin="normal" sx={{width:'420px'}} />
        
       
        {/* <input
        accept="pdf/*"
        className="inputupload"
        id="contained-button-file"
       // onChange={(e) => setFile(e.target.files[0])}
        multiple
        type="file"
        
      />
      <label htmlFor="contained-button-file" className="labelfile">
        <Button variant="contained" component="span" type="submit" value="Upload" >
          Upload File
        </Button>
      </label>  */}
         {/* <p >
            {file.name}
          </p> */}

        <Button className={classes.submitButton} variant="outlined" size="large" type="submit" value="upload" onClick={(e) => {sentRequestButton()}}>Request</Button>

        </Box>
        </form>
     </div>
    ) 
}



export default Filldetails;