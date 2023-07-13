import * as actionType from "./constants/tableConstants";

export const getTableReducer = (state = {tables : []}, action) => {
    switch(action.type) {
        case actionType.GET_TABLES_SUCCESS:
            return { tables: action.payload }
        case actionType.GET_TABLES_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};