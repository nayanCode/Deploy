import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';

export function useForm(initialFValues) {

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [val, setVal] = React.useState();
  const [valDep, setValDep] = React.useState();

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,

    })
  }
  const handleDepChange = (event) => {
    setValDep(event.target.value);
  }
  const handleChnage = (event) => {
    setVal(event.target.value);
  }
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
    setVal({});
    setValDep({});

  }
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    val,
    setVal,
    handleChnage,
    valDep,
    setValDep,
    handleDepChange,
    resetForm
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }

  }
}))

export function Form1(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
