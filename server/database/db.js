import mongoose from 'mongoose';

const Connection = async (username, password) => {
   
    const URL =`mongodb+srv://${username}:${password}@cluster0.zvz5dtw.mongodb.net/?retryWrites=true&w=majority`;
    try{  
 mongoose.set('strictQuery', false);
   await mongoose.connect(URL,{
       useNewUrlParser: true,
       useUnifiedTopology: true,
    //    useFindAndModify:false,
    //    useCreateIndex: true,
      // strictQuery:false
    })
    console.log("database connected successfully")}
    catch(err){
        console.log(err.message)
    }
}

export default Connection;
