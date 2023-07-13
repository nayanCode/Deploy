import studentRequest from '../model/studentLoginSchema.js';
import studentDataSchema from '../model/studentSchema.js';
import studentStatus from '../model/studentStatus.js';

export const userLogIn = async (request, response) => {
    try {
        let user = await studentDataSchema.findOne({ email: request.body.email, password: request.body.password });
        if(user) {
            return response.status(200).json(`${request.body.email} login successfull`);
        } else {
            return response.status(401).json(`Invalid okk Login ${request.body.password}`);
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

export const existStudent = async (request, response) => {
    try {
        let user = await studentDataSchema.findOne({ email: request.body.email,});
        if(user) {
            const RequestDetails = request.body;
       
            const newRequest = new studentStatus(RequestDetails);
            
            await newRequest.save();
             response.status(200).json(user);
        } else {
            return response.status(401).json(`Invalid okk Login`);
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

export const getStudentStatus = async (request, response) => {
    try {
        const user = await studentStatus.findOne({ 'email': request.params.id });
        if(user) {
             response.status(200).json(user);
        } else {
            return response.status(401).json(`Invalid okk Login`);
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}


export const studentRequestcontroller=async(request, response)=>{
    try {
        
        const RequestDetails = request.body;
       
        const newRequest = new studentRequest(RequestDetails);
        
        await newRequest.save();
        
        response.status(200).json(`Student Request has been successfully registered`);
        
    } catch (error) {
        response.status(401).json(error.message);
    }
}

export const updateStatus = async (request, response) => {
    try {
        
        const newStatus = await studentStatus.updateOne({'rollno':request.params.id},{$set: {'status':request.params.newMessage}
      
    });
        response.status(200).json(newStatus);
    }catch (error) {
        response.status(500).json(error)
    }
}

export const updateHash = async (request, response) => {
    try {
        
        const newStatus = await studentStatus.updateOne({'rollno':request.params.id},{$set: {'hash':request.params.hash}
      
    });
        response.status(200).json(newStatus);
    }catch (error) {
        response.status(500).json(error)
    }
}