import { combineReducers } from 'redux';
import dccaReducer from './dccaReducer';
import mapReducer from './mapReducer';

export default combineReducers({
    dcca: dccaReducer,
    map: mapReducer
});