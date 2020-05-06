import {combineReducers} from 'redux';
import user from "./Reducer/user";
import schools from "./Reducer/schools"

export default combineReducers({
user,
schools
});
