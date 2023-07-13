import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const studentRequestSchema = new mongoose.Schema({
    //id: String,
    name: String,
    rollno: String,
    yearofgraduating: String,
    date:Date,
   
});

const studentRequest = mongoose.model('studentRequest', studentRequestSchema);
export default studentRequest;
