import React from 'react'
import Form from './Components/Students/Form';
import Home from './Components/Home';
import { PeopleOutlineTwoTone } from '@mui/icons-material';
//import {makeStyles, Paper} from '@material-ui/core';
import { padding } from '@mui/system';

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


export default function Students() {
    const classes = useStyles();
  return (
    <>
    <Paper className={classes.pageContent}> 
       <Form/>
    </Paper>     
    </>
  )
}
