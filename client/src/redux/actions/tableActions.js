import axios from 'axios';

import * as actionTypes from './reducers/constants/tableConstants';
export const getTables = () => async (dispatch) => {
    try {
        
        const { data } = await axios.get(`http://localhost:8000/tables`);
        dispatch({ type: actionTypes.GET_TABLES_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_TABLES_FAIL, payload: error.response });
    }
};