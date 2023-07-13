import { Form1 } from "../Components/useForm";
import React, { useState, useEffect } from "react";
import DataJson from '../abis/contracts/Storedata.json';
import Web3 from "web3";
import SendIcon from "@mui/icons-material/Send";
import { Button, Input, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    input: {
      width: "65ch",
      padding: "10px",
      height:"4ch",
      fontSize: "1.2rem",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      margin: "10px 0"
    },
    dataContainer: {
      padding: "30px",
      borderRadius: "5px",
      marginTop: "20px",
      backgroundColor: "#e6f1ff",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)"
    },
    dataKey: {
      fontWeight: "bold",
      marginRight: "10px"
    },
    submitButton: {
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      }
  });

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const contractAddress = "0xD5C87c0a62BBA7e29E5FEa89810A04312238C025";
const contract = new web3.eth.Contract(DataJson.abi, contractAddress);


// const blockHash = '0xa1947928a68b21f98b694df0f6c05cc8c7b812296694f6f39e1906b398221785';

function View() {
    const classes = useStyles();
    const [id, setId] = useState("");
    const [fullname, setFullname] = useState("");
    const [yearofpassing, setYearofpassing] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [IPFSurl, setIPFSurl] = useState("");
    const [filehash, setFilehash] = useState("");
    const [blockHash, setblockHash] = useState("");
    const [showData, setShowData] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        web3.eth.getBlock(blockHash, (error, block) => {
            if (error) {
                console.error(error);
                return;
            }
            const blockNumber = block.number;
            console.log(block);
            contract.getPastEvents("Dataadded", {
                fromBlock: 32,
                toBlock: 34
            })
                .then(events => {
                    setId(events[0].returnValues.id);
                    setFullname(events[0].returnValues.fullname);
                    setYearofpassing(events[0].returnValues.yearofpassing);
                    setDepartmentName(events[0].returnValues.deparmentName);
                    setIPFSurl(events[0].returnValues.IPFSurl);
                    setFilehash(events[0].returnValues.Filehash);
                    console.log(events);
                })
                .catch(error => {
                    console.error(error);
                });
        });
        setShowData(true);
    }

    const checkHashEquivalence=()=>{
        
    }
    return (
        <div >
            <Box sx={{ '& button': { m: 1.5 } }}>
                <Form1 onSubmit={handleSubmit} >
                    <Input
                        className={classes.input}
                        type="text"
                        sx={{ width: '68ch' }}
                        placeholder="Enter Block Hash"
                        value={blockHash}
                        onChange={(event) => setblockHash(event.target.value)}
                    />
                    <Button className={classes.submitButton} size="medium" type="submit" variant="outlined" endIcon={<SendIcon />}>Submit</Button>
                    {/* <button type="submit">Submit</button> */}
                </Form1>
            </Box>
            {/* {false && 1} /// Logic for below */}
            {showData && (
                <div className={classes.dataContainer}>
                    <h1>Block Details</h1>
                    <p><span className={classes.dataKey}>ID:</span>{id}</p>
                    <p><span className={classes.dataKey}>Full Name:</span> {fullname}</p>
                    <p><span className={classes.dataKey}>Year of Passing:</span>{yearofpassing}</p>
                    <p><span className={classes.dataKey}>Department Name:</span>{departmentName}</p>
                    <p><span className={classes.dataKey}>IPFS URL:</span> {IPFSurl}</p>
                    <p><span className={classes.dataKey}>File Hash:</span> {filehash}</p>
                </div>
            )}
        </div>
    );
}
export default View;
