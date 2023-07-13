import studentDataSchema from '../model/studentSchema.js'
import studentRequest from '../model/studentLoginSchema.js';

export const getTables = async (request, response) => {
    try {
        const tables = await studentRequest.find({});
        response.json(tables);
    }catch (error) {
        console.error(error.message);
    }
}

///