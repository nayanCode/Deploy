import React, { useState, useEffect } from "react";
import StudentTables from './StudentTables.js';
import Table from './Table.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTables } from '../redux/actions/tableActions'
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import {updateStatus} from "../service/api.js"

const useStyles = makeStyles({
    submitButton: {
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      },
      redSubmitButton: {
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        color:"red",
      }
  });

const Verify = (props) => {
    const [transferdata,setTransferData]= useState('')

    const { tables } = useSelector(state => state.getTables);
    const dispatch = useDispatch();

    const onTransfer =(data)=>{
        setTransferData(data);
        props.onDataTransfer(data);
    };
    
    useEffect(() => {
        dispatch(getTables())
    }, [dispatch])

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1>Student List</h1>
            </div>
            {/* <StudentTables tables={tables}/> */}
            {
                tables?

                <Table tables={tables} onTransfer={onTransfer}/>:null
            }
        </>
    )

}



export default Verify;