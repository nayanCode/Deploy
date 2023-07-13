import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import Controls from "../../Components/controls/Controls";
import React, { useState, useEffect } from "react";
import { useForm, Form1 } from "../../Components/useForm";
import SendIcon from "@mui/icons-material/Send";
import ReplayIcon from "@mui/icons-material/Replay";
import { Stack } from "@mui/system";
import NativePickers from "../../Components/NativePickers";
import DepartmentSelect from "../../Select/departmentSelect";

import Select1 from "../../Select/Select1";
import * as studentService from "../../Services/studentServices";
import Demo from "../../Select/demo";

import DoctypeSelect from "../../Select/doctypeSelect";
import { StyledEngineProvider } from "@mui/material/styles";
import NativeSelect from "@mui/material/NativeSelect";
import { FormHelperText } from "@mui/material";

import axios from "axios";
import { load } from "../../Contractconnect/func.js";
import { create } from "ipfs-http-client";
import { makeStyles } from "@mui/styles";
import {updateStatus} from "../../service/api.js"

const useStyles = makeStyles({
  submitButton: {
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  }
});



const ipfsClient = require('ipfs-http-client');
const projectId = '2Kj7xj4vfjsKoKjoNfvTsXCd67J';
const projectSecret = '84e1d75a98bceccacfb0175485fa6f25';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

// const initialFValues = {
//   id: "",
//   fullName: "",
//   yearpassed: "",
//   rollno: "",
//   deparmentName: "",
//   gender: "",
//   urlArr:"",
//   PathArr:""
// };

export default function Form(props) {
  const initialFValues = {
    id: "",
    fullName: props.prefill.name,
    yearpassed: props.prefill.yearofgraduating,
    rollno: props.prefill.rollno,
    deparmentName: "",
    gender: "",
    urlArr:"",
    PathArr:""
  };
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState();
  const [PathArr, setPathArr] = useState();
  const [filehash, setfilehash] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [contract, setContract] = useState(null);
  const [addressAccount, setAddresAccount] = useState("");
  // const [fullname, setFullname] = useState('');
  // const [rollno, setRollno] = useState('');
  // const [yearpassed, setYearpassed] = useState('');
  const [departmentname, setDepartmentname] = useState("Computer");


  const validate = () => {
    let temp = {};
    temp.fullName = values.fullName ? "" : "This field is required";
    temp.yearpassed = values.yearpassed ? "" : "This field is required";
    temp.rollno = values.rollno.length >= 6 ? "" : "Minimum 6 number required";
    temp.departmentID =
      departmentname.length != 1 ? "" : "This field is required";
    setErrors({
      ...temp,
    });
    console.log(errors);
    return Object.values(temp).every((x) => x == "");
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    val,
    setVal,
    valDep,
    setValDep,
    handleDepChange,
    handleChnage,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      const path = `${created.path}`;
      const url = `https://docverifier.infura-ipfs.io/ipfs/${created.path}`;
      // setUrlArr(url);
      // setPathArr(path);
      initialFValues["urlArr"]=url;
      initialFValues["PathArr"]=path;
      const responsestatus = await updateStatus( values.rollno,"3");
    } catch (error) {
      console.log(error.message);
    }
    if (validate()) {
        
      if (file) {
        const data = new FormData();
        data.append("file", file);
        try {
          const res = await axios
            .post(`http://localhost:8000/uploadfile`, data)
            .then(function (response) {
              console.log(response);
              initialFValues["id"] = values.rollno + values.yearpassed;
              const { fileName, fileHash, filePath } = response.data;
              
              //   loadDetails();
              // console.log(values.fullName,
              //   values.yearpassed,
              //   departmentname,
              //   urlArr,
              //   PathArr,);
              
              contract.AddDetails(
                initialFValues.id,
                values.fullName,
                values.yearpassed,
                departmentname,
                initialFValues.urlArr,
                initialFValues.PathArr,
                { from: addressAccount }
              );
              setRefresh(true);
            });
        } catch (error) {
          console.log("Error while calling uploadFile API ", error);
        }
      }
      studentService.insertStudent(values);
      window.alert("Uploaded....");
      resetForm();
    }
    if (val == null) {
      setVal(10);
    }
    if (valDep == null) {
      setValDep(10);
    }
  };

  // const loadDetails = async()=>{
  //     //e.preventDefault();
  //     try {
  //         const res = await contract.AddDetails(initialFValues.id,fullname,yearpassed,departmentname,fileHash ,{from: addressAccount})
  //          .then(function (response) {
  //          setRefresh(true);
  //           console.log(response);

  //         })
  //     } catch (error) {
  //         console.log('Error while calling loadDetails API ', error);
  //     }

  // }
  // const retrieveFile = (e) => {
  //   const data = e.target.files[0];
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(data);

  //   reader.onloadend = () => {
  //     setFile(Buffer(reader.result));
  //   };

  //   e.preventDefault();
  // };

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setContract(e.DocContract);
      setAddresAccount(e.addressAccount);
    });
  });

  return (
    <Form1 onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input1
          className={classes.input}
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input1
            label="Roll No"
            name="rollno"
            value={values.rollno}
            onChange={handleInputChange}
            error={errors.rollno}
          />
          <Controls.Input1
            label="Year of Passing"
            name="yearpassed"
            value={values.yearpassed}
            onChange={handleInputChange}
            error={errors.yearpassed}
         //   error={setErrors["yearpassed"]}
          />

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="contained"
                component="label"
                type="submit"
                value="Upload"
              >
                Upload Document
                <input
                  hidden
                  accept="pdf/*"
                  multiple
                  type="file"
                  // onChange={retrieveFile}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
              {/* <p>{file.name}</p> */}
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl {...(val == 10 && { error: true })}>
              <InputLabel
                shrink
                variant="standard"
                htmlFor="uncontrolled-native"
              >
                Department
              </InputLabel>
              <NativeSelect
                defaultValue={10}
                props={{
                  id: "uncontrolled-native",
                }}
                val={val}
                onChange={(e) => handleChnage(e)}
              >
                <option value={10}>None</option>
                <option value={"Computer"}>Computer</option>
                <option value={30}>Mechanical</option>
                <option value={"Electrical"}>Electrical</option>
                <option value={"Information-Technology"}>
                  Information-Technology
                </option>
              </NativeSelect>
              {val == 10 && <FormHelperText>This is required</FormHelperText>}
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth {...(valDep == 10 && { error: true })}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Document Type
              </InputLabel>
              <NativeSelect
                defaultValue={10}
                props={{
                  id: "uncontrolled-native",
                }}
                val={val}
                onChange={(e) => handleDepChange(e)}
              >
                <option value={10}>None</option>
                <option value={"Transcript"}>Transcript</option>
                <option value={"Passing Certificate"}>
                  Passing Certificate
                </option>
                <option value={"School Leaving Certificate"}>
                  School Leaving Certificate
                </option>
                <option value={"Extra Curricular"}>Extra Curricular</option>
              </NativeSelect>
              {valDep == 10 && (
                <FormHelperText>This is required</FormHelperText>
              )}
            </FormControl>
          </Box>
          {/* <FormControl >
                        <StyledEngineProvider injectFirst>
                            <Demo
                                name="department"
                                value={values.departmentID}
                                onChange={handleInputChange}
                                error={errors.departmentID}
                            />
                        </StyledEngineProvider>
                    </FormControl> */}
          <FormControl>
            <StyledEngineProvider injectFirst>
              <NativePickers />
            </StyledEngineProvider>
          </FormControl>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ReplayIcon />}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Form1>
  );
}
