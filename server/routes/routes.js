import express from  'express';
// import StudentLogin from '../../client/src/Components/StudentLogin.js';
import studentRequest from '../model/studentLoginSchema.js';
import {studentRequestcontroller, userLogIn,existStudent,getStudentStatus,updateStatus,updateHash} from '../controller/studentcontroller.js';
import {getTables} from '../controller/tablecontroller.js'

const router = express.Router();

router.post('/login', userLogIn);
router.post('/sentRequest', studentRequestcontroller);
router.post('/verifyExistence', existStudent);
router.get('/getStatus/:id', getStudentStatus);
router.post('/updateStatus/:id/request=:newMessage',updateStatus);
router.post('/updateHash/:id/request=:hash',updateHash);
router.get('/tables', getTables);

// router.route("/table").get((req,res) => {
//     studentRequest.find()
//         .then(foundTables => res.json(foundTables))
// })


export default router;