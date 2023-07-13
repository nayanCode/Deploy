import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams ,GridApi} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {updateStatus,updateHash} from "../service/api.js"


export default function Table({tables,onTransfer}) {
  const [formData,setFormData]=useState();
  const [currhash, setcurrhash] = useState()

  const sendAccept= async (id,e,params)=>{

    
    const responsestatus = await updateStatus(id,"2");
    e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            setFormData(thisRow);
            onTransfer(thisRow);
    if(!responsestatus) return ;
}
  const sendUpdateHash= async (id,hash)=>{
    const responsestatus = await updateHash(id,hash);
    if(!responsestatus) return ;
}

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'name', headerName: 'Name', width: 170 },
    {
      field: 'rollno',
      headerName: 'Roll No',
      type: 'number',
      width: 175,
    },
    {
      field: 'yearofgraduating',
      headerName: 'Year of Graduation',
      type: 'number',
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        let currroll=params["row"]["rollno"];
        return <Button onClick={(e)=>{sendAccept(currroll,e,params)}}>Apply</Button>;
  
        // return <Link to={"/adminhome"}><Button onClick={onClick}>Apply</Button></Link>;
      }
    },
    {
      field: "Sendhash",
      headerName: "Send Hash",
      sortable: false,
      width:240,
      renderCell: (params) => {
        let currroll=params["row"]["rollno"];
        return (<div><input onChange={(e)=>{setcurrhash(e.target.value)}} /><Button onClick={(e)=>{sendUpdateHash(currroll,currhash)}}>Send</Button></div>);
  
        // return <Link to={"/adminhome"}><Button onClick={onClick}>Apply</Button></Link>;
      }
    },
  ];
  console.log(formData);
  const rows = tables.map(row => ({
    id: row._id,
    name: row.name,
    rollno: row.rollno,
    yearofgraduating: row.yearofgraduating,
  }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}