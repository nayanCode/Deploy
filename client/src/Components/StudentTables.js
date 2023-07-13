import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { TextField } from '@mui/material';


const StudentTables = ({ tables }) => {
  const [search,setSearch]=useState([]);
  const [filteredStudents,setFilteredStudents]=useState([]);
  const columns = [
    {
      name: "Full Name ",
      selector: (row) => row.name,
    },
    {
      name: "Roll No ",
      selector: (row) => row.rollno,
    },
    {
      name: "Year of Graduation ",
      selector: (row) => row.yearofgraduating,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button className='btn btn-primary' onClick={() => alert(row._id)}>
          Delete
        </button>
      ),
    },

  ];
  useEffect(() => {

  },[search])
  return (<DataTable
    title="Verification"
    columns={columns}
    data={tables}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
      <TextField 
      fullWidth 
      label="Search" 
      id="fullWidth" 
      value={search}
      onChange={(e)=> setSearch(e.target.value)}/>
    }
  />
  );
};

export default StudentTables
