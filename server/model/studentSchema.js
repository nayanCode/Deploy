import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const studentSchema = new mongoose.Schema({

    name: String,
    rollno: String,
    yearofgraduating: String, 
    email:String,
    password:String,
    date: Date,
  
});

const studentDataSchema = mongoose.model('studentcredentials', studentSchema);
export default studentDataSchema;
