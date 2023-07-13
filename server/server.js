import express from 'express';
import multer from 'multer';
import upload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Connection from './database/db.js'
import dotenv from 'dotenv';
//import cors from 'cors';
//import DefaultData from './default.js'
import Routes from './routes/routes.js'

const app=express();
dotenv.config()

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(upload());

const router = express.Router();

const port = process.env.PORT || 8000;

const username = "admin";
const password = "admin";

Connection(username, password);



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// })

app.post('/uploadfile', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  //console.log(file);

  file.mv(`../client/public/storage/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name,fileHash:file.md5, filePath: `/storage/${file.name}` });
  });
});

app.listen(process.env.PORT || 8000,()=>console.log(`server is running on ${process.env.PORT || 8000}`));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Routes);




