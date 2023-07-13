import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getTableReducer } from '../tableReducer';
const reducer = combineReducers({
    getTables: getTableReducer,  
})

const middleware = [thunk];
const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;