import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, FormControl } from '@mui/material';
import { Stack } from '@mui/system';
import SendIcon from "@mui/icons-material/Send";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Web3 from "web3";
import DataJson from '../../abis/contracts/Storedata.json';
import "./Verification.css";
import ParticlesComponent from "../ParticlesComponent";


const ipfsClient = require('ipfs-http-client');
const projectId = '2Kj7xj4vfjsKoKjoNfvTsXCd67J';
const projectSecret = '84e1d75a98bceccacfb0175485fa6f25';
const ipfs = ipfsClient.create({ host: 'localhost', port: '5001' });
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const client = ipfsClient.create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });
// >>>>>>> fc8ea09e5b2e65c38d33b50196e1ae1e73b87cff

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const contractAddress = "0xD5C87c0a62BBA7e29E5FEa89810A04312238C025";
const contract = new web3.eth.Contract(DataJson.abi, contractAddress);
// const searchHash = "Qmb4mH3oqfFqgKLAzBVjS7Ls1uj5wq4cBmypkDZ2jH5Pim";

const Verification = (props) => {
    const [file, setFile] = useState(null);
    const [urlArr, setUrlArr] = useState();
    const [PathArr, setPathArr] = useState();
    const [message, setMessage] = useState('');
    const [hash, setHash] = useState('');
    const [name, setName] = useState('');
    const [yop, setYop] = useState('');
    const [depart, setDepart] = useState('');
    const [docUrl, setDocUrl] = useState('');
    const [Filehash, setfilehash] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const created = await client.add(file);
            // const path = `${created.path}`;
            // const url = `https://docverifier.infura-ipfs.io/ipfs/${created.path}`;
            // setUrlArr(url);
            // setPathArr(path);
            const result = await ipfs.add(file);
            const localHash = result.cid.toString();
            setHash(localHash);
            // } catch (error) {
            //     console.log(error.message);
            // }

            contract.getPastEvents("Dataadded", {
                fromBlock: 28,
                toBlock: 100
            })
                .then(events => {
                    const foundElement = events.find(events => events.returnValues.Filehash === localHash);
                    if (foundElement) {
                        setDocUrl(foundElement.returnValues.IPFSurl);
                        setName(foundElement.returnValues.fullname);
                        setDepart(foundElement.returnValues.deparmentName);
                        setYop(foundElement.returnValues.yearofpassing);
                        setfilehash(foundElement.returnValues.Filehash);
                        console.log("Element found:", foundElement);
                        setMessage('This is a Valid Blockchain Verified Document')
                    } else {
                        console.log("Element not found ");
                        setMessage("Please upload valid document")
                    }
                })
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar >
                    <Toolbar>
                        <Typography variant="h4" component="div" textAlign='center'>
                            Blockchain Based Document Verifier
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
                <Box sx={{ my: 5 }}>
                    <h1>Verification</h1>
                    <FormControl>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                className="sButton"
                                variant="contained"
                                size="large"
                                component="label"
                                type="submit"
                                startIcon={<FileUploadIcon />}
                                value="Upload"
                            >
                                Upload File to be verified
                                <input
                                    hidden
                                    accept="pdf/*"
                                    multiple
                                    type="file"
                                    // onChange={retrieveFile}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Button>
                            <Button
                                className="sButton"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={<SendIcon />}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Stack>{message &&
                            <div>
                                <h1>{message} </h1>
                            </div>
                        }
                        {/* <p>URL:{urlArr}</p>
                        <p>PathArr:{PathArr}</p> */}
                        {Filehash &&
                            <div className='dataContainer'>
                                <h1>Document belongs to :</h1>
                                <p><span >Full Name:</span> {name}</p>
                                <p><span >Year of Passing:</span> {yop}</p>
                                <p><span >Department Name:</span> {depart}</p>
                                <p><span >IPFS URL:</span> {docUrl}</p>
                                <p><span >File Hash:</span> {Filehash}</p>
                            </div>}
                    </FormControl>
                </Box>
            </Container>
            <ParticlesComponent id="verification" />
        </React.Fragment>
    )

}
export default Verification;
